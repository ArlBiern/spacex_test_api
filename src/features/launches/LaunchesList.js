import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import LaunchMin from "../launchMin/LaunchMin";
import { getLaunches } from "./launchesSlice";
import Loader from "../loader/Loader";

const LaunchesList = () => {
  const dispatch = useDispatch();

  const launches = useSelector((state) => state.launches.value);
  const requestStatus = useSelector((state) => state.launches.status);

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
      return launches.map((launch) => {
        return <LaunchMin key={launch.id} launch={launch} />;
      });
    } else if (requestStatus === "failed") {
      return <div className="launches_listCnt">Something goes wrong</div>;
    }
  };
  return <div className="launches_listCnt">{renderLaunchList()}</div>;
};

export default LaunchesList;
