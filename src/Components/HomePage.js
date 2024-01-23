import React from 'react';
import '../Styles/HomePage.css';
import About from './About';
import Home from './Home';
import Developers from './Developers';
import Work from './Work';
import Contact from './Contact';
import Footer from './Footer';
// import Navbar from '../ComponentParts/Navbar';
function HomePage() {
  return (
    <div className='HomePage-storage'>
      <Home></Home>
      <About></About>
      <Work></Work>
      <Developers></Developers>
      <Contact></Contact>
      <Footer></Footer>
    </div>
  );
}

export default HomePage;
