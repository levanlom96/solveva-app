import type { GraphEdge } from '../edges/base-edge';

export class GraphNode {
  public id: string;
  public edges: GraphEdge[];

  constructor(
    id: string,
    edges: GraphEdge[] = [] // outgoing edges
  ) {
    this.id = id;
    this.edges = edges;
  }
}
