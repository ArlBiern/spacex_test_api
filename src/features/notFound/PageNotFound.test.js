import { render } from "@testing-library/react";
import { HashRouter } from "react-router-dom/";

import PageNotFound from "./PageNotFound";

const MockPageNotFound = ({ message }) => {
  return (
    <HashRouter>
      <PageNotFound message={message} />
    </HashRouter>
  );
};

describe("PageNotFound Component ", () => {
  it("renders proper content without message prop", () => {
    const { getByText } = render(<MockPageNotFound />);

    const headingElement = getByText(/Coś poszło nie tak/i);
    expect(headingElement).toBeInTheDocument();
  });

  it("renders proper content with message prop", () => {
    const { getByText } = render(<MockPageNotFound message="test message" />);

    const headingElement = getByText(/test message/i);
    expect(headingElement).toBeInTheDocument();
  });
});
