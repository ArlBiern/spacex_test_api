import { render } from "@testing-library/react";
import * as reactRedux from "react-redux";
import { Provider } from "react-redux";
import { store } from "../../app/store";
import LaunchesContainer from "./LaunchesContainer";
import { HashRouter } from "react-router-dom";

const MockLaunchesContainer = () => {
  return (
    <HashRouter>
      <Provider store={store}>
        <LaunchesContainer />
      </Provider>
    </HashRouter>
  );
};

describe("Launches Component", () => {
  let stateStatusSelectorMock;

  beforeEach(() => {
    stateStatusSelectorMock = jest.spyOn(reactRedux, "useSelector");
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("renders pageNorFound component if status of fatching data is failed", () => {
    stateStatusSelectorMock.mockReturnValue("failed");

    const { getByTestId } = render(<MockLaunchesContainer />);
    const pageNotFound = getByTestId("pageNotFound");

    expect(pageNotFound).toBeTruthy();
  });

  it("renders properly if fetching data status is not failed", () => {
    const { getByText } = render(<MockLaunchesContainer />);
    const pagination = getByText(/załaduj więcej/i);
    const form = getByText(/szukaj/i);

    expect(pagination).toBeInTheDocument();
    expect(form).toBeInTheDocument();
  });
});
