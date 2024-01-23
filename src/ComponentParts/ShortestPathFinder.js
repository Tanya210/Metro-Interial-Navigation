import React, { useState } from 'react';
import graph from './graph';
function ShortestPathFinder() {

  const [startNode, setStartNode] = useState('A');
  const [endNode, setEndNode] = useState('E');
  const [shortestPath, setShortestPath] = useState([]);
  const [shortestPathLinkingObjects, setShortestPathLinkingObjects] = useState([]);

  const findShortestPath = () => {
    const visited = new Set();
    const queue = [{ node: startNode, path: [startNode], linkingObjects: [], valueSum: 0 }];

    while (queue.length > 0) {
      // Sort the queue based on the valueSum property
      queue.sort((a, b) => a.valueSum - b.valueSum);

      const { node, path, linkingObjects, valueSum } = queue.shift();

      if (node === endNode) {
        setShortestPath(path);
        setShortestPathLinkingObjects(linkingObjects);
        return;
      }

      if (!visited.has(node)) {
        visited.add(node);
        const currentNodeObj = graph.find((nodeObj) => nodeObj.node === node);
        if (currentNodeObj) {
          for (const neighborObj of currentNodeObj.connectsTo) {
            const neighbor = neighborObj.node;
            if (!visited.has(neighbor)) {
              const newPath = [...path, neighbor];
              const newValueSum = valueSum + neighborObj.value;
              const newLinkingObjects = [...linkingObjects, neighborObj];
              queue.push({ node: neighbor, path: newPath, linkingObjects: newLinkingObjects, valueSum: newValueSum });
            }
          }
        }
      }
    }

    // If no path is found, reset the shortestPath state
    setShortestPath([]);
    setShortestPathLinkingObjects([]);
  };

  return (
    <div>
      <h1>Shortest Path Finder</h1>
      <button onClick={findShortestPath}>Find Shortest Path</button>
      <div>
        Shortest Path:
        {shortestPath.length > 0 ? (
          <ul>
            {shortestPath.map((node, index) => (
              <li key={index}>{node}</li>
            ))}
          </ul>
        ) : (
          'No path found'
        )}
      </div>
      {console.log(shortestPathLinkingObjects)}
    </div>
  );
}

export default ShortestPathFinder;
