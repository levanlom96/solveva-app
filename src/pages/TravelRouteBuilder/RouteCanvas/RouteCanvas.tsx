import { useState, useCallback, useEffect } from 'react';
import { toast } from 'react-toastify';
import {
  ReactFlow,
  applyNodeChanges,
  applyEdgeChanges,
  addEdge,
  Background,
  Controls,
  useNodesState,
  useEdgesState,
  useReactFlow,
} from '@xyflow/react';
import type {
  NodeTypes,
  NodeChange,
  EdgeChange,
  Connection,
  Node,
  Edge,
} from '@xyflow/react';

import { TravelGraph } from '../../../graph-management/travel-graph.ts';
import { EdgeChecker } from '../../../graph-management/edge-checker.ts';
import { GraphNode } from '../../../graph-management/nodes/base-node.ts';
import { GraphEdge } from '../../../graph-management/edges/base-edge.ts';

import CountryNode from './CountryNode/CountryNode.tsx';
import HotelNode from './HotelNode/HotelNode.tsx';

import './RouteCanvas.scss';
import { useAppState } from '../../../hooks/useAppState.tsx';
import type { NodeData } from '../SidePanel/OtherSidePanel/OtherChoice/OtherChoice.tsx';
import AirportNode from './AirportNode/AirportNode.tsx';
import PortNode from './PortNode/PortNode.tsx';
import BbqNode from './BbqNode/BbqNode.tsx';
import BeachNode from './BeachNode/BeachNode.tsx';
import TrainStationNode from './TrainStation/TrainStationNode.tsx';

const nodeTypes: NodeTypes = {
  countryNode: CountryNode,
  hotelNode: HotelNode,
  airportNode: AirportNode,
  portNode: PortNode,
  bbqNode: BbqNode,
  beachNode: BeachNode,
  trainNode: TrainStationNode,
};

const forbiddenPaths =
  '{"forbiddenPaths":[{"from":"ES","to":"GE"},{"from":"GE","to":"HR"}]}';

export type NodeTypeKey =
  | 'countryNode'
  | 'hotelNode'
  | 'airportNode'
  | 'portNode'
  | 'bbqNode'
  | 'beachNode'
  | 'trainNode';

export type ReactFlowNode = Node<never, NodeTypeKey>;

export type ReactFlowEdge = Edge;

export default function RouteCanvas() {
  const { state, dispatch } = useAppState();

  const [travelGraph, setTravelGraph] = useState(
    new TravelGraph(new EdgeChecker(forbiddenPaths))
  );

  const [nodes, setNodes] = useNodesState<ReactFlowNode>([]);
  const [edges, setEdges] = useEdgesState<ReactFlowEdge>([]);

  const { screenToFlowPosition } = useReactFlow();

  const onNodesChange = useCallback(
    (changes: NodeChange[]) => {
      setNodes(
        (prevState) => applyNodeChanges(changes, prevState) as ReactFlowNode[]
      );
    },
    [setNodes]
  );

  const onEdgesChange = useCallback(
    (changes: EdgeChange[]) => {
      setEdges((prevState) => applyEdgeChanges(changes, prevState));
    },
    [setEdges]
  );

  const onConnect = useCallback(
    (params: Connection) => {
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
        toast.error((e as Error).message, { position: 'bottom-center' });
      }
    },
    [setEdges, travelGraph]
  );

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const data = e.dataTransfer.getData('application/json');
    const parsedData: NodeData = JSON.parse(data);

    const id = parsedData.id ? parsedData.id : crypto.randomUUID();

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
          data: { ...parsedData },
          type: parsedData.nodeType,
        } as ReactFlowNode,
      ]);
    } catch (e) {
      toast.error((e as Error).message, { position: 'bottom-center' });
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
        toast.error((e as Error).message, { position: 'bottom-center' });
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
