import React from "react";
import "./ImageLink.css";

const ImageLink = ({ onInputChange, onLinkSubmit }) => {
  return (
    <div>
      <p className="f3">
        {"Wants to detect some faces,Just try giving it a link"}
      </p>
      <div className="center">
        <div className="form center pa4 br3 shadow-5">
          <input
            className="f4 pa2 w-70 center"
            type="text"
            onChange={onInputChange}
          />
          <button
            className="w-30 grow f4 link ph3 pv2 dib white bg-light-purple"
            onClick={onLinkSubmit}
          >
            Detect
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImageLink;
