import React from "react";
import PickMeals from "../assets2/easy-to-use.png";
import Accesibility from "../assets2/accesibility.png";
import DeliveryMeals from "../assets2/fast-accurate.png";
import '../Styles/All.css'
const Work = () => {
  const workInfoData = [
    {
      image: PickMeals,
      title: "Easy to Use",
      text: "Lorem ipsum dolor sit amet consectetur. Maecenas orci et .",
    },
    {
      image: Accesibility,
      title: "Accesibility",
      text: "Lorem ipsum dolor sit amet consectetur. Maecenas orci et ",
    },
    {
      image: DeliveryMeals,
      title: "Fast and Accurate",
      text: "Lorem ipsum dolor sit amet consectetur. Maecenas orci et lorem ipsum",
    },
  ];
  return (
    <div className="work-section-wrapper">
      <div className="work-section-top">
        <p className="primary-subheading">Work</p>
        <h1 className="primary-heading">How It Works</h1>
        <p className="primary-text">
          Lorem ipsum dolor sit amet consectetur. Non tincidunt magna non et
          elit. Dolor turpis molestie dui magnis facilisis at fringilla quam.
        </p>
      </div>
      <div className="work-section-bottom">
        {workInfoData.map((data) => (
          <div className="work-section-info" key={data.title}>
            <div className="info-boxes-img-container">
              <img src={data.image} alt="" />
            </div>
            <h2>{data.title}</h2>
            <p>{data.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Work;