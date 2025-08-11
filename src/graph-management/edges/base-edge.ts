import type { GraphNode } from '../nodes/base-node';

export class GraphEdge {
  public id: string;
  public source: GraphNode;
  public target: GraphNode;

  constructor(
    id: string,
    source: GraphNode,
    target: GraphNode
  ) {
    this.id = id;
    this.source = source;
    this.target = target;
  }
}
