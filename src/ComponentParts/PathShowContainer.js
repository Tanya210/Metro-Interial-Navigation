import React, { useEffect, useState } from 'react';
import '../Styles/PathShowContainer.css';
// import { toast } from 'react-toastify';
import metro from '../assets/metro-logo.png';

function PathShowContainer({ path , nodes , steps }) {
  const [LinkedPath, setLinkedPath] = useState(null);
    
        useEffect(() => {

            if(path.length!==0){

            
    
            // console.log(path);
            setLinkedPath(path);
      
            let newEntry = {
              _id: 'Starting Point',
              node: `${nodes[0]}`,
              desc: 'You are currently present here',
            };
      
            setLinkedPath((prevLinkedPath) => {
              let replica = [...prevLinkedPath];
              replica.unshift(newEntry);
              return replica;
            });

        }

          },[path]);
    
  

  return (
    <div className='PathShowContainer-storage'>
        {steps===-1?"":<div className='totalSteps'> STEPS: {steps}</div>}
      {LinkedPath==null?console.log():(

         

            LinkedPath.map((currentNode,index)=>{
                // return <div>{currentNode.node}</div>
                return (<div key={index} className='entryBox'>
                    
                    <div className='entryBox-image'>
                      <img src={metro} alt='metro-logo' className='entryBox-image-img'/>
                    </div>
                    <div className='entryBox-data'>
                      <div className='entryBox-data-heading'>{currentNode.node}</div>
                      <div className='entryBox-data-description'>{currentNode.desc}.</div>
                    </div>
                </div>)
            })
        

      )}
    </div>
  );
}

export default PathShowContainer;
