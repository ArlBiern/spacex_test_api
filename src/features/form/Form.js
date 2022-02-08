import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DateRangePicker } from "rsuite";
import { setQuery } from "./formSlice";
import { getLaunches } from "../launches/launchesSlice";

import "./Form.css";

const Form = () => {
  const dispatch = useDispatch();
  const checkboxInput = useRef();
  const datePicker = useRef();

  const dataRangeState = useSelector((state) => state.formQuery.dateRange);
  const successQueryState = useSelector(
    (state) => state.formQuery.successQuery
  );
  const queryStringState = useSelector((state) => state.formQuery.queryString);

  const [queryString, setQueryString] = useState(queryStringState);
  const [dateRange, setDateRange] = useState(dataRangeState);
  const [successQuery, setSuccessQuerry] = useState(successQueryState);

  useEffect(() => {
    datePicker.current.target.addEventListener("click", (e) => {
      if (e.target.classList.contains("rs-icon")) {
        setDateRange({
          dateGTE: "2000-01-01T00:00:00.000Z",
          dateLTE: `${new Date().getFullYear() + 2}-01-01T00:00:00.000Z`,
        });
      }
    });
  });

  const formSubmitHandle = (e) => {
    e.preventDefault();
    dispatch(setQuery({ dateRange, successQuery, queryString }));
    dispatch(getLaunches());
  };

  const setDates = (e) => {
    if (e) {
      let [start, end] = e;
      const startString = `${start.getFullYear()}-${(
        "0" +
        (start.getMonth() + 1)
      ).slice(-2)}-${("0" + start.getDate()).slice(-2)}T00:00:00.000Z`;
      const endString = `${end.getFullYear()}-${(
        "0" +
        (end.getMonth() + 1)
      ).slice(-2)}-${("0" + end.getDate()).slice(-2)}T00:00:00.000Z`;

      setDateRange({
        dateGTE: startString,
        dateLTE: endString,
      });
    }
  };

  const checkboxChangeHandle = (e) => {
    setSuccessQuerry(!successQuery);
  };

  return (
    <div>
      <form className="launches_form" onSubmit={formSubmitHandle}>
        <div className="form_element">
          <label className="form_label">Nazwa lotu</label>
          <input
            className="form_input"
            type="text"
            aria-label="Input search term"
            placeholder="Wpisz nazwę"
            value={queryString}
            onChange={(e) => {
              setQueryString(e.target.value);
            }}
          />
        </div>
        <div className="form_element">
          <label className="form_label">Data lotu</label>
          <DateRangePicker onChange={setDates} ref={datePicker} />
        </div>
        <div className="form_element">
          <input
            type="checkbox"
            id="cb1"
            ref={checkboxInput}
            checked={successQuery}
            onChange={checkboxChangeHandle}
          />
          <label htmlFor="cb1" data-checked={false}></label>
          <p className="checkbox_text" onClick={checkboxChangeHandle}>
            Pokaż tylko udane loty
          </p>
        </div>
        <div className="form_element">
          <input className="form_submit" type="submit" value="szukaj" />
        </div>
      </form>
    </div>
  );
};

export default Form;
