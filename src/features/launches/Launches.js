import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DateRangePicker } from "rsuite";
import { getLaunches } from "./launchesSlice";
import LaunchMin from "../launchMin/LaunchMin";

import "rsuite/dist/rsuite.min.css";
import "./Launches.css";

const Launches = () => {
  const dispatch = useDispatch();
  const launches = useSelector((state) => state.launches.value);
  const requestStatus = useSelector((state) => state.launches.status);

  useEffect(() => {
    dispatch(getLaunches({ limit: 20 }));
  }, [dispatch]);

  const renderLaunchList = () => {
    if (requestStatus === "loading") {
      return <div className="launches_listCnt">Data is loading</div>;
    } else if (requestStatus === "success") {
      return (
        <div className="launches_listCnt">
          {launches.map((launch) => {
            return <LaunchMin key={launch.id} launch={launch} />;
          })}
        </div>
      );
    } else if (requestStatus === "failed") {
      return <div className="launches_listCnt">Something goes wrong</div>;
    }
  };

  return (
    <div className="launches_cnt">
      <form className="launches_form">
        <div className="form_element">
          <label className="form_label">Nazwa lotu</label>
          <input
            className="form_input"
            type="text"
            aria-label="Input search term"
            placeholder="Wpisz nazwę"
          />
        </div>
        <div className="form_element">
          <label className="form_label">Data lotu</label>
          <DateRangePicker />
        </div>
        <div className="form_element">
          <input type="checkbox" id="cb1" />
          <label htmlFor="cb1"></label>
          <p className="checkbox_text">Pokaż tylko udane loty</p>
        </div>
        <div className="form_element">
          <input className="form_submit" type="submit" value="szukaj" />
        </div>
      </form>

      {renderLaunchList()}
    </div>
  );
};

export default Launches;
