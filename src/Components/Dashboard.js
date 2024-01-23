import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import '../Styles/Dashboard.css';
import PathShowContainer from '../ComponentParts/PathShowContainer';
import ImageMap from './ImageMap';
// import MapLoader from '../ComponentParts/MapLoader';
// import Mapping from './Mapping';
function Dashboard(props) {
  const [path , setPath] = useState([]);
  const [nodes, setNodes] = useState([]);
  const [steps, setSteps] = useState(-1);  
  const [stationData , setStationData] = useState([]);
  const [img , setImg] = useState("");
  // const [graph , setGraph] = useState([]);
  const [inputData, setInputData] = useState({
    station : null,
    entry : null,
    exit : null
  });
  function changeHandler(event){
    setInputData((prevData) => {
      if (event.target.name === "station") {
        return ({
          [event.target.name]: event.target.value,
          entry: "",
          exit: ""
        });

      }
      return ({
        ...prevData,
        [event.target.name]: event.target.value
      }
      );
    })  
  }
  async function submitHandler(event){
    event.preventDefault();
    const response = await fetch(`${process.env.REACT_APP_BASE_URL}/graph` , {
      method : "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({station : inputData.station}),
    });
    if(response.status === 200){
      const data = await response.json()
      const graph = data.data.map(item => {
      const { _id, ...rest } = item;
      return rest;
      });
      // console.log(data);
      // console.log(dataWithoutId);
      // await setGraph(dataWithoutId); 
      findGraph();
      findShortestDistance(graph);
    }
    else{
      const data = await response.json()
      toast(`${data.message}`,{
        position:"top-center",
        type:"error",
        height:"20vh",
      });
    }
  }

  async function findGraph(){
    const response = await fetch(`${process.env.REACT_APP_BASE_URL}/graphImg`,{
      method : "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body : JSON.stringify({station : inputData.station})
    })
    const data = await response.json();
    // console.log(data);
    if(response.status===500){
      toast(`there is some error in loading map`,{
        position:"top-center",
        type:"info",
        height:"20vh",
      });
    }
    if(response.status===200){
      setImg(data.data);
    }
  }

  async function findShortestDistance(graph){
    const response = await fetch(`${process.env.REACT_APP_BASE_URL}/shortestPath` , {
      method : "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({graph , startNode : inputData.entry , endNode : inputData.exit})
    })
    const data = await response.json()
    if(response.status === 401){
      toast(`${data.message}`,{
        position:"top-center",
        type:"info",
        height:"20vh",
      });
    }
    if(response.status === 200){
      // console.log(response.status);
      // console.log(data.result.shortestPath);
      // console.log(data.result);
      setNodes(data.result.shortestPath);
      setPath(data.result.shortestPathLinkingObjects);
      setSteps(data.result.shortestDistance);
    }
  }
  async function getStation(){
    try{
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}/station`);
      if(response.status === 200){
        const data = await response.json();
        setStationData(data.data);
      }
      else{
        return [];
      }
    }
    catch(e){
      console.log(e);
    }
   
  }
  useEffect(() => {
    getStation();
  }, []);
  return (
    <div className='Dashboard-storage'>
        <div className='DashboardInput'>
          <label className='DashboardInput-label' htmlFor="station">Metro Station</label>
          <select name="station" id='station' className='DashboardInput-select' onChange={changeHandler} value={inputData.station || ""}>
           <option value="" disabled  className='DashboardInput-option'>Please select one out of given Stations</option>
            {stationData.map((station)=>{
              return <option key={station._id} name = {station.name} id={station.name} className='DashboardInput-option'>{station.name}</option>
            })}
          </select>

          <label className='DashboardInput-label' htmlFor='entry'>Current Location</label>
          <select name="entry" id='entry' className='DashboardInput-select' onChange={changeHandler} value={inputData.entry || ""}>
           <option value="" disabled  className='DashboardInput-option' >Please select one out of given Starting Points</option>
           {stationData.find(item=> item.name === inputData.station)?stationData.find(item=>item.name === inputData.station).entry.map((entry , index)=>{
            return (<option key={index} name = {entry} id={entry} className='DashboardInput-option'>{entry}</option>)
           }) : null}
          </select>

          <label className='DashboardInput-label' htmlFor='exit'>Destination</label>
          <select name="exit" id='exit' className='DashboardInput-select' onChange={changeHandler} value={inputData.exit || ""}>
           <option value="" disabled  className='DashboardInput-option'>Please select one out of given destination</option>
           {stationData.find(item=> item.name === inputData.station)?stationData.find(item=>item.name === inputData.station).entry.map((entry , index)=>{
            return <option key={index} name = {entry} id={entry} className='DashboardInput-option'>{entry}</option>
           }) : null}
          </select>

          <button className='DashboardInput-btn' onClick={submitHandler}>Submit</button>
        </div>
        <div className='DashboardOutput'>
         
            <ImageMap img = {img} nodes={nodes}></ImageMap>
          
          <div className='DashboardOutput-data'>
           <PathShowContainer path = {path}  nodes = {nodes} steps = {steps}/>
          </div>
        </div>
    </div>
  );
}

export default Dashboard;
