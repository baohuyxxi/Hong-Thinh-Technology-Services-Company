import "./Services.scss";
import React from "react";
import FramePage from "~/components/FramePage/FramePage";
import services from "~/mock/services.js";

const Services = () => {
  return (
    <FramePage>
      <div className="services">
        {services.map((item, index) => (
          <div className="service-card" key={index}>
            <img src={item.image} alt={item.title} />
            <h3>{item.title}</h3>
            <a href={item.link} className="service-link">
              Xem chi tiết
            </a>
          </div>
        ))}
      </div>
    </FramePage>
  );
};

export default Services;
