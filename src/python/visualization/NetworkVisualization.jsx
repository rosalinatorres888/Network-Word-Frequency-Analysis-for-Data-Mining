import React, { useState, useEffect, useRef } from 'react';
import { Camera } from 'lucide-react';

// Define a professional color scheme
const NODE_COLORS = {
  highFrequency: '#1f77b4',  // Blue
  mediumFrequency: '#2ca02c', // Green
  lowFrequency: '#d62728',   // Red
  default: '#7f7f7f'         // Gray
};

const NetworkVisualization = () => {
  const [graphData, setGraphData] = useState({ nodes: [], links: [] });
  const [hoveredNode, setHoveredNode] = useState(null);
  const [selectedNode, setSelectedNode] = useState(null);
  const [loading, setLoading] = useState(true);
  
  const canvasRef = useRef(null);
  const [canvasSize, setCanvasSize] = useState({ width: 800, height: 600 });
  
  // Simulation state
  const [simulationNodes, setSimulationNodes] = useState([]);
  const [hoveredNodeId, setHoveredNodeId] = useState(null);
  
  useEffect(() => {
    // Create sample network data (this would be derived from your CSV in practice)
    const sampleNodes = [
      { id: 'social networks', group: 1, frequency: 15, x: 0, y: 0 },
      { id: 'data mining', group: 1, frequency: 12, x: 0, y: 0 },
      { id: 'machine learning', group: 1, frequency: 18, x: 0, y: 0 },
      { id: 'artificial intelligence', group: 1, frequency: 10, x: 0, y: 0 },
      { id: 'business strategy', group: 2, frequency: 8, x: 0, y: 0 },
      { id: 'management systems', group: 2, frequency: 14, x: 0, y: 0 },
      { id: 'resources management', group: 2, frequency: 9, x: 0, y: 0 },
      { id: 'diversification', group: 3, frequency: 7, x: 0, y: 0 },
      { id: 'marketing', group: 3, frequency: 11, x: 0, y: 0 },
      { id: 'financial analysis', group: 3, frequency: 6, x: 0, y: 0 },
      { id: 'big data', group: 1, frequency: 16, x: 0, y: 0 },
      { id: 'investor relations', group: 3, frequency: 5, x: 0, y: 0 },
      { id: 'security', group: 2, frequency: 13, x: 0, y: 0 },
      { id: 'analytics', group: 1, frequency: 17, x: 0, y: 0 },
      { id: 'software development', group: 2, frequency: 10, x: 0, y: 0 }
    ];
    
    // Create links between related concepts
    const sampleLinks = [
      { source: 'social networks', target: 'data mining', value: 5 },
      { source: 'data mining', target: 'machine learning', value: 8 },
      { source: 'machine learning', target: 'artificial intelligence', value: 10 },
      { source: 'machine learning', target: 'big data', value: 7 },
      { source: 'big data', target: 'analytics', value: 9 },
      { source: 'analytics', target: 'data mining', value: 6 },
      { source: 'business strategy', target: 'marketing', value: 7 },
      { source: 'business strategy', target: 'diversification', value: 5 },
      { source: 'marketing', target: 'investor relations', value: 3 },
      { source: 'financial analysis', target: 'investor relations', value: 8 },
      { source: 'management systems', target: 'resources management', value: 6 },
      { source: 'management systems', target: 'software development', value: 4 },
      { source: 'security', target: 'resources management', value: 5 },
      { source: 'software development', target: 'security', value: 7 },
      { source: 'social networks', target: 'analytics', value: 4 },
      { source: 'machine learning', target: 'analytics', value: 9 },
      { source: 'artificial intelligence', target: 'software development', value: 3 },
      { source: 'business strategy', target: 'financial analysis', value: 5 }
    ];
    
    // Set node colors based on frequency
    const coloredNodes = sampleNodes.map(node => ({
      ...node,
      color: getNodeColor(node.frequency),
      radius: getNodeRadius(node.frequency)
    }));
    
    // Distribute nodes in a circle initially
    const nodeCount = coloredNodes.length;
    const radius = Math.min(canvasSize.width, canvasSize.height) * 0.35;
    coloredNodes.forEach((node, i) => {
      const angle = (i / nodeCount) * 2 * Math.PI;
      node.x = canvasSize.width / 2 + radius * Math.cos(angle);
      node.y = canvasSize.height / 2 + radius * Math.sin(angle);
    });
    
    setGraphData({ 
      nodes: coloredNodes,
      links: sampleLinks.map(link => ({
        ...link,
        // Convert string references to object references
        source: coloredNodes.find(node => node.id === link.source),
        target: coloredNodes.find(node => node.id === link.target)
      }))
    });
    
    setSimulationNodes(coloredNodes);
    setLoading(false);
  }, [canvasSize]);
  
  // Update canvas size on window resize
  useEffect(() => {
    const updateSize = () => {
      const container = document.getElementById('network-container');
      if (container) {
        setCanvasSize({
          width: container.offsetWidth,
          height: container.offsetHeight
        });
      }
    };
    
    // Initial size
    updateSize();
    
    // Add resize listener
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);
  
  // Force simulation effect
  useEffect(() => {
    if (loading || graphData.nodes.length === 0) return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    
    // Simple force-directed layout simulation
    let animationFrameId;
    let simulationRunning = true;
    
    // Apply forces and update positions
    const simulationTick = () => {
      // Clear canvas
      ctx.clearRect(0, 0, canvasSize.width, canvasSize.height);
      
      // Apply forces
      applyForces();
      
      // Draw links
      drawLinks(ctx);
      
      // Draw nodes
      drawNodes(ctx);
      
      // Continue animation if simulation is running
      if (simulationRunning) {
        animationFrameId = requestAnimationFrame(simulationTick);
      }
    };
    
    // Start simulation
    animationFrameId = requestAnimationFrame(simulationTick);
    
    // Cleanup
    return () => {
      simulationRunning = false;
      cancelAnimationFrame(animationFrameId);
    };
  }, [graphData, loading, canvasSize, hoveredNodeId, selectedNode]);
  
  // Apply force-directed layout forces
  const applyForces = () => {
    const nodes = graphData.nodes;
    const links = graphData.links;
    
    // Constants
    const centerX = canvasSize.width / 2;
    const centerY = canvasSize.height / 2;
    const centerForce = 0.0005;
    const repulsionForce = 500;
    const linkStrength = 0.03;
    const damping = 0.9;
    
    // Calculate forces
    nodes.forEach(node => {
      // Initialize forces
      node.fx = 0;
      node.fy = 0;
      
      // Center attraction force
      node.fx += (centerX - node.x) * centerForce;
      node.fy += (centerY - node.y) * centerForce;
      
      // Node repulsion (inverse square law)
      nodes.forEach(otherNode => {
        if (node !== otherNode) {
          const dx = node.x - otherNode.x;
          const dy = node.y - otherNode.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          const forceMagnitude = repulsionForce / Math.max(10, distance * distance);
          
          if (distance > 0) {
            node.fx += (dx / distance) * forceMagnitude;
            node.fy += (dy / distance) * forceMagnitude;
          }
        }
      });
    });
    
    // Apply link forces
    links.forEach(link => {
      const dx = link.target.x - link.source.x;
      const dy = link.target.y - link.source.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      if (distance > 0) {
        const forceMagnitude = (distance - 100) * linkStrength * link.value * 0.05;
        const fx = (dx / distance) * forceMagnitude;
        const fy = (dy / distance) * forceMagnitude;
        
        link.source.fx += fx;
        link.source.fy += fy;
        link.target.fx -= fx;
        link.target.fy -= fy;
      }
    });
    
    // Update positions with damping
    nodes.forEach(node => {
      node.vx = (node.vx || 0) * damping + node.fx;
      node.vy = (node.vy || 0) * damping + node.fy;
      
      node.x += node.vx;
      node.y += node.vy;
      
      // Boundary conditions
      node.x = Math.max(node.radius, Math.min(canvasSize.width - node.radius, node.x));
      node.y = Math.max(node.radius, Math.min(canvasSize.height - node.radius, node.y));
    });
  };
  
  // Draw network links
  const drawLinks = (ctx) => {
    ctx.strokeStyle = '#999';
    ctx.lineWidth = 1;
    
    graphData.links.forEach(link => {
      ctx.beginPath();
      ctx.moveTo(link.source.x, link.source.y);
      ctx.lineTo(link.target.x, link.target.y);
      
      // Highlight links connected to selected/hovered node
      if (selectedNode) {
        if (link.source.id === selectedNode.id || link.target.id === selectedNode.id) {
          ctx.strokeStyle = '#333';
          ctx.lineWidth = 2 * Math.sqrt(link.value) * 0.2;
        } else {
          ctx.strokeStyle = '#ddd';
          ctx.lineWidth = 1;
        }
      } else if (hoveredNodeId) {
        if (link.source.id === hoveredNodeId || link.target.id === hoveredNodeId) {
          ctx.strokeStyle = '#555';
          ctx.lineWidth = 2 * Math.sqrt(link.value) * 0.2;
        } else {
          ctx.strokeStyle = '#ccc';
          ctx.lineWidth = 1;
        }
      } else {
        ctx.strokeStyle = '#999';
        ctx.lineWidth = Math.sqrt(link.value) * 0.2 + 0.5;
      }
      
      ctx.stroke();
    });
  };
  
  // Draw network nodes
  const drawNodes = (ctx) => {
    graphData.nodes.forEach(node => {
      ctx.beginPath();
      ctx.arc(node.x, node.y, node.radius, 0, 2 * Math.PI);
      
      // Node fill color
      if (selectedNode && selectedNode.id === node.id) {
        ctx.fillStyle = '#ff9800'; // Orange for selected
      } else if (hoveredNodeId === node.id) {
        ctx.fillStyle = '#03a9f4'; // Light blue for hovered
      } else {
        ctx.fillStyle = node.color;
      }
      
      ctx.fill();
      
      // Node border
      if (selectedNode && selectedNode.id === node.id) {
        ctx.strokeStyle = '#e65100';
        ctx.lineWidth = 3;
      } else if (hoveredNodeId === node.id) {
        ctx.strokeStyle = '#0277bd';
        ctx.lineWidth = 2;
      } else {
        ctx.strokeStyle = '#fff';
        ctx.lineWidth = 1;
      }
      
      ctx.stroke();
      
      // Draw labels for higher frequency nodes, selected or hovered nodes
      if (node.frequency > 10 || node.id === hoveredNodeId || (selectedNode && node.id === selectedNode.id)) {
        const fontSize = Math.max(10, Math.min(14, node.radius * 0.8));
        ctx.font = `${fontSize}px Arial`;
        ctx.fillStyle = '#000';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        
        // Draw text background for better readability
        const textWidth = ctx.measureText(node.id).width;
        ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
        ctx.fillRect(node.x - textWidth / 2 - 3, node.y - fontSize / 2 - 3, textWidth + 6, fontSize + 6);
        
        // Draw text
        ctx.fillStyle = '#000';
        ctx.fillText(node.id, node.x, node.y);
      }
    });
  };
  
  // Determine node color based on frequency
  const getNodeColor = (frequency) => {
    if (frequency >= 15) return NODE_COLORS.highFrequency;
    if (frequency >= 10) return NODE_COLORS.mediumFrequency;
    return NODE_COLORS.lowFrequency;
  };
  
  // Calculate node radius based on frequency
  const getNodeRadius = (frequency) => {
    return Math.max(5, Math.sqrt(frequency) * 2.5);
  };
  
  // Handle canvas mouse events
  const handleCanvasMouseMove = (e) => {
    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Check if mouse is over a node
    let found = false;
    for (const node of graphData.nodes) {
      const dx = x - node.x;
      const dy = y - node.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      if (distance <= node.radius + 2) {
        setHoveredNodeId(node.id);
        setHoveredNode(node);
        document.body.style.cursor = 'pointer';
        found = true;
        break;
      }
    }
    
    if (!found) {
      setHoveredNodeId(null);
      setHoveredNode(null);
      document.body.style.cursor = 'default';
    }
  };
  
  // Handle node click
  const handleCanvasClick = (e) => {
    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Check if a node was clicked
    for (const node of graphData.nodes) {
      const dx = x - node.x;
      const dy = y - node.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      if (distance <= node.radius + 2) {
        // Toggle selection
        if (selectedNode && selectedNode.id === node.id) {
          setSelectedNode(null);
        } else {
          setSelectedNode(node);
        }
        return;
      }
    }
    
    // Click on empty space resets selection
    setSelectedNode(null);
  };
  
  // Format text for node details panel
  const getNodeDetailsText = (node) => {
    if (!node) return null;
    
    let groupName;
    switch(node.group) {
      case 1: groupName = "Data Science"; break;
      case 2: groupName = "Management & IT"; break;
      case 3: groupName = "Business"; break;
      default: groupName = "Other";
    }
    
    // Get connected nodes
    const connectedNodes = graphData.links
      .filter(link => link.source.id === node.id || link.target.id === node.id)
      .map(link => link.source.id === node.id ? link.target.id : link.source.id);
    
    return (
      <div>
        <h3 className="text-lg font-bold">{node.id}</h3>
        <p><strong>Frequency:</strong> {node.frequency}</p>
        <p><strong>Category:</strong> {groupName}</p>
        <p><strong>Connections:</strong> {connectedNodes.length}</p>
        <p><strong>Related to:</strong></p>
        <ul className="list-disc pl-5">
          {connectedNodes.slice(0, 5).map(nodeId => (
            <li key={nodeId}>{nodeId}</li>
          ))}
          {connectedNodes.length > 5 && <li>...and {connectedNodes.length - 5} more</li>}
        </ul>
      </div>
    );
  };
  
  // Handle export function
  const handleExportImage = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    // Create a temporary link
    const link = document.createElement('a');
    link.download = 'keyword_network.png';
    link.href = canvas.toDataURL('image/png');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  
  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <div className="bg-gray-800 text-white py-4 px-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">Academic Keyword Network Analysis</h1>
            <p className="text-gray-300">Visualizing relationships between research concepts</p>
          </div>
          <button 
            onClick={handleExportImage}
            className="flex items-center bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded"
          >
            <Camera size={18} className="mr-1" />
            Export
          </button>
        </div>
      </div>
      
      <div className="flex flex-1 overflow-hidden">
        {/* Main visualization area */}
        <div 
          id="network-container" 
          className="flex-1 relative"
        >
          {loading ? (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-xl text-gray-600">Loading network data...</div>
            </div>
          ) : (
            <canvas
              ref={canvasRef}
              width={canvasSize.width}
              height={canvasSize.height}
              onMouseMove={handleCanvasMouseMove}
              onClick={handleCanvasClick}
              className="block"
            />
          )}
        </div>
        
        {/* Details panel */}
        <div className="w-64 bg-white border-l border-gray-200 p-4 overflow-y-auto">
          <div className="mb-6">
            <h2 className="text-lg font-bold mb-2">Network Legend</h2>
            <div className="space-y-2">
              <div className="flex items-center">
                <div className="w-4 h-4 rounded-full mr-2" style={{ backgroundColor: NODE_COLORS.highFrequency }}></div>
                <span>High Frequency (15+)</span>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 rounded-full mr-2" style={{ backgroundColor: NODE_COLORS.mediumFrequency }}></div>
                <span>Medium Frequency (10-14)</span>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 rounded-full mr-2" style={{ backgroundColor: NODE_COLORS.lowFrequency }}></div>
                <span>Low Frequency (&lt;10)</span>
              </div>
            </div>
          </div>
          
          <div className="mb-6">
            <h2 className="text-lg font-bold mb-2">Network Statistics</h2>
            <div className="space-y-1">
              <div>Nodes: {graphData.nodes.length}</div>
              <div>Links: {graphData.links.length}</div>
              <div>Avg. Connections: {(graphData.links.length / (graphData.nodes.length || 1)).toFixed(2)}</div>
            </div>
          </div>
          
          <div>
            <h2 className="text-lg font-bold mb-2">
              {selectedNode ? 'Selected Keyword' : hoveredNode ? 'Hovered Keyword' : 'Keyword Details'}
            </h2>
            <div className="bg-gray-100 p-3 rounded">
              {selectedNode ? (
                getNodeDetailsText(selectedNode)
              ) : hoveredNode ? (
                getNodeDetailsText(hoveredNode)
              ) : (
                <p className="text-gray-500">Click on a node to see details</p>
              )}
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-gray-200 p-3 text-center text-gray-700">
        <p>Network & Word Frequency Analysis | Rosalina Torres</p>
      </div>
    </div>
  );
};

export default NetworkVisualization;
