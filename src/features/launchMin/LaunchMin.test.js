import { render } from "@testing-library/react";
import LaunchMin from "./LaunchMin";
import { HashRouter } from "react-router-dom";

const sampleData = {
  links: {
    flickr: {
      original: [
        "https://live.staticflickr.com/65535/51673353699_e3da266245_o.jpg",
        "https://live.staticflickr.com/65535/51673548360_64354b760f_o.jpg",
        "https://live.staticflickr.com/65535/51672676881_3b88410a96_o.jpg",
        "https://live.staticflickr.com/65535/51673548330_7acc53d2fb_o.jpg",
        "https://live.staticflickr.com/65535/51671874407_4f56a87855_o.jpg",
        "https://live.staticflickr.com/65535/51672676961_36371a6a76_o.jpg",
        "https://live.staticflickr.com/65535/51672915563_7f5b373701_o.jpg",
        "https://live.staticflickr.com/65535/51672915633_947e35cabc_o.jpg",
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
  name: "Crew-3",
  date_utc: "2021-11-11T02:03:00.000Z",
  date_unix: 1636596180,
  id: "5fe3b15eb3467846b324216d",
};

const dataWithoutImage = {
  links: {
    flickr: {
      original: [],
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
  name: "Crew-3",
  date_utc: "2021-11-11T02:03:00.000Z",
  date_unix: 1636596180,
  id: "5fe3b15eb3467846b324216d",
};

const MockLaunchMin = ({ launch }) => {
  return (
    <HashRouter>
      <LaunchMin launch={launch} />
    </HashRouter>
  );
};

describe("Launch Min component", () => {
  it("render information about the launch", async () => {
    const { getByTestId, findByRole } = render(
      <MockLaunchMin launch={sampleData} />
    );

    expect(getByTestId("launch_item")).toBeTruthy();
    expect(
      await findByRole("img", { alt: /Picture of flight Crew-3 rocket/i })
    ).toBeInTheDocument();

    expect(getByTestId("min_flightTitle")).toHaveTextContent("Crew-3");
  });

  it("renders properly when there is no images", async () => {
    const { findByText } = render(<MockLaunchMin launch={dataWithoutImage} />);
    expect(await findByText(/brak zdjęć/i)).toBeTruthy();
  });
});
