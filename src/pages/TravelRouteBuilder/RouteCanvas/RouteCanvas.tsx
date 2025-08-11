import { useState, useCallback, useEffect } from 'react';
import { toast } from 'react-toastify';
import {
  ReactFlow,
  applyNodeChanges,
  applyEdgeChanges,
  addEdge,
  Background,
  Controls,
  NodeTypes,
  useNodesState,
  useEdgesState,
  useReactFlow,
} from '@xyflow/react';
import type { Country } from '../../../hooks/useCountries.tsx';
import { TravelGraph } from '../../../graph-management/travel-graph.ts';
import { EdgeChecker } from '../../../graph-management/edge-checker.ts';
import { GraphNode } from '../../../graph-management/nodes/base-node.ts';
import { GraphEdge } from '../../../graph-management/edges/base-edge.ts';

import CountryNode from './CountryNode/CountryNode.tsx';

import './RouteCanvas.scss';
import { useAppState } from '../../../hooks/useAppState.tsx';

const nodeTypes: NodeTypes = {
  countryNode: CountryNode,
};

const forbiddenPaths =
  '{"forbiddenPaths":[{"from":"ES","to":"GE"},{"from":"GE","to":"HR"}]}';

export interface ReactFlowNode {
  id: string;
  position: { x: 521; y: 222 };
  data: { country: Country };
  type: 'countryNode';
}

export interface ReactFlowEdge {
  animated: true;
  id: string;
  source: string;
  target: string;
}

export default function RouteCanvas() {
  const { state, dispatch } = useAppState();

  const [travelGraph, setTravelGraph] = useState(
    new TravelGraph(new EdgeChecker(forbiddenPaths))
  );

  const [nodes, setNodes] = useNodesState([]);
  const [edges, setEdges] = useEdgesState([]);

  const { screenToFlowPosition } = useReactFlow();

  const onNodesChange = useCallback(
    (changes) => {
      setNodes((prevState) => applyNodeChanges(changes, prevState));
    },
    [setNodes]
  );

  const onEdgesChange = useCallback(
    (changes) => {
      setEdges((prevState) => applyEdgeChanges(changes, prevState));
    },
    [setEdges]
  );

  const onConnect = useCallback(
    (params) => {
      try {
        const sourceNode = travelGraph.getNode(params.source);
        const targetNode = travelGraph.getNode(params.target);

        if (!sourceNode || !targetNode) {
          toast.error(`Source or Target node wasn't found`, {
            position: 'bottom-center',
          });
          return;
        }

        const edge = new GraphEdge(
          `${params.source}-${params.target}`,
          sourceNode,
          targetNode
        );

        travelGraph.validateAndAddEdge(edge);

        setEdges((prevState) =>
          addEdge({ ...params, animated: true }, prevState)
        );
      } catch (e) {
        toast.error(e.message, { position: 'bottom-center' });
      }
    },
    [setEdges, travelGraph]
  );

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const data = e.dataTransfer.getData('application/json');
    const parsedData: { country: Country } = JSON.parse(data);
    const id = parsedData.country.cca2;

    try {
      const node = new GraphNode(id);
      travelGraph.addNode(node);

      // Convert screen coordinates to flow coordinates
      const position = screenToFlowPosition({
        x: e.clientX,
        y: e.clientY,
      });

      setNodes((prevState) => [
        ...prevState,
        {
          id: id,
          position,
          data: parsedData,
          type: 'countryNode',
        },
      ]);
    } catch (e) {
      toast.error(e.message, { position: 'bottom-center' });
    }
  };

  // Save updated nodes and edges to the State
  useEffect(() => {
    dispatch({ type: 'SAVE_TRAVEL_ROUTE', payload: { nodes, edges } });
  }, [nodes, edges, dispatch]);

  // Activate imported nodes
  useEffect(() => {
    if (state.importedTravelRoute) {
      const newTravelGraph = new TravelGraph(new EdgeChecker(forbiddenPaths));

      try {
        state.importedTravelRoute.nodes.forEach((node) => {
          newTravelGraph.addNode(new GraphNode(node.id, []));
        });

        state.importedTravelRoute.edges.forEach((edge) => {
          const sourceNode = newTravelGraph.getNode(edge.source);
          const targetNode = newTravelGraph.getNode(edge.target);

          if (sourceNode && targetNode) {
            newTravelGraph.validateAndAddEdge(
              new GraphEdge(edge.id, sourceNode, targetNode)
            );
          } else {
            toast.error(
              `Invalid edge was imported with JSON. Source or Target node is missing`,
              { position: 'bottom-center' }
            );
          }
        });

        setNodes(state.importedTravelRoute.nodes);
        setEdges(state.importedTravelRoute.edges);
        setTravelGraph(newTravelGraph);
      } catch (e) {
        toast.error(e.message, { position: 'bottom-center' });
      }
    }
  }, [setEdges, setNodes, state.importedTravelRoute]);

  return (
    <div className='route-canvas-container'>
      <ReactFlow
        nodeTypes={nodeTypes}
        nodes={nodes}
        edges={edges}
        onConnect={onConnect}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onEdgesDelete={(edgesDeleteData) => {
          edgesDeleteData.forEach((edge) => {
            travelGraph.removeEdge(`${edge.source}-${edge.target}`);
          });
        }}
        onNodesDelete={(nodesDeletedData) => {
          nodesDeletedData.forEach((node) => {
            travelGraph.removeNode(node.id);
          });
        }}
        onDragOver={(e) => {
          e.preventDefault();
        }}
        onDrop={onDrop}
        fitView
      >
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  );
}
