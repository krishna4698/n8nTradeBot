import { useState, useCallback } from 'react';
import { ReactFlow, applyNodeChanges, applyEdgeChanges, addEdge } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { TriggerSheet } from './TriggerSheet';
// import { data } from 'react-router-dom';
 
export type NodeKind  ="price-trigger" | "time-trigger" | "hyperliquid" | "backpack"| "lighter"

interface NodeType{
    data:{
        type: "action" | "trigger",
        // kind: NodeKind,
        metadata: NodeMetaData
    }, id: string,
    position: {x: number, y: number}
} 

interface Edge{
    id: string,
    source: string,
    target: string
}

export type NodeMetaData = any


export default function App() {
  const [nodes, setNodes] = useState<NodeType[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);
 
  const onNodesChange = useCallback(
    (changes: any) => setNodes((nodesSnapshot) => applyNodeChanges(changes, nodesSnapshot)),
    [],
  );
  const onEdgesChange = useCallback(
    (changes: any) => setEdges((edgesSnapshot) => applyEdgeChanges(changes, edgesSnapshot)),
    [],
  );
  const onConnect = useCallback(
    (params: any) => setEdges((edgesSnapshot) => addEdge(params, edgesSnapshot)),
    [],
  );


 
  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      {!nodes.length && <TriggerSheet onSelect={(metadata)=>{
        setNodes([...nodes,{
          id: Math.random().toString(),
          data:{
            type: "trigger",
            // kind,
            metadata
          },
          position: {x:0, y:0}
        }])
      
      }}/>}
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        fitView
      />
    </div>
  );
}