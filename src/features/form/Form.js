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
  const labelChecbox = useRef();

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

    labelChecbox.current.dataset.checked = !successQuery;
  };

  const checkQueryString = (query) => {
    const testResult = /^[a-z0-9A-Z -]+$/.test(query[0]);
    if (testResult || query.length === 0) {
      setQueryString(query);
    }
  };

  return (
    <div>
      <form
        className="launches_form"
        onSubmit={formSubmitHandle}
        data-testid="form"
      >
        <div className="form_element">
          <label className="form_label">Nazwa lotu</label>
          <input
            className="form_input"
            type="text"
            aria-label="Input search term"
            placeholder="Wpisz nazwę"
            value={queryString}
            onChange={(e) => {
              checkQueryString(e.target.value);
            }}
            data-testid="queryInput"
          />
        </div>
        <div className="form_element">
          <label className="form_label">Data lotu</label>
          <DateRangePicker
            onChange={setDates}
            ref={datePicker}
            data-testid="dateInput"
          />
        </div>
        <div className="form_element">
          <input
            type="checkbox"
            id="cb1"
            ref={checkboxInput}
            checked={successQuery}
            onChange={checkboxChangeHandle}
            data-testid="successInput"
          />
          <label
            htmlFor="cb1"
            data-checked={false}
            data-testid="cb1"
            ref={labelChecbox}
          ></label>
          <p
            className="checkbox_text"
            onClick={checkboxChangeHandle}
            data-testid="checkbox_text"
          >
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
