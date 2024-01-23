import React from "react";
import BannerBackground from "../assets2/home-banner-background.png";
import BannerImage from "../assets2/home-banner-image.png";
import '../Styles/All.css'
const Home = () => {
    return (
        <div className="home-container" id="Home">
            {/* <Navbar /> */}
            <div className="home-banner-container">
                <div className="home-bannerImage-container">
                    <img src={BannerBackground} alt="" className="home-banner-background" />
                </div>
                <div className="home-text-section">
                    <h1 className="primary-heading">
                        Metro Interior Navigation Made Smooth
                    </h1>
                    <p className="primary-text">
                        Embark on a Journey of Seamless Exploration with Our <strong>M.I.N.S</strong>. 
                        Elevate your metro experience with cutting-edge technology designed to guide you effortlessly
                         through intricate interiors. Say goodbye to navigation challenges and hello to a new era of stress-free commuting.
                    </p>
                    {/* <button className="secondary-button">
            Order Now <FiArrowRight />{" "}
          </button> */}
                </div>
                <div className="home-image-section">
                    <img src={BannerImage} alt="" />
                </div>
            </div>
        </div>
    );
};

export default Home;