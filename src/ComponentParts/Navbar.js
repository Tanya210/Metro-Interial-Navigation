import React from 'react';
import '../Styles/Navbar.css';
import image from '../assets/MINS5.png';
import { useNavigate } from 'react-router-dom';
function Navbar(props) {
    const navigate = useNavigate();
  async function LinkHandler(event){
        const specificElement = document.getElementById(`${event.target.innerText}`);
        
    if (specificElement) {
      specificElement.scrollIntoView({ behavior: 'smooth' });
    }
    else{
        await navigate('/');
        const specificElement = document.getElementById(`${event.target.innerText}`);
        if (specificElement) {
            specificElement.scrollIntoView({ behavior: 'smooth' });
          }
    }
    }
    function loginHangler(){
        navigate('/login');
    }
    function logoutHangler(){
        props.setLogedIn(false);
        navigate('/login');
    }
    function signHangler(){
        navigate('/signup');
    }
    function dashboardHandler(){
        navigate('/dashboard');
    }
  return(
    <div className='Navbar-storage'>
        <div className='Navbar-item Navbar-img-div'>
            <img src= {image} alt='StudyNotion' className='Navbar-logo' onClick={LinkHandler}></img>
        </div>
        <div className='Navbar-item Navbar-link'>
            <div className='Navbar-item-link'  onClick = {LinkHandler}>Home</div>
            <div className='Navbar-item-link' onClick = {LinkHandler}>About</div>
            <div className='Navbar-item-link' onClick = {LinkHandler}>Contact</div>
        </div>
        <div className='Navbar-item Navbar-btn' >
            {!props.logedIn?<button className='Navbar-btns-look'onClick={loginHangler}>Log in</button>:<button className='Navbar-btns-look'onClick={logoutHangler}>Log Out</button>}
            {!props.logedIn?<button className='Navbar-btns-look' onClick={signHangler}>Sign up</button>:<button className='Navbar-btns-look' onClick={dashboardHandler}> Dashboard</button>}  
        </div>
    </div>
  );
}

export default Navbar;
