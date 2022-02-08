import React from "react";
import "./LaunchMin.css";

const LaunchMin = (props) => {
  const { launch } = props;
  const date = new Date(launch.date_unix * 1000);
  const formatedDate = `${date.getFullYear()}-${(
    "0" +
    (date.getMonth() + 1)
  ).slice(-2)}-${("0" + date.getDate()).slice(-2)}`;

  return (
    <div className="launch_item">
      <div className="launch_minImg">
        {launch.links.flickr.original.length > 0 ? (
          <img
            src={launch.links.flickr.original[0]}
            alt={"Picture of flight " + launch.name + " rocket"}
            className="min_picture"
          />
        ) : (
          "zdjęcia"
        )}
      </div>
      <div className="launch_minInfo">
        <p className="min_flightName"> # {launch.flight_number}</p>
        <p className="min_flightTitle"> {launch.name}</p>
        <p className="min_flightDate">{formatedDate}</p>
        <button className="linkButton">więcej &gt;</button>
      </div>
    </div>
  );
};

export default LaunchMin;
