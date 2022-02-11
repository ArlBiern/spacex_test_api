import { render } from "@testing-library/react";
import { HashRouter } from "react-router-dom";
import App from "./App";
import { store } from "./app/store";
import { Provider } from "react-redux";

const MockApp = () => {
  return (
    <HashRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </HashRouter>
  );
};

describe("App Component", () => {
  it("renders properly app elements on the screen", async () => {
    const { findAllByTestId, getByText } = render(<MockApp />);
    const launch_item = await findAllByTestId("launch_item");

    expect(launch_item.length).toBe(20);
    expect(getByText(/nazwa lotu/i)).toBeInTheDocument();
    expect(getByText(/załaduj więcej/i)).toBeInTheDocument();
  });
});
