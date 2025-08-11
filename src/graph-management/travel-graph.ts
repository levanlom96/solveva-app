import type { GraphEdge } from './edges/base-edge';
import type { GraphNode } from './nodes/base-node';
import type { EdgeChecker } from './edge-checker.ts';

export class TravelGraph {
  nodes: GraphNode[] = [];
  edges: GraphEdge[] = [];
  edgesDictionary: Record<string, GraphEdge | undefined> = {};
  nodesDictionary: Record<string, GraphNode | undefined> = {};

  private _edgeChecker: EdgeChecker;

  constructor(edgeChecker: EdgeChecker) {
    this._edgeChecker = edgeChecker;
  }

  private _nodeExists(id: string): boolean {
    return !!this.nodesDictionary[id];
  }

  private _edgeExists(id: string): boolean {
    return !!this.edgesDictionary[id];
  }

  addNode(node: GraphNode): void {
    if (!node) throw new Error('Node is required');
    if (!node.id) throw new Error('Node must have an id');

    if (this._nodeExists(node.id)) {
      throw new Error(`Node with id "${node.id}" already exists`);
    }

    if (!Array.isArray(node.edges)) node.edges = [];

    this.nodesDictionary[node.id] = node;
    this.nodes.push(node);
  }

  getNode(id: string): GraphNode | undefined {
    return this.nodesDictionary[id];
  }

  removeNode(id: string) {
    const node = this.nodesDictionary[id];

    // Cleanup edges.
    node?.edges?.forEach((edge) => {
      this.removeEdge(edge.id);
    });

    this.nodesDictionary[id] = undefined;
    this.nodes = this.nodes.filter((d) => d.id !== id);
  }

  validateAndAddEdge(edge: GraphEdge): void {
    if (!edge) throw new Error('Edge is required');
    if (!edge.id) throw new Error('Edge must have an id');
    if (!edge.source || !edge.target) {
      throw new Error('Edge must have both source and target nodes');
    }

    if (this._edgeExists(edge.id)) {
      throw new Error(`Edge with id "${edge.id}" already exists`);
    }

    if (
      !this._nodeExists(edge.source.id) ||
      !this._nodeExists(edge.target.id)
    ) {
      throw new Error('Both source and target nodes must be in the graph');
    }

    if (edge.source.id === edge.target.id) {
      throw new Error('Self-loops are not allowed');
    }

    if (this._edgeChecker.isAlreadyReachable(edge.target, edge.source)) {
      throw new Error(
        `Adding edge "${edge.source.id} -> ${edge.target.id}" creates a cycle`
      );
    }

    if (
      this._edgeChecker.isForbiddenConnection(
        edge,
        this.getNode.bind(this),
        this._addEdge.bind(this),
        this.removeEdge.bind(this)
      )
    ) {
      throw new Error(
        `Connection from "${edge.source.id}" to "${edge.target.id}" is forbidden`
      );
    }

    this._addEdge(edge);
  }

  // Raw mutation without validation.
  private _addEdge(edge) {
    this.edges.push(edge);
    this.edgesDictionary[edge.id] = edge;
    edge.source.edges.push(edge);
  }

  removeEdge(id: string): void {
    this.edgesDictionary[id] = undefined;
    this.edges = this.edges.filter((d) => d.id !== id);
    this.nodes.forEach((graphNode) => {
      graphNode.edges = graphNode.edges.filter((d) => d.id !== id);
    });
  }
}
