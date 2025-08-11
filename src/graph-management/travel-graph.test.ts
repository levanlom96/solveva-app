import { TravelGraph } from './travel-graph.ts';
import { EdgeChecker } from './edge-checker';
import { GraphNode } from './nodes/base-node.ts';
import { GraphEdge } from './edges/base-edge.ts';

// Helper to create a fresh graph
function createGraph(forbiddenPaths: Array<{ from: string; to: string }> = []) {
  const checker = new EdgeChecker(JSON.stringify({ forbiddenPaths }));
  return { graph: new TravelGraph(checker), checker };
}

describe('TravelGraph', () => {
  it('should add and retrieve a node', () => {
    const { graph } = createGraph();
    const nodeA = new GraphNode('A');
    graph.addNode(nodeA);

    expect(graph.getNode('A')).toBe(nodeA);
    expect(() => graph.addNode(nodeA)).toThrow(/already exists/);
  });

  it('should remove a node and its edges', () => {
    const { graph } = createGraph();
    const nodeA = new GraphNode('A');
    const nodeB = new GraphNode('B');
    graph.addNode(nodeA);
    graph.addNode(nodeB);

    const edge = new GraphEdge('A-B', nodeA, nodeB);
    graph.validateAndAddEdge(edge);

    graph.removeNode('A');
    expect(graph.getNode('A')).toBeUndefined();
    expect(graph.edges.length).toBe(0);
  });

  it('should add an edge if valid', () => {
    const { graph } = createGraph();
    const nodeA = new GraphNode('A');
    const nodeB = new GraphNode('B');
    graph.addNode(nodeA);
    graph.addNode(nodeB);

    const edge = new GraphEdge('A-B', nodeA, nodeB);
    graph.validateAndAddEdge(edge);

    expect(graph.edges.length).toBe(1);
    expect(graph.edges[0]).toBe(edge);
  });

  it('should prevent self-loops', () => {
    const { graph } = createGraph();
    const nodeA = new GraphNode('A');
    graph.addNode(nodeA);

    const edge = new GraphEdge('A-A', nodeA, nodeA);
    expect(() => graph.validateAndAddEdge(edge)).toThrow(/Self-loops/);
  });

  it('should prevent cycles', () => {
    const { graph } = createGraph();
    const nodeA = new GraphNode('A');
    const nodeB = new GraphNode('B');
    graph.addNode(nodeA);
    graph.addNode(nodeB);

    graph.validateAndAddEdge(new GraphEdge('A-B', nodeA, nodeB));
    expect(() =>
      graph.validateAndAddEdge(new GraphEdge('B-A', nodeB, nodeA))
    ).toThrow(/creates a cycle/);
  });

  it('should detect forbidden connections', () => {
    const forbiddenPaths = [{ from: 'A', to: 'C' }];
    const { graph } = createGraph(forbiddenPaths);

    const nodeA = new GraphNode('A');
    const nodeB = new GraphNode('B');
    const nodeC = new GraphNode('C');
    graph.addNode(nodeA);
    graph.addNode(nodeB);
    graph.addNode(nodeC);

    // First link A -> B is fine
    graph.validateAndAddEdge(new GraphEdge('A-B', nodeA, nodeB));

    // B -> C would make A -> C reachable, which is forbidden
    expect(() =>
      graph.validateAndAddEdge(new GraphEdge('B-C', nodeB, nodeC))
    ).toThrow(/forbidden/);
  });

  it('should remove an edge', () => {
    const { graph } = createGraph();
    const nodeA = new GraphNode('A');
    const nodeB = new GraphNode('B');
    graph.addNode(nodeA);
    graph.addNode(nodeB);

    const edge = new GraphEdge('A-B', nodeA, nodeB);
    graph.validateAndAddEdge(edge);
    graph.removeEdge('A-B');

    expect(graph.edges.length).toBe(0);
    expect(nodeA.edges.length).toBe(0);
  });
});

describe('EdgeChecker', () => {
  it('should detect reachability', () => {
    const checker = new EdgeChecker(JSON.stringify({ forbiddenPaths: [] }));
    const nodeA = new GraphNode('A');
    const nodeB = new GraphNode('B');
    const nodeC = new GraphNode('C');

    nodeA.edges.push(new GraphEdge('A-B', nodeA, nodeB));
    nodeB.edges.push(new GraphEdge('B-C', nodeB, nodeC));

    expect(checker.isAlreadyReachable(nodeA, nodeC)).toBe(true);
    expect(checker.isAlreadyReachable(nodeC, nodeA)).toBe(false);
  });
});
