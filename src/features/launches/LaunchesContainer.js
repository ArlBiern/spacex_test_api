import React from "react";
import { useSelector } from "react-redux";

import Pagination from "../pagination/Pagination";
import Form from "../form/Form";
import LaunchesList from "./LaunchesList";
import PageNotFound from "../notFound/PageNotFound";

import "rsuite/dist/rsuite.min.css";
import "./Launches.css";

const LaunchesContainer = () => {
  const fetchStatus = useSelector((state) => state.launches.status);

  const renderContent = () => {
    if (fetchStatus === "failed") {
      return (
        <PageNotFound
          message={
            "Prawdopodobnie masz problem z internetem lub jest inny problem z pobraniem danych. Sprawdź połączenie, odśwież stronę lub spróbuj ponownie wejść na stronę główną."
          }
        />
      );
    } else {
      return (
        <div className="launches_cnt">
          <Form />
          <LaunchesList />
          <Pagination />
        </div>
      );
    }
  };

  return renderContent();
};

export default LaunchesContainer;
