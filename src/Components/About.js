import React from "react";
import AboutBackground from "../assets2/about-background.png";
import AboutBackgroundImage from "../assets2/about-background-image.png";
// import { BsJustify } from "react-icons/bs";
import '../Styles/All.css'
const About = () => {
  return (
    <div className="about-section-container" id="About">
      <div className="about-background-image-container">
        <img src={AboutBackground} alt="" />
      </div>
      <div className="about-section-image-container">
        <img src={AboutBackgroundImage} alt="" />
      </div>
      <div className="about-section-text-container">
        <p className="primary-heading">About</p>
        <h1 className="primary-subheading ">
          Welcome to the Future of Metro Navigation!!
        </h1>
        <p className="primary-text">
        We are passionate about revolutionizing the way you navigate the intricate 
        interiors of metro systems. With a vision to enhance your commuting experience, 
        we have developed a state-of-the-art Metro Interior Navigation System that seamlessly 
        blends technology and convenience.
        </p>
        <h1 className="primary-subheading">Our Mission</h1>
        <p className="primary-text">
        Our mission is to eliminate the uncertainties associated with metro travel, 
        providing you with a reliable and user-friendly solution. Whether you're a daily commuter 
        or an occasional traveler, our system is designed to make your journey stress-free and enjoyable.
        </p>
        <div className="about-buttons-container">
          <button className="secondary-button">Learn More</button>
          {/* <button className="watch-video-button"> */}
        </div>
      </div>
    </div>
  );
};

export default About;
