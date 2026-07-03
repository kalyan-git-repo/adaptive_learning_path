import React, { useState, useCallback, useRef } from 'react';
import {
  type Node,
  ReactFlow,
  addEdge,
  useNodesState,
  useEdgesState,
  Controls,
  useReactFlow,
  type Connection,
  type Edge,
  type NodeMouseHandler,
} from '@xyflow/react'; // Note: '@xyflow/react' is the package name for React Flow v12+
import '@xyflow/react/dist/style.css';

import Sidebar from './Sidebar';
import LeftPanel from './leftPanel';
import EditNodeModal from './EditNodeModal';
import { type CustomConfigNode } from '../interfaces/customNode';


const initialNodes: CustomConfigNode[] = [
  { 
    nodeSpecificId: "one",
    id: 'node-math-1', 
    componentId: 'cmp-assess-math-1', 
    type: 'assessment',
    data: { label: 'Math Module 1' }, // React Flow standard places label inside data
    position: { x: 420, y: 150 }, 
    config: { 
      approximateDurationMinutes: 35, 
      assessment: { maxScore: 100, passingScore: 50 } 
    } 
  }
];

// 1. Define your custom configuration type




let nodeSpecificId = 0;
const getId = () => `dndnode_${nodeSpecificId++}`;

export default function DnDCanvas() {
  const reactFlowWrapper = useRef<HTMLDivElement>(null);
  const [nodes, setNodes, onNodesChange] = useNodesState<CustomConfigNode>([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([]);
  const { screenToFlowPosition } = useReactFlow();

  const [selectedNode, setSelectedNode] = useState<CustomConfigNode | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  
  
  const handleSaveCanvas = async () => {
    // Map data to match the backend structure if necessary
    const payload = {
      nodes: nodes.map(node => ({
        id: node.id,
        type: node.type || 'default',
        label: node.data?.label || '', // Adjust based on your library (like React Flow)
        x: node.position?.x || 0,
        y: node.position?.y || 0
      })),
      edges: edges.map(edge => ({
        id: edge.id,
        source: edge.source,
        target: edge.target,
        label: edge.label || ''
      }))
    };

    try {
      const response = await fetch('http://localhost:8080/api/graph/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        alert('Canvas successfully saved to H2 database!');
      } else {
        console.error('Failed to save canvas state');
      }
    } catch (error) {
      console.error('Network error:', error);
    }
  };
  

  // Triggered when a user clicks a node
  const onNodeClick = (event: React.MouseEvent, node: CustomConfigNode) => {
    setSelectedNode(node);
    setIsModalOpen(true);
  };

  // Updates the specific node fields while preserving position
  const handleSaveNode = (updatedFields: CustomConfigNode) => {
    setNodes((nds) =>
      nds.map((node) => {
        if (node.id === updatedFields.id) {
          return {
            ...node, // Keeps position, type, id intact
            nodeSpecificId: updatedFields.nodeSpecificId,
            componentId: updatedFields.componentId,
            type: updatedFields.type,
            data: { ...node.data, label: updatedFields.data?.label },
            config: {
              ...node.config,
              approximateDurationMinutes: updatedFields.config?.approximateDurationMinutes,
              assessment: {
                ...node.config?.assessment,
                maxScore: updatedFields.config?.assessment?.maxScore,
                passingScore: updatedFields.config?.assessment?.passingScore
              }
            } 
          };
        }
        return node;
      })
    );
    setIsModalOpen(false);
  };
  

  // 2. Handler for edge clicks
  const onEdgeClick = (event: React.MouseEvent, edge: any) => {
    const newLabel = prompt('Edit Edge Label:', edge.label || '');
    
    if (newLabel !== null) {
      setEdges((eds) =>
        eds.map((e) => (e.id === edge.id ? { ...e, label: newLabel } : e))
      );
    }
  };

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();

      // Retrieve the node type passed from the sidebar
      const type = event.dataTransfer.getData('application/reactflow');

      // Ensure the dropped element is valid
      if (!type) return;

      // Project the screen drop position into flow/canvas coordinates
      const position = screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });
      

      const newNode: CustomConfigNode = {
        nodeSpecificId: 'math-1',
        id: getId(),
        componentId: 'cmp-assess-math-2',
        type, 
        data: { label: 'Math Module 2' }, // React Flow standard places label inside data
        position,
        config: { 
          approximateDurationMinutes: 45, 
          assessment: { maxScore: 100, passingScore: 50 } 
        }
      }

      // Construct the new node object
      /*const newNode = {
        id: getId(),
        type,
        position,
        data: { label: `${type.toUpperCase()} node` },
      } ;*/

      setNodes((nds) => [...nds, newNode]);
    },
    [screenToFlowPosition, setNodes]
  );

  return (
    <>
    <div style={{ display: 'flex', width: '100vw', height: '100vh' }}>
      <Sidebar />
      <div style={{ flexGrow: 1, height: '100%' }} ref={reactFlowWrapper}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodeClick={onNodeClick} // <-- Add here for nodes
          onEdgeClick={onEdgeClick} // <-- Add here for edges
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onDrop={onDrop}
          onDragOver={onDragOver}
          fitView
        >
          <Controls />
        </ReactFlow>
        {isModalOpen && selectedNode && (
        <EditNodeModal
          node={selectedNode}
          onClose={() => setIsModalOpen(false)}
          onSave={handleSaveNode}
        />
      )}
      </div>
    </div>
    <button onClick={handleSaveCanvas}>Save Layout</button>
    </>
  );
}

