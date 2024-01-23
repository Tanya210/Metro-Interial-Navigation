import React, { useEffect } from 'react';
import L, { icon } from 'leaflet';
import 'leaflet/dist/leaflet.css';
// import logo from 'leaflet/dist/images/marker-icon-2x.png'
// import logo from '.../node_modules/leaflet/dist/images/marker-icon-2x.png'
function ImageMap({img , nodes}) {
  // console.log(nodes);
  const customPathCoordinates = {
    "Gate1":[[-71.27304556125081,-181.56346769682247],[3.532920480411707,-181.56346769682247]],
    "Gate2":[[71.27304556125081,-181.56346769682247],[3.532920480411707,-181.56346769682247]],
    "Gate3":[[-71.9381833480354,181.58918321516683],[2.831323797399744,181.58918321516683]],
    "Gate4":[[ 70.59877111889543,181.58918321516683],[2.831323797399744,181.58918321516683]],
    "Smart Card Vending Machine before security check at platform 1":[[3.532920480411707,-227.30944116441802],[3.532920480411707,-181.56346769682247]],
    "Security Check at Platform 1":[[3.532920480411707,-128.77965215728915],[3.532920480411707,-181.56346769682247]],
    "Ticket Gate Machine before Platform 1":[[3.532920480411707,-90.77530496882515],[3.532920480411707,-34.47256839332292]],
    "Smart Card Vending Machine before security check at platform 2":[[3.532920480411707,231.5578619259251],[3.532920480411707,182.29296742236065]],
    "Security Check at Platform 2":[[3.532920480411707,123.1750940180833],[3.532920480411707,182.29296742236065]],
    "Ticket Gate Machine before Platform 2":[[3.532920480411707,83.7631784152317],[3.532920480411707,28.86801025411707]],
    "Platform 1 BackSide":[[-72.36886278550352,-34.47256839332292],[3.532920480411707,-34.47256839332292]],
    "Platform 1 Female side":[[71.0602446651573,-34.47256839332292],[3.532920480411707,-34.47256839332292]],
    "Platform 2 BackSide":[[71.95165832258427,28.86801025411707],[3.532920480411707,28.86801025411707]],
    "Platform 2 Female side":[[-71.71904645116855,28.86801025411707],[3.532920480411707,28.86801025411707]],
  }

  useEffect(() => {
    
    if(nodes.length!==0){
      const map = L.map('map', {
        center: [0, 0],
        zoom: 1,
        maxZoom: 1,
        minZoom: 1,
        dragging:true
      });
      // L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      //   // attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      // }).addTo(map);


    const imageBounds = [[-76, -243], [76, 243]];
    // const imageBounds = [  [-(100 / 3.95 * 3), -(100 * (16 / 6.6) )], // 100vw and 100vh are used as 100% of viewport width and height
    // [100 / 3.95 * 3, (100 * (16 / 6.6) )],];
    L.imageOverlay(process.env.REACT_APP_PUBLIC_URL + `${img}`, imageBounds).addTo(map);
    
    // function onMapClick(e) {
      
    //   console.log('Latitude:', e.latlng.lat, 'Longitude:', e.latlng.lng);

    //   console.log('Pixel X:', e.layerPoint.x, 'Pixel Y:', e.layerPoint.y);
    // }

    // // Attach the click event to the map
    // map.on('click', onMapClick);

    // const firstKey = nodes[0];
    // const lastKey = nodes[nodes.length - 1];

    // const extractedValues = [customPathCoordinates[firstKey], customPathCoordinates[lastKey]];
    // console.log(extractedValues);
    // const resultArray = extractedValues.map(innerArray => innerArray[0]);
    // console.log(resultArray);
    // const customIcon = L.icon({
    //   iconUrl: process.env.REACT_APP_PUBLIC_URL+`/marker-icon-2x.png`,
    //   iconSize: [32, 32],
    //   iconAnchor: [15, 20],
    // });
    // const marker1 = L.marker(resultArray[0],{icon: customIcon}).addTo(map);
    // const marker2 = L.marker(resultArray[1],{icon: customIcon}  ).addTo(map);
    //   // marker1.bindPopup('Popup for Marker 1').openPopup();
    //   // marker2.bindPopup('Popup for Marker 2').openPopup();

    // const selectedCoordinates = nodes.map(node => customPathCoordinates[node]);
    // // console.log(selectedCoordinates);
    // const flattenedArray = selectedCoordinates.flatMap(innerArray => innerArray);
    // // console.log(flattenedArray);

    // const reorderedCoordinates = reorderCoordinates(flattenedArray);
    // const customPathPolyline = L.polyline(reorderedCoordinates, { color: 'blue' }).addTo(map);

    // function reorderCoordinates(coordinates) {
    //   const reordered = [coordinates[0]]; // Start with the first point

    //   while (reordered.length < coordinates.length) {
    //     const lastPoint = reordered[reordered.length - 1];
    //     const nearest = findNearestPoint(lastPoint, coordinates.filter(coord => !reordered.includes(coord)));
    //     reordered.push(nearest);
    //   }

    //   return reordered;
    // }

    function findNearestPoint(origin, points) {
      let nearestDistance = Infinity;
      let nearestPoint = null;

      points.forEach(point => {
        const distance = calculateDistance(origin, point);
        if (distance < nearestDistance) {
          nearestDistance = distance;
          nearestPoint = point;
        }
      });

      return nearestPoint;
    }

    function calculateDistance(point1, point2) {
      const [x1, y1] = point1;
      const [x2, y2] = point2;

      return Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
    }

    // ... (your existing code)

const firstKey = nodes[0];
const lastKey = nodes[nodes.length - 1];
const extractedValues = [customPathCoordinates[firstKey], customPathCoordinates[lastKey]];
const resultArray = extractedValues.map(innerArray => innerArray[0]);

const customIcon = L.icon({
  iconUrl: process.env.REACT_APP_PUBLIC_URL + `/marker-icon-2x.png`,
  iconSize: [32, 32],
  iconAnchor: [15, 20],
});

const marker1 = L.marker(resultArray[0], { icon: customIcon }).addTo(map);
const marker2 = L.marker(resultArray[1], { icon: customIcon }).addTo(map);

const selectedCoordinates = nodes.map(node => customPathCoordinates[node]);
const flattenedArray = selectedCoordinates.flatMap(innerArray => innerArray);
const reorderedCoordinates = reorderCoordinates(flattenedArray);
const customPathPolyline = L.polyline(reorderedCoordinates, { color: 'blue' }).addTo(map);

function reorderCoordinates(coordinates) {
  const reordered = [coordinates[0]]; // Start with the first point

  while (reordered.length < coordinates.length) {
    const lastPoint = reordered[reordered.length - 1];
    const nearest = findNearestPoint(lastPoint, coordinates.filter(coord => !reordered.includes(coord)));

    reordered.push(nearest);

    // Break if the next point is the destination
    if (nearest[0] === resultArray[1][0] && nearest[1] === resultArray[1][1]) {
      break;
    }
  }

  return reordered;
}

// ... (your existing code)







   
  
    return () => {
      map.remove();
    };
  }
  }, [img,nodes]);

  return (
    <div id='map' style={{ width: "100%", height: "50vh" , backgroundColor:"transparent"}}></div>
  );
}

export default ImageMap;
