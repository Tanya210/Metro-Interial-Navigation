import React, { useState } from 'react';
import '../Styles/SignUpPage.css';
import Frame from '../assets/frame.png';
import Map from '../assets/map1.jpg'
import { AiOutlineEye } from 'react-icons/ai';
import {AiOutlineEyeInvisible} from 'react-icons/ai';
import googleLogo from '../assets/google.png';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
function SignUpPage(props) {
  const navigate = useNavigate();
  const[passwordVisible , setPasswordVisible] = useState(false);
  const[confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const[passengerClass, setpassengerClass] = useState("");
  const[adminClass, setadminClass] = useState("SignUpPage-switch-div-item-unselected");
  const[formData, setFormData] = useState({
    role :"Passenger",
    firstname:"",
    lastname:"",
    email:"",
    password:"",
    confirmPassword:""
  })
  function switchHandler(event){
      if(event.target.innerText==="Passenger"){
        setpassengerClass("");
        setadminClass("SignUpPage-switch-div-item-unselected")
        setFormData((prevData)=>{
          return{
            ...prevData,
            role:event.target.innerText
          }
        })
      }
      else{
        setpassengerClass("SignUpPage-switch-div-item-unselected");
        setadminClass("");
        setFormData((prevData)=>{
          return{
            ...prevData,
            role:event.target.innerText
          }
        })
      }
     
  }
  function changeHandler(event){
    setFormData((prevData)=>{
      return {
        ...prevData,
        [event.target.name] : event.target.value
      }
    })
  }
  async function submitHandler(event){
    event.preventDefault();
    // if(formData.password===formData.confirmPassword){
    //   // console.log(formData);
    //   setFormData({
    //     firstname:"",
    //     lastname:"",
    //     email:"",
    //     password:"",
    //     confirmPassword:""
    //   })
    //   navigate("/dashboard");
    //   props.setLogedIn(true);
    // }
    // else{
    //   toast("Password not match",{
    //     position:"top-center",
    //     type:"warning",
    //     height:"20vh",
    //   });
    // }
      try{
        const response = await fetch(`${process.env.REACT_APP_BASE_URL}/signup`,{
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        })
        const data = await response.json();
        if(response.status===200){
          setFormData({
                firstname:"",
                lastname:"",
                email:"",
                password:"",
                confirmPassword:""
              })
              toast.success("Thank You For Signing-Up",{
                position:"top-center",
                type:"success",
                height:"20vh",
              });
          navigate("/login");
        }
        else if(response.status===400){
          toast.error("Users Already Exists",{
            position:"top-center",
            type:"warning",
            height:"20vh",
          });
        }
        else if(response.status === 401 && data.message === "Passwords do not match"){
          toast.error("Password not match",{
                position:"top-center",
                type:"warning",
                height:"20vh",
              });
        }
      }
      catch(e){
        console.log("error occured while fetching ");
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
  function confirmPasswordVisibilityHandler(){
    if(confirmPasswordVisible===false){
      setConfirmPasswordVisible(true);
    }
    else{
      setConfirmPasswordVisible(false);
    }
  }
  return (
    <div className='SignUpPage-storage'>
        <div className='SignUpPage-content-box'>
        <div className='SignUpPage-content-heading'>Join our Metro Interior Navigation website to Experience the metro like never before.</div>
        <p className='SignUpPage-content-desc'>Seamless navigation transforms your metro commutes into a cherishful experience.</p>
        <p className='SignUpPage-content-desc SignUpPage-content-desc-italic'> Navigate the Metro-Maze with Ease.</p>
        <div className='SignUpPage-switch-div'>
          <div className={`SignUpPage-switch-div-item ${passengerClass}`} onClick={switchHandler} >Passenger</div>
          <div className={`SignUpPage-switch-div-item ${adminClass}`} onClick={switchHandler} >Admin</div>
        </div>
        <form className='SignUpPage-form' onSubmit={submitHandler}>
            <div className='SignUpPage-form-name-div'>
            <div className='SignUpPage-form-name-div-item'>
            <p className='SignUpPage-form-label' >First Name <sup className='SignUpPage-form-label-req'>*</sup> </p>
            <input className='SignUpPage-form-input' placeholder='Enter First Name' type='text' name='firstname' value={formData.firstname} onChange={changeHandler} required/>
            </div>
            <div className='SignUpPage-form-name-div-item'>
            <p className='SignUpPage-form-label'>Last Name <sup className='SignUpPage-form-label-req'>*</sup></p>
            <input className='SignUpPage-form-input' placeholder='Enter Last Name' type='text' name='lastname' value={formData.lastname} onChange={changeHandler} required/>
            </div>            
            </div>
            <br></br>
            <p className='SignUpPage-form-label'>Email Address <sup className='SignUpPage-form-label-req'>*</sup></p>
            <input className='SignUpPage-form-input' placeholder='Enter Email Address' type='email' name='email' value={formData.email} onChange={changeHandler} required/>
            <br></br>
            <br></br>
            <div className='SignUpPage-form-name-div'>
            <div className='SignUpPage-form-name-div-item'>
            <p className='SignUpPage-form-label' >Password <sup className='SignUpPage-form-label-req'>*</sup> </p>
            <input className='SignUpPage-form-input SignUpPage-form-input-password' placeholder='Enter Password' type={!passwordVisible?"password":"text"} name='password' value={formData.password} onChange={changeHandler} required/>
            {!passwordVisible?<AiOutlineEye className='eyeicon' onClick={passwordVisibilityHandler}></AiOutlineEye>:<AiOutlineEyeInvisible className='eyeicon' onClick={passwordVisibilityHandler}></AiOutlineEyeInvisible>}
            </div>
            <div className='SignUpPage-form-name-div-item'>
            <p className='SignUpPage-form-label'>Confirm Password <sup className='SignUpPage-form-label-req'>*</sup></p>
            <input className='SignUpPage-form-input SignUpPage-form-input-password' placeholder='Confirm Password' type={!confirmPasswordVisible?"password":"text"}  name='confirmPassword' value={formData.confirmPassword} onChange={changeHandler} required/>
            {!confirmPasswordVisible?<AiOutlineEye className='eyeicon' onClick={confirmPasswordVisibilityHandler}></AiOutlineEye>:<AiOutlineEyeInvisible className='eyeicon' onClick={confirmPasswordVisibilityHandler}></AiOutlineEyeInvisible>}
            </div>            
            </div>
            <button className='SignUpPage-form-submit-btn'>Create Account</button>
        </form>
        <div style={{display:"flex", alignItems:"center" , justifyContent:"space-between", marginTop:"3vh"}}>
              <div style={{width:"44%" , height:"0.2vh" ,backgroundColor:"red"}}></div>
              <p style={{fontSize:"1.2rem"}}>OR</p>
              <div style={{width:"44%",height:"0.2vh" ,backgroundColor:"red"}}></div>
            </div>
            <button className='SignUpPage-content-login-google'><img src={googleLogo} alt = "logo" className='googleimg'></img>Sign in with Google</button>
        </div>
        <div className='SignUpPage-image-box'>
            <img src={Frame} alt = "frame" className='SignUpPage-image-frame'></img>
            <img src = {Map} alt = "pic" className='SignUpPage-image-img'></img>
          </div>
    </div>
  );
  }

export default SignUpPage;
