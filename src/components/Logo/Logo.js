import React from "react";
import Tilt from "react-tilt";
import "./logo.css";
import logo from "./brainLogo.png";

const Logo = () => {
  return (
    <div className="ma4 mt0">
      <Tilt
        className="Tilt br2 shadow-2"
        options={{ max: 35 }}
        style={{ height: 150, width: 150 }}
      >
        <div className="Tilt-inner pa3 conter">
          <img
            style={{ paddingTop: "20px", heigh: "80px", width: "80px" }}
            src={logo}
            alt="brain"
          />
        </div>
      </Tilt>
    </div>
  );
};

export default Logo;
