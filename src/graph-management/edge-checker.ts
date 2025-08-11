import { toast } from 'react-toastify';
import type { GraphNode } from './nodes/base-node';
import type { GraphEdge } from './edges/base-edge.ts';

interface ForbiddenPath {
  from: string;
  to: string;
}

export class EdgeChecker {
  private _forbiddenConnections: Map<string, string[]> = new Map();

  constructor(forbiddenPathsJSON: string) {
    try {
      const forbiddenPaths: ForbiddenPath[] =
        JSON.parse(forbiddenPathsJSON)?.forbiddenPaths;
      this._setForbiddenPaths(forbiddenPaths);
    } catch (e) {
      toast.error((e as Error).message, { position: 'bottom-center' });
    }
  }

  private _getNeighbors(node: GraphNode): GraphNode[] {
    return node.edges.map((e) => e.target);
  }

  private _setForbiddenPaths(paths: ForbiddenPath[]): void {
    this._forbiddenConnections.clear();
    for (const path of paths) {
      if (!this._forbiddenConnections.has(path.from)) {
        this._forbiddenConnections.set(path.from, []);
      }
      this._forbiddenConnections.get(path.from)!.push(path.to);
    }
  }

  /**
   * Checks if adding `edge` would create a forbidden route (deep).
   * NOTE: The `addEdge` you pass here must be a "raw" mutator that does NOT
   * run the normal validation (to avoid recursion). Likewise for `removeEdge`.
   */
  public isForbiddenConnection(
    edge: GraphEdge,
    getNode: (id: string) => GraphNode | undefined,
    addEdge: (edge: GraphEdge) => void,
    removeEdge: (id: string) => void
  ): boolean {
    let violation = false;
    try {
      addEdge(edge); // <-- raw add (no validation)

      for (const [startId, targetIds] of this._forbiddenConnections.entries()) {
        const startNode = getNode(startId);
        if (!startNode) continue;

        for (const tId of targetIds) {
          const tNode = getNode(tId);
          if (tNode && this.isAlreadyReachable(startNode, tNode)) {
            violation = true;
            break;
          }
        }
      }
    } finally {
      // Always clean up the temporary mutation
      removeEdge(edge.id);
    }

    return violation;
  }

  /**
   * Checks if node is reachable using BFS algorithm
   */
  public isAlreadyReachable(from: GraphNode, to: GraphNode): boolean {
    if (from.id === to.id) return true;

    const visited = new Set<string>([from.id]);
    const queue: GraphNode[] = [from];

    while (queue.length) {
      const curr = queue.shift()!;
      if (curr.id === to.id) return true;

      for (const neighbor of this._getNeighbors(curr)) {
        if (!visited.has(neighbor.id)) {
          visited.add(neighbor.id);
          queue.push(neighbor);
        }
      }
    }
    return false;
  }
}
