import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import LaunchMin from "../launchMin/LaunchMin";
import {
  getLaunches,
  launchesSelector,
  requestSelector,
} from "./launchesSlice";

import Loader from "../loader/Loader";
import PageNotFound from "../notFound/PageNotFound";

const LaunchesList = () => {
  const dispatch = useDispatch();

  const launches = useSelector(launchesSelector);
  const requestStatus = useSelector(requestSelector);

  useEffect(() => {
    dispatch(getLaunches());
  }, [dispatch]);

  const renderLaunchList = () => {
    if (requestStatus === "loading") {
      return (
        <div className="launches_listCnt">
          <Loader />
        </div>
      );
    } else if (requestStatus === "success") {
      if (launches.length === 0) {
        return renderNoData();
      } else {
        return launches.map((launch) => {
          return <LaunchMin key={launch.id} launch={launch} />;
        });
      }
    } else if (requestStatus === "failed") {
      return (
        <PageNotFound
          message={
            "Prawdopodobnie masz problem z internetem lub jest inny problem z pobraniem danych. Sprawdź połączenie, odśwież stronę lub spróbuj ponownie wejść na stronę główną."
          }
        />
      );
    }
  };

  const renderNoData = () => {
    return (
      <div className="launches_listCnt">
        <h3 className="launches_noData">
          Brak danych dla wybranych opcji filtrowania.
        </h3>
      </div>
    );
  };

  return (
    <div className="launches_listCnt" data-testid="launches_listCnt">
      {renderLaunchList()}
    </div>
  );
};

export default LaunchesList;
