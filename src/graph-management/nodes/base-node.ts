import type { GraphEdge } from '../edges/base-edge';

export class GraphNode {
  constructor(
    public id: string,
    public edges: GraphEdge[] = [] // outgoing edges
  ) {}
}
