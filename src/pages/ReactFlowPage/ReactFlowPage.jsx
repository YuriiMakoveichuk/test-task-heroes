import { useCallback, useState } from "react";
import {
  ReactFlow,
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";

import Films from "../../components/Films/Films.jsx";
import DetailsHero from "../../components/DetailsHero/DetailsHero.jsx";
import Starships from "../../components/Starships/Starships.jsx";
// import DetailsHero from "../../components/DetailsHero/DetailsHero.jsx";

const rfStyle = {
  backgroundColor: "#B8CEFF",
  height: "100hv",
  width: "100hv",
};

const initialNodes = [
  {
    id: "node-1",
    type: "DetailsHero",
    position: { x: 0, y: 0 },
  },
  {
    id: "node-2",
    type: "Films",
    targetPosition: "top",
    position: { x: -200, y: 700 },
  },
  {
    id: "node-3",
    type: "Starships",
    targetPosition: "top",
    position: { x: 200, y: 700 },
  },
];

const initialEdges = [
  { id: "edge-1", source: "node-1", target: "node-2", sourceHandle: "a" },
  { id: "edge-2", source: "node-1", target: "node-3", sourceHandle: "a" },
];

const nodeTypes = {
  DetailsHero: DetailsHero,
  Films: Films,
  Starships: Starships,
};

const ReactFlowPage = () => {
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);

  const onNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    [setNodes]
  );
  const onEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    [setEdges]
  );
  const onConnect = useCallback(
    (connection) => setEdges((eds) => addEdge(connection, eds)),
    [setEdges]
  );
  return (
    <div style={{ width: 1000, height: 1000, backgroundColor: "#B8CEFF" }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        fitView
        style={rfStyle}
      />
    </div>
  );
};

export default ReactFlowPage;
