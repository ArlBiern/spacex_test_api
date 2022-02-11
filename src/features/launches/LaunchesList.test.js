import { render } from "@testing-library/react";
import * as reactRedux from "react-redux";
import { Provider } from "react-redux";
import { store } from "../../app/store";
import LaunchesList from "./LaunchesList";
import { HashRouter } from "react-router-dom";

const MockLaunchesList = () => {
  return (
    <HashRouter>
      <Provider store={store}>
        <LaunchesList />
      </Provider>
    </HashRouter>
  );
};

describe("Launches List Component", () => {
  let stateStatusSelectorMock;

  beforeEach(() => {
    stateStatusSelectorMock = jest.spyOn(reactRedux, "useSelector");
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("renders list of launches if data is fetched from API", async () => {
    const { findAllByTestId } = render(<MockLaunchesList />);
    const launch_item = await findAllByTestId("launch_item");
    expect(launch_item.length).toBe(20);
  });

  it("renders loader when app is fetching data", () => {
    stateStatusSelectorMock.mockReturnValue("loading");

    const { getByTestId } = render(<MockLaunchesList />);
    const loaderCnt = getByTestId("loader_cnt");

    expect(loaderCnt).toBeTruthy();
  });

  it("renders PageNotFound when fatching data is failed", () => {
    stateStatusSelectorMock.mockReturnValue("failed");

    const { getByTestId } = render(<MockLaunchesList />);
    const pageNotFound = getByTestId("pageNotFound");

    expect(pageNotFound).toBeTruthy();
  });
});
