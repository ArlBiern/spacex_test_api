import { render } from "@testing-library/react";
import { HashRouter } from "react-router-dom/";

import Loader from "./Loader";

const MockLoader = () => {
  return (
    <HashRouter>
      <Loader />
    </HashRouter>
  );
};

describe("Loader Component ", () => {
  it("renders properly component", () => {
    const { getByText } = render(<MockLoader />);

    const infoElement = getByText(/ładujemy dane/i);
    expect(infoElement).toBeInTheDocument();
  });
});
