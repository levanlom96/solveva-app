import { TravelRouteSchema } from './validation.utils.ts';

export const importJson = async (): Promise<unknown> => {
  const file = await selectFile();
  const content = await readFileAsText(file);
  return parseAndSanitizeJson(content);
};

const selectFile = async (): Promise<File> => {
  return new Promise((resolve, reject) => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'application/json';

    input.onchange = () => {
      const file = input.files?.[0];
      if (!file) {
        reject(new Error('No file selected'));
        return;
      }

      if (file.type && file.type !== 'application/json') {
        reject(new Error('Invalid file type'));
        return;
      }

      if (file.size > 5 * 1024 * 1024) {
        reject(new Error('File too large. Max 5MB.'));
        return;
      }

      resolve(file);
    };

    input.click();
  });
};

const readFileAsText = async (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => {
      const text = reader.result as string;
      resolve(text);
    };

    reader.onerror = () => reject(new Error('Failed to read file'));
    reader.readAsText(file);
  });
};

const parseAndSanitizeJson = async (text: string): Promise<unknown> => {
  if (!text.trim()) {
    throw new Error('File is empty');
  }

  // Extra guard: prevent importing if file starts with HTML tags
  if (/^\s*<\s*!?html/i.test(text)) {
    throw new Error('Not a valid JSON file');
  }

  let parsed;
  try {
    parsed = JSON.parse(text);
  } catch (error) {
    console.error('Failed to parse imported JSON:', error);
    throw new Error('Invalid JSON format in imported file');
  }

  // Validate and sanitize the JSON data
  return validateAndSanitizeJson(parsed);
};

/**
 * Validate JSON structure and sanitize string values to prevent injection attacks
 */
const validateAndSanitizeJson = (data: unknown): unknown => {
  try {
    // First, validate the structure matches our expected schema
    const validatedData = TravelRouteSchema.parse(data);

    // Then sanitize all string values recursively
    return deepSanitizeStrings(validatedData);
  } catch (error) {
    if (error instanceof Error && error.message.includes('ZodError')) {
      // Re-throw validation errors with clearer message
      throw new Error(`Data validation failed: ${error.message}`);
    }
    throw error;
  }
};

/**
 * Recursively sanitize string values to prevent script injection and XSS
 */
const deepSanitizeStrings = (value: unknown): unknown => {
  if (typeof value === 'string') {
    return sanitizeString(value);
  }
  if (Array.isArray(value)) {
    return value.map((v) => deepSanitizeStrings(v));
  }
  if (value && typeof value === 'object') {
    const sanitizedObj: Record<string, unknown> = {};
    for (const key of Object.keys(value)) {
      sanitizedObj[key] = deepSanitizeStrings(
        (value as Record<string, unknown>)[key]
      );
    }
    return sanitizedObj;
  }
  return value;
};

/**
 * Sanitize individual string values for JSON data
 */
const sanitizeString = (str: string): string => {
  // Remove potentially dangerous patterns for JSON data
  return (
    str
      // Remove script tags and javascript: protocols
      .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
      .replace(/javascript:/gi, '')
      .replace(/on\w+\s*=/gi, '') // Remove event handlers like onclick=
      // Remove null bytes and control characters (except newlines and tabs)
      // eslint-disable-next-line no-control-regex
      .replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, '')
      // Limit string length to prevent abuse
      .slice(0, 1000)
      .trim()
  );
};
