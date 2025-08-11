import type { GraphNode } from '../nodes/base-node';

export class GraphEdge {
  constructor(
    public id: string,
    public source: GraphNode,
    public target: GraphNode
  ) {}
}
