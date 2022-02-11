import React from "react";
import { Link } from "react-router-dom";
import "./PageNotFound.css";

const PageNotFound = ({ message }) => {
  return (
    <div className="pageNotFound" data-testid="pageNotFound">
      <h3>{message || "Coś poszło nie tak, wróć proszę na główną stronę."}</h3>
      <Link className="pageNotFound_button" to="/">
        Wróć na głowną stronę
      </Link>
    </div>
  );
};

export default PageNotFound;
