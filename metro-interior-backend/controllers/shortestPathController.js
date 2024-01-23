
exports.shortestPathController = (req , res)=>{
    try{
        const {graph , startNode , endNode}  = req.body;
        if(!startNode && !endNode){
            return res.status(401).json({
                success : false,
                message : "please select starting Point and Destination",
            })
        }
        else if(!startNode){
            return res.status(401).json({
                success : false,
                message : "please select starting Point",
            })
        }
        else if(!endNode){
            return res.status(401).json({
                success : false,
                message : "please select final destination",
            })
        }
        else if(startNode == endNode){
          return res.status(401).json({
            success : false,
            message : "You are on the same location" 
          })
        }
        const result = findShortestPathWithLinkingObjects(startNode, endNode, graph);
        res.status(200).json({
            success : true,
            result,
        });
    }
    catch(E){
        return res.status(500).json({
            success : false,
            message : "internal Server error",
        })
    }
}

function findShortestPathWithLinkingObjects(
    startNode,
    endNode,
    graph
  ) {
    const visited = new Set();
    const queue = [{ node: startNode, path: [startNode], linkingObjects: [], valueSum: 0 }];

    while (queue.length > 0) {
      queue.sort((a, b) => a.valueSum - b.valueSum); // Sort by valueSum

      const { node, path, linkingObjects, valueSum } = queue.shift();

      if (node === endNode) {
        return {
          shortestPath: path,
          shortestPathLinkingObjects: linkingObjects,
          shortestDistance: valueSum,
        };
      }

      if (!visited.has(node)) {
        visited.add(node);
        const currentNodeObj = graph.find((nodeObj) => nodeObj.node === node);
        if (currentNodeObj) {
          for (const neighborObj of currentNodeObj.connectsTo) {
            const neighbor = neighborObj.node;
            if (!visited.has(neighbor)) {
              const newPath = [...path, neighbor];
              const newLinkingObjects = [...linkingObjects, neighborObj];
              const newValueSum = valueSum + parseInt(neighborObj.value, 10);
              queue.push({ node: neighbor, path: newPath, linkingObjects: newLinkingObjects, valueSum: newValueSum });
            }
          }
        }
      }
    }

    return { shortestPath: [], shortestPathLinkingObjects: [], shortestDistance: 0 };
  }
  
    
//   function findShortestPathAStar(startNode, endNode, graph) {
//   const visited = new Set();
//   const queue = [
//     { node: startNode, path: [startNode], linkingObjects: [], valueSum: 0, heuristic: heuristicCost(startNode, endNode) }
//   ];

//   while (queue.length > 0) {
//     queue.sort((a, b) => (a.valueSum + a.heuristic) - (b.valueSum + b.heuristic)); // Sort by f(n) = g(n) + h(n)

//     const { node, path, linkingObjects, valueSum } = queue.shift();

//     if (node === endNode) {
//       return {
//         shortestPath: path,
//         shortestPathLinkingObjects: linkingObjects,
//         shortestDistance: valueSum
//       };
//     }

//     if (!visited.has(node)) {
//       visited.add(node);
//       const currentNodeObj = graph.find((nodeObj) => nodeObj.node === node);

//       if (currentNodeObj) {
//         for (const neighborObj of currentNodeObj.connectsTo) {
//           const neighbor = neighborObj.node;

//           if (!visited.has(neighbor)) {
//             const newPath = [...path, neighbor];
//             const newLinkingObjects = [...linkingObjects, neighborObj];
//             const newValueSum = valueSum + parseInt(neighborObj.value, 10);
//             const newHeuristic = heuristicCost(neighbor, endNode);

//             queue.push({
//               node: neighbor,
//               path: newPath,
//               linkingObjects: newLinkingObjects,
//               valueSum: newValueSum,
//               heuristic: newHeuristic
//             });
//           }
//         }
//       }
//     }
//   }

//   return { shortestPath: [], shortestPathLinkingObjects: [], shortestDistance: 0 };
// }

// // Example of a simple heuristic function (Euclidean distance between nodes)
// function heuristicCost(nodeA, nodeB) {
//   // Assuming nodes have x and y coordinates
//   const nodeACoordinates = getNodeCoordinates(nodeA);
//   const nodeBCoordinates = getNodeCoordinates(nodeB);

//   const dx = nodeACoordinates.x - nodeBCoordinates.x;
//   const dy = nodeACoordinates.y - nodeBCoordinates.y;

//   return Math.sqrt(dx * dx + dy * dy);
// }

// function getNodeCoordinates(node) {
//   // You need to implement a function that returns the coordinates of a node
//   // For example, if nodes have { x, y } coordinates, you would extract them here.
//   // Replace this with your actual implementation based on your graph structure.
//   return { x: 0, y: 0 };
// }

  



// function findShortestPathWithLinkingObjects(startNode, endNode , graph) {
//     const visited = new Set();
//     const queue = [{ node: startNode, path: [startNode], linkingObjects: [], valueSum: 0 }];
  
//     while (queue.length > 0) {
//       queue.sort((a, b) => a.valueSum - b.valueSum); // Sort by valueSum
  
//       const { node, path, linkingObjects, valueSum } = queue.shift();
  
//       if (node === endNode) {
//         return { shortestPath: path, shortestPathLinkingObjects: linkingObjects, shortestDistance: valueSum };
//       }
  
//       if (!visited.has(node)) {
//         visited.add(node);
//         const currentNodeObj = graph.find((nodeObj) => nodeObj.node === node);
//         if (currentNodeObj) {
//           for (const neighborObj of currentNodeObj.connectsTo) {
//             const neighbor = neighborObj.node;
//             if (!visited.has(neighbor)) {
//               const newPath = [...path, neighbor];
//               const newLinkingObjects = [...linkingObjects, neighborObj];
//               const newValueSum = valueSum + neighborObj.value;
//               queue.push({ node: neighbor, path: newPath, linkingObjects: newLinkingObjects, valueSum: newValueSum });
//             }
//           }
//         }
//       }
//     }
  
//     return { shortestPath: [], shortestPathLinkingObjects: [], shortestDistance: 0 };
//   }
  

