import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getLaunches } from "./launchesSlice";

const Launches = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getLaunches());
  }, [dispatch]);

  return <div>Launches Component</div>;
};

export default Launches;
