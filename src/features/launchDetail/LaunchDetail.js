import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getLaunch } from "../launches/launchesSlice";
import Carousel from "./Carousel";
import GoBackArrow from "./GoBackArrow";
import PageNotFound from "../notFound/PageNotFound";
import "./LaunchDetail.css";

const LaunchDetail = (props) => {
  const dispatch = useDispatch();

  const fetchStatus = useSelector((state) => state.launches.status);
  let [launch] = useSelector((state) =>
    state.launches.value.filter((launch) => launch.id === props.match.params.id)
  );

  useEffect(() => {
    if (!launch) {
      dispatch(getLaunch(props.match.params.id));
    }
  }, []);

  const renderContent = () => {
    if (fetchStatus === "failed") {
      return (
        <PageNotFound
          message={"Błąd zapytania, wróć proszę na stronę główną"}
        />
      );
    } else {
      return (
        <div className="detail_cnt">
          <div className="detail_header">
            <Link className="detail_homeLink" to="/">
              <GoBackArrow />
            </Link>
            <h3 className="detail_name">
              Szczegóły lotu # {launch ? launch.flight_number : "..."}
            </h3>
          </div>
          <div className="detail_mainData">
            <div className="detail_mainDataItem">
              <p>
                Lot:{" "}
                <span className="detail_textSpan">
                  {launch ? launch.name : "..."}
                </span>
              </p>
              <p>
                Data lotu:{" "}
                <span className="detail_textSpan">
                  {launch ? launch.date_utc.slice(0, 10) : "..."}
                </span>
              </p>
              <p>
                Status:{" "}
                <span className="detail_textSpan">
                  {launch
                    ? launch.success
                      ? "Udany"
                      : launch.success === null
                      ? "Przed startem"
                      : "Nieudany"
                    : "..."}
                </span>
              </p>
            </div>
            <div className="detail_mainDataItem">
              <p>
                Załoga:{" "}
                <span className="detail_textSpan">
                  {launch ? launch.crew.length : "..."}
                </span>
              </p>
              <p>
                Rakieta:{" "}
                <span className="detail_textSpan">
                  {launch ? launch.rocket.name : "..."}
                </span>
              </p>
              <p>
                Start:{" "}
                <span className="detail_textSpan">
                  {launch
                    ? `${launch.launchpad.name} ${launch.launchpad.locality}`
                    : "..."}
                </span>
              </p>
            </div>
          </div>
          <Carousel launch={launch} />
          <div className="detail_descriptionCnt">
            <p className="detail_description">
              {launch && launch.details
                ? launch.details
                : "Brak dodatkowych szczegółów dla wybranego lotu..."}
            </p>
          </div>
        </div>
      );
    }
  };

  return renderContent();
};

export default LaunchDetail;
