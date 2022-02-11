import formReducer, { setQuery } from "./formSlice";

describe("Form reducer", () => {
  const initialState = {
    dateRange: {
      dateGTE: "2000-01-01T00:00:00.000Z",
      dateLTE: `${new Date().getFullYear() + 2}-01-01T00:00:00.000Z`,
    },
    successQuery: false,
    queryString: "",
  };

  it("Should handle initial state", () => {
    expect(formReducer(undefined, {})).toEqual(initialState);
  });

  it("Should handle all field data change", () => {
    const newState = {
      dateRange: {
        dateGTE: "2001-01-01T00:00:00.000Z",
        dateLTE: "2002-01-01T00:00:00.000Z",
      },
      successQuery: true,
      queryString: "abc",
    };
    const actual = formReducer(initialState, setQuery(newState));
    expect(actual).toEqual(newState);
  });
});
