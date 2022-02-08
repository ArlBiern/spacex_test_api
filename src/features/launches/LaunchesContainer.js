import React from "react";

import Pagination from "../pagination/Pagination";
import Form from "../form/Form";
import LaunchesList from "./LaunchesList";

import "rsuite/dist/rsuite.min.css";
import "./Launches.css";

const LaunchesContainer = () => {
  return (
    <div className="launches_cnt">
      <Form />
      <LaunchesList />
      <Pagination />
    </div>
  );
};

export default LaunchesContainer;
