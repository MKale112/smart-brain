import React from "react";
import "./FaceRecognition.css";

const FaceRecognition = ({ imageURL, regionArray }) => {
  const boxes = regionArray.map((region) => (
    <div
      className="bounding-box"
      style={{
        top: region.topRow,
        right: region.rightCol,
        bottom: region.bottomRow,
        left: region.leftCol,
      }}
    ></div>
  ));

  return (
    <div className="center_row ma">
      <div className="absolute mt2">
        <img
          id="inputimage"
          src={imageURL}
          alt=""
          width="500px"
          height="auto"
        />
        {boxes}
      </div>
    </div>
  );
};

export default FaceRecognition;
