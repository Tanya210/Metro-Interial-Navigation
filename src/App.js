
import './App.css';
import { Route, Routes, useNavigate } from 'react-router-dom';
import MainHeader from './Components/MainHeader';
import HomePage from './Components/HomePage';
import LoginPage from './Components/LoginPage';
import SignUpPage from './Components/SignUpPage';
import Navbar from './ComponentParts/Navbar';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Dashboard from './Components/Dashboard';
import { useState , useEffect } from 'react';
import NotFound from './ComponentParts/NotFound';
function App() {
  const[logedIn, setLogedIn] = useState(false);
  const navigate = useNavigate();
  async function checkLogin(){
    const token = localStorage.getItem('token');
    console.log(token);
    try{
      console.log("no")
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}/authenticate`,{
        method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization' : `Bearer ${token}`,
          },
          body: JSON.stringify(token),
      })
      console.log("yes");
      const data = await response.json();
      if(response.status === 200){
        setLogedIn(true);
        navigate(`/dashboard`);
      }
    }
    catch(e){
        console.log("error occured");
    }
    
  }
  // useEffect(()=>{
  //   checkLogin();
  // },[])
  return (
    <div className='App-storage'>
      <div className='container'> 
      <Navbar logedIn = {logedIn} setLogedIn = {setLogedIn}></Navbar>
      <Routes>
    <Route path='/'element = {<MainHeader></MainHeader>}>
    <Route index element = {<HomePage></HomePage>}/>
    <Route path = "/login" element = {<LoginPage logedIn = {logedIn} setLogedIn = {setLogedIn}></LoginPage>}/>
    <Route path = "/signup" element = {<SignUpPage logedIn = {logedIn} setLogedIn = {setLogedIn}></SignUpPage>}/>
    <Route path = "/dashboard" element = {logedIn?<Dashboard logedIn = {logedIn} setLogedIn = {setLogedIn}></Dashboard>:<NotFound></NotFound>}/>
    </Route>
   </Routes>
      </div>
    <ToastContainer autoClose={2000} theme="light" />
    </div>
  );
}

export default App;
