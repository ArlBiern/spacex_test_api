import React from "react";

import "./Loader.css";
const Loader = () => {
  return (
    <div className="loader_cnt" data-testid="loader_cnt">
      <h4 className="info_heading">Daj nam chwilę, ładujemy dane...</h4>
      <div className="lds-roller">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default Loader;
