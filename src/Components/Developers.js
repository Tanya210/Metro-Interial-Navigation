import React from 'react'
import profileImage from "../assets2/profile-image.png";
import '../Styles/All.css'
const Developers = () => {
    const developersData = [
        {
            image:profileImage,
            name: "Navdeep Singh",
            enrollment: "12345678901",
            email: "xyz@gmail.com"
        },
        {
            image:profileImage,
            name: "Harshit Singh",
            enrollment:"07315002720",
            email: "harshit.singh2904@gmail.com"
        },
        {
            image:profileImage,
            name: "Kapil",
            enrollment: "12345678901",
            email: "xyz@gmail.com"
        }
    ]
    return (
        <div className="work-section-wrapper">
          <div className="work-section-top">
            <h1 className="primary-heading">Developers</h1>
          </div>
          <div className="work-section-bottom">
            {developersData.map((data) => (
              <div className="work-section-info" key={data.title}>
                <div className="info-boxes-img-container">
                  <img src={data.image} alt="" />
                </div>
                <h2>{data.name}</h2>
                <p>{data.enrollment}</p>
                <p>{data.email}</p>
              </div>
            ))}
          </div>
        </div>
      );
}

export default Developers