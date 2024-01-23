import React, { useState , useEffect } from 'react';
import '../Styles/LoginPage.css';
import Frame from '../assets/frame.png';
import Station from '../assets/sealdah.jpg'
import { AiOutlineEye } from 'react-icons/ai';
import {AiOutlineEyeInvisible} from 'react-icons/ai';
import googleLogo from '../assets/google.png';
import { useNavigate } from 'react-router-dom';
import Typed from 'typed.js';
import { toast } from 'react-toastify';
function LoginPage(props) {
  const navigate = useNavigate();
  useEffect(() => {
    const typeData = new Typed(".profile", {
      strings: [
        "Welcome To Metro Station Interior Navigation System.",
        "Welcome To Your Personal Interior Navigator.",
      ],
      loop: true,
      typeSpeed: 150,
      backSpeed: 100,
      backDelay: 1000,
      showCursor: false,
    });

    return () => {
      // Cleanup the Typed instance when the component unmounts
      typeData.destroy();
    };
  }, []);

 
  const[passwordVisible , setPasswordVisible] = useState(false);
  const[formData, setFormData] = useState({
    email: "",
    password: ""
  })
  function changeHandler(event){
      setFormData((prevData) =>{
        return {
          ...prevData,
          [event.target.name] : event.target.value
        }
      })
  }
  async function submitHandler(event){
    event.preventDefault();
    try{
      // console.log("yo");
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}/login`,{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
        
      })
      // console.log("no");
      const data = await response.json();
      // localStorage.setItem('token', `${data.token}`);
      // console.log(data);
      if(response.status===200){
        setFormData({
          email :"",
          password:""
        })
        props.setLogedIn(true);
        toast.success("You Are Logged-In Successfully",{
          position:"top-center",
          type:"success",
          height:"20vh",
        });
        navigate('/dashboard');
      }
      else if(response.status===400 && data.message === "user do not exist, please do signup first"){
        toast.error("User does not exist",{
          position:"top-center",
          type:"error",
          height:"20vh",
        });
      }
      else if(response.status === 401){
        toast("Password is not Correct",{
          position:"top-center",
          type:"warning",
          height:"20vh",
        });
      }
    }
    catch(e){
        console.log(e);
    }
  }
  function passwordVisibilityHandler(){
    if(passwordVisible===false){
      setPasswordVisible(true);
    }
    else{
      setPasswordVisible(false);
    }
  }
  return (
    <div className='LoginPage-storage'>
          <div className='LoginPage-content-box'>
            <div className='LoginPage-content-heading profile'></div>
            <p className='LoginPage-content-desc'>Interior Navigation for a Stress-Free Metro Experience.</p>
            <p className='LoginPage-content-desc-italic'> Navigate the Metro-Maze with Ease.</p>
            <form className='LoginPage-content-form' onSubmit={submitHandler}>
              <p className='LoginPage-content-form-label'>Email Address <sup className='LoginPage-content-form-label-req'>*</sup></p>
              <input className='LoginPage-content-form-input' placeholder='Enter Email Address' type='email' value={formData.email} name='email' onChange={changeHandler} required/>
              <div className='LoginPage-content-form-password-div'>
              <p className='LoginPage-content-form-label'>Password <sup className='LoginPage-content-form-label-req'>*</sup></p>
              <input className='LoginPage-content-form-input LoginPage-content-form-input-password' placeholder='Enter Password' value={formData.password} name='password' type={!passwordVisible?"password":"text"}  onChange={changeHandler} required></input>
              {!passwordVisible?<AiOutlineEye className='eyeico' onClick={passwordVisibilityHandler}></AiOutlineEye>:<AiOutlineEyeInvisible className="eyeico" onClick={passwordVisibilityHandler}></AiOutlineEyeInvisible>}
              <a href='/' className='forgetPassword'>Forget Password</a>
              </div>
              <button className='LoginPage-content-form-submit-btn'>Sign in</button>
            </form>
            <div style={{display:"flex", alignItems:"center" , justifyContent:"space-between", marginTop:"2vh"}}>
              <div style={{width:"44%" , height:"0.2vh" ,backgroundColor:"red"}}></div>
              <p style={{fontSize:"1.2rem"}}>OR</p>
              <div style={{width:"44%",height:"0.2vh" ,backgroundColor:"red"}}></div>
            </div>
            <button className='LoginPage-content-login-google'><img src={googleLogo} alt = "logo" className='googleimg'></img>Sign in with Google</button>
          </div>  
          <div className='LoginPage-image-box'>
            <img src={Frame} alt = "frame" className='LoginPage-image-frame'></img>
            <img src = {Station} alt = "pic" className='LoginPage-image-img'></img>
          </div>
    </div>
  );
}

export default LoginPage;
