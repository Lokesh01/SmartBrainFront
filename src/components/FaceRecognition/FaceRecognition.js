import React from "react";
import "./facerecog.css";

export const FaceRecognition = ({ imageurl, box }) => {
  return (
    <div className="center ma">
      <div className="absolute mt2">
        <img
          id="inputImage"
          src={imageurl}
          alt="splash"
          width="500px"
          height="auto"
        />
        <div
        className="boundingBox"
        style={{
          top: box.topRow,
          right: box.rightCol,
          bottom: box.bottomRow,
          left: box.leftCol,
          
        }}
      ></div>
      </div>
    </div>
  );
};
