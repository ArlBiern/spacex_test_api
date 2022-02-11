import { render, fireEvent } from "@testing-library/react";
import Carousel from "./Carousel";
import { Provider } from "react-redux";
import { store } from "../../app/store";

const sampleData = {
  links: {
    flickr: {
      original: [
        "https://live.staticflickr.com/65535/51673353699_e3da266245_o.jpg",
        "https://live.staticflickr.com/65535/51673548360_64354b760f_o.jpg",
        "https://live.staticflickr.com/65535/51672676881_3b88410a96_o.jpg",
        "https://live.staticflickr.com/65535/51673548330_7acc53d2fb_o.jpg",
      ],
    },
  },
  rocket: {
    name: "Falcon 9",
    id: "5e9d0d95eda69973a809d1ec",
  },
  success: true,
  details:
    "SpaceX will launch the third operational mission of its Crew Dragon vehicle as part of NASA's Commercial Crew Program, carrying four astronauts to the International Space Station, including 1 international partner This mission will fly on a new capsule and a once used booster. The booster will land downrange on a drone ship. The Crew-2 mission returns from the space station in November.",
  crew: [
    "5fe3c587b3467846b3242198",
    "5fe3c5beb3467846b3242199",
    "5fe3c5f6b3467846b324219a",
    "60c4b5ad4e041c0b356db393",
  ],
  launchpad: {
    name: "KSC LC 39A",
    locality: "Cape Canaveral",
    id: "5e9e4502f509094188566f88",
  },
  flight_number: 136,
  name: "Crew-5",
  date_utc: "2021-11-11T02:03:00.000Z",
  date_unix: 1636596180,
  id: "5fe3b15eb3467846b324216d",
};

const dataWithoutImages = {
  links: {
    flickr: {
      original: [],
    },
  },
  rocket: {
    name: "Falcon 9",
    id: "5e9d0d95eda69973a809d1ec",
  },
  success: null,
  details: "",
  crew: [
    "5fe3c587b3467846b3242198",
    "5fe3c5beb3467846b3242199",
    "5fe3c5f6b3467846b324219a",
    "60c4b5ad4e041c0b356db393",
  ],
  launchpad: {
    name: "KSC LC 39A",
    locality: "Cape Canaveral",
    id: "5e9e4502f509094188566f88",
  },
  flight_number: 136,
  name: "Crew-5",
  date_utc: "2021-11-11T02:03:00.000Z",
  date_unix: 1636596180,
  id: "5fe3b15eb3467846b324216d",
};

const MockCarousel = ({ launch }) => {
  return (
    <Provider store={store}>
      <Carousel launch={launch} />
    </Provider>
  );
};

describe("Launch Detail component", () => {
  it("renders all images", async () => {
    const { queryAllByRole, findByTestId } = render(
      <MockCarousel launch={sampleData} />
    );

    expect(queryAllByRole("img", { alt: /Crew-5/i }).length).toBe(
      sampleData.links.flickr.original.length + 1
    );

    expect(
      await (
        await findByTestId("carousel_countParagraph")
      ).innerHTML
    ).toBe(`1 / ${sampleData.links.flickr.original.length}`);
  });

  it("renders properly when there is no image data", async () => {
    const { findByTestId, queryAllByRole } = render(
      <MockCarousel launch={dataWithoutImages} />
    );

    expect(queryAllByRole("img", { alt: /Crew-5/i }).length).toBe(0);
    expect(
      await (
        await findByTestId("carousel_countParagraph")
      ).innerHTML
    ).toBe("");
  });

  it("styles to visible state only right change slide arrow during start", async () => {
    const { getByTestId } = render(<MockCarousel launch={sampleData} />);

    expect(getByTestId("-1")).toHaveClass("inactive");
  });

  it("styles to visible state left change slide arrow", async () => {
    const { getByTestId } = render(<MockCarousel launch={sampleData} />);
    const rightArrow = getByTestId("1");
    fireEvent.click(rightArrow);

    expect(getByTestId("-1")).not.toHaveClass("inactive");
  });

  it("styles to invisible state right change slide arrow", async () => {
    const { getByTestId } = render(<MockCarousel launch={sampleData} />);
    const rightArrow = getByTestId("1");

    fireEvent.click(rightArrow);
    fireEvent.click(rightArrow);
    fireEvent.click(rightArrow);

    expect(rightArrow).toHaveClass("inactive");
  });
});
