import paginationReducer, { setPageNumber } from "./paginationSlice";

describe("Pagination reducer", () => {
  const initialState = 1;

  it("Should handle initial state", () => {
    expect(paginationReducer(undefined, {})).toEqual(initialState);
  });

  it("Should handle state change", () => {
    const actual = paginationReducer(initialState, setPageNumber(2));
    expect(actual).toEqual(2);
  });
});
