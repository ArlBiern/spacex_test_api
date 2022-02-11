import React, { useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setPageNumber } from "./paginationSlice";
import { getLaunches } from "../launches/launchesSlice";

import "./Pagination.css";

const Pagination = () => {
  const dispatch = useDispatch();
  const totalPages = useSelector((state) => state.launches.totalPages);
  const pageFromStore = useSelector((state) => state.paginationPage);

  const paginationText = useRef();
  const pagination = useRef();

  const renderPagination = () => {
    let array = Array.from(Array(totalPages).keys());

    return array.map((el) => {
      return (
        <p
          className={
            "pagination_page" +
            (el + 1 === pageFromStore ? " pagination_pageActive" : "")
          }
          key={el + 1}
          data-page={el + 1}
          onClick={showPaginationPage}
          data-testid="pagination_page"
        >
          {el + 1}
        </p>
      );
    });
  };

  const showPaginationPage = (e) => {
    dispatch(setPageNumber(+e.target.dataset.page));
    dispatch(getLaunches());
  };

  const paginationVisibility = () => {
    paginationText.current.classList.toggle("pagination_visible");
    pagination.current.classList.toggle("pagination_visible");

    paginationText.current.classList.contains("pagination_visible")
      ? (paginationText.current.innerText = "ukryj >")
      : (paginationText.current.innerText = "załaduj więcej >");
  };

  return (
    <div className="pagination_cnt">
      <p
        className="pagination_text"
        onClick={paginationVisibility}
        ref={paginationText}
        data-testid="pagination_text"
      >
        załaduj więcej &gt;
      </p>
      <div className="pagination_itemsCnt" ref={pagination}>
        {renderPagination()}
      </div>
    </div>
  );
};

export default Pagination;
