import { render, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import * as reactRedux from "react-redux";
import { store } from "../../app/store";
import { HashRouter } from "react-router-dom/";
import Pagination from "./Pagination";

const MockPagination = () => {
  return (
    <HashRouter>
      <Provider store={store}>
        <Pagination />
      </Provider>
    </HashRouter>
  );
};

describe("Pagination Component ", () => {
  let pagesCountSelectorMock;

  beforeEach(() => {
    pagesCountSelectorMock = jest.spyOn(reactRedux, "useSelector");
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("renders proper content after initialization", () => {
    const { getByText, queryByText } = render(<MockPagination />);

    const infoElement = getByText(/załaduj więcej/i);
    const infoAfterClickElement = queryByText(/ukryj/i);
    expect(infoElement).toBeInTheDocument();
    expect(infoAfterClickElement).not.toBeInTheDocument();
  });

  it("renders proper content after clicking on ...załąduj więcej... text", async () => {
    const { getByTestId } = render(<MockPagination />);

    fireEvent.click(getByTestId("pagination_text"));

    expect(getByTestId("pagination_text").innerText).toBe("ukryj >");
  });

  it("renders proper pages count", async () => {
    pagesCountSelectorMock.mockReturnValue(4);

    const { getByTestId, getAllByTestId } = render(<MockPagination />);

    fireEvent.click(getByTestId("pagination_text"));
    expect(getAllByTestId("pagination_page").length).toBe(4);
  });
});
