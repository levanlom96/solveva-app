export const importJson = async (): Promise<unknown> =>
  new Promise((resolve, reject) => {
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

      const reader = new FileReader();
      reader.onload = () => {
        try {
          const text = reader.result as string;

          if (!text.trim()) {
            reject(new Error('File is empty'));
            return;
          }

          // Extra guard: prevent importing if file starts with HTML tags
          if (/^\s*<\s*!?html/i.test(text)) {
            reject(new Error('Not a valid JSON file'));
            return;
          }

          const parsed = JSON.parse(text);

          // Sanitize all string values
          const sanitized = deepSanitize(parsed);
          resolve(sanitized);
        } catch {
          reject(new Error('Invalid JSON format'));
        }
      };

      reader.onerror = () => reject(new Error('Failed to read file'));
      reader.readAsText(file);
    };

    input.click();
  });

/**
 * Recursively sanitize all string values to prevent HTML injection
 */
const deepSanitize = (value: unknown): unknown => {
  if (typeof value === 'string') {
    return value.replace(/[&<>"'`]/g, (match) => {
      const map: Record<string, string> = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#39;',
        '`': '&#96;',
      };
      return map[match] || match;
    });
  }
  if (Array.isArray(value)) {
    return value.map((v) => deepSanitize(v));
  }
  if (value && typeof value === 'object') {
    const sanitizedObj: Record<string, unknown> = {};
    for (const key of Object.keys(value as unknown as string)) {
      sanitizedObj[key] = deepSanitize(value[key]);
    }
    return sanitizedObj;
  }
  return value;
};
