import { z } from 'zod';

// Schema for Country object (matches the Country type from useCountries.tsx)
const countrySchema = z.object({
  name: z.object({
    common: z.string(),
    official: z.string(),
  }),
  cca2: z.string(),
  flags: z.object({
    png: z.string(),
    svg: z.string(),
    alt: z.string().optional(),
  }),
});

// Define valid node types
const nodeTypeSchema = z.enum([
  'countryNode',
  'hotelNode',
  'airportNode',
  'portNode',
  'bbqNode',
  'beachNode',
  'trainNode',
]);

// Schema for individual node data (drag & drop)
export const NodeDataSchema = z.object({
  id: z.string().optional(),
  nodeType: nodeTypeSchema,
  nodeUniqueData: z.record(z.string(), z.unknown()).optional(),
  country: countrySchema.optional(),
});

// Schema for React Flow node structure
export const ReactFlowNodeSchema = z.object({
  id: z.string(),
  type: nodeTypeSchema,
  position: z.object({
    x: z.number(),
    y: z.number(),
  }),
  data: z.any(), // React Flow uses any for data, so we'll validate it as any and cast appropriately
});

// Schema for React Flow edge structure
export const ReactFlowEdgeSchema = z.object({
  id: z.string(),
  source: z.string(),
  target: z.string(),
  type: z.string().optional(),
});

// Schema for complete travel route data (import/export)
export const TravelRouteSchema = z.object({
  nodes: z.array(ReactFlowNodeSchema),
  edges: z.array(ReactFlowEdgeSchema),
});

// Validation functions with proper error handling
export const validateNodeData = (
  data: unknown
): z.infer<typeof NodeDataSchema> => {
  try {
    return NodeDataSchema.parse(data);
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errors = error.issues.map((issue) => issue.message).join(', ');
      throw new Error(`Invalid node data: ${errors}`);
    }
    throw error;
  }
};

export const validateTravelRoute = (
  data: unknown
): z.infer<typeof TravelRouteSchema> => {
  try {
    return TravelRouteSchema.parse(data);
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errors = error.issues
        .map((issue) => `${issue.path.join('.')}: ${issue.message}`)
        .join(', ');
      throw new Error(`Invalid travel route data: ${errors}`);
    }
    throw error;
  }
};

// Type exports for use in other files
export type ValidatedNodeData = z.infer<typeof NodeDataSchema>;
export type ValidatedTravelRoute = z.infer<typeof TravelRouteSchema>;
export type ValidatedReactFlowNode = z.infer<typeof ReactFlowNodeSchema>;
export type ValidatedReactFlowEdge = z.infer<typeof ReactFlowEdgeSchema>;
