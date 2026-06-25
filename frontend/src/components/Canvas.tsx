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
} from '@xyflow/react'; // Note: '@xyflow/react' is the package name for React Flow v12+
import '@xyflow/react/dist/style.css';

import Sidebar from './Sidebar';
import LeftPanel from './leftPanel';

let id = 0;
const getId = () => `dndnode_${id++}`;

export default function DnDCanvas() {
  const reactFlowWrapper = useRef<HTMLDivElement>(null);
  const [nodes, setNodes, onNodesChange] = useNodesState<Node>([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([]);
  const { screenToFlowPosition } = useReactFlow();

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

      // Construct the new node object
      const newNode = {
        id: getId(),
        type,
        position,
        data: { label: `${type.toUpperCase()} node` },
      } ;

      setNodes((nds) => [...nds, newNode]);
    },
    [screenToFlowPosition, setNodes]
  );

  return (
    <div style={{ display: 'flex', width: '100vw', height: '100vh' }}>
      <Sidebar />
      <div style={{ flexGrow: 1, height: '100%' }} ref={reactFlowWrapper}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onDrop={onDrop}
          onDragOver={onDragOver}
          fitView
        >
          <Controls />
        </ReactFlow>
      </div>
    </div>
  );
}

