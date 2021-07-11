import React from "react";

export const Rank = ({ name, entries }) => {
  return (
    <div>
      <div className="Ranktag f2 white">{`${name} , your current entry count is...`}</div>
      <div className="f1 white">{entries}</div>
    </div>
  );
};
