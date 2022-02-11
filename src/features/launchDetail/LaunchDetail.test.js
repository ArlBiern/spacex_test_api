import { render } from "@testing-library/react";
import * as reactRedux from "react-redux";
import LaunchDetail from "./LaunchDetail";
import { HashRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "../../app/store";

const sampleData = [
  {
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
    name: "Crew-5",
    date_utc: "2021-11-11T02:03:00.000Z",
    date_unix: 1636596180,
    id: "5fe3b15eb3467846b324216d",
  },
];

const failedFlightData = [
  {
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
    success: false,
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
  },
];

const dataWithoutImages = [
  {
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
  },
];

const MockLaunchDetails = (params) => {
  return (
    <HashRouter>
      <Provider store={store}>
        <LaunchDetail params={params} />
      </Provider>
    </HashRouter>
  );
};

describe("Launch Detail component", () => {
  let stateStatusSelectorMock;
  let launchSelectorMock;

  beforeEach(() => {
    stateStatusSelectorMock = jest.spyOn(reactRedux, "useSelector");
    launchSelectorMock = jest.spyOn(reactRedux, "useSelector");
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("renders basic information about the flight", async () => {
    launchSelectorMock.mockReturnValue(sampleData);

    const { findByText } = render(<MockLaunchDetails />);

    expect(await findByText(/szczegóły lotu/i)).toBeInTheDocument();
    expect(await findByText(/data lotu/i)).toBeInTheDocument();
    expect(await findByText(/Falcon 9/i)).toBeInTheDocument();
  });

  it("renders properly when there is no image and details in the data", async () => {
    launchSelectorMock.mockReturnValue(dataWithoutImages);

    const { findByText } = render(<MockLaunchDetails />);

    expect(await findByText(/Brak zdjęć dla tego lot/i)).toBeInTheDocument();
    expect(
      await findByText(/brak dodatkowych szczegółów/i)
    ).toBeInTheDocument();
  });

  it("renders status properly wenn flight succeed", async () => {
    launchSelectorMock.mockReturnValue(sampleData);

    const { findByText } = render(<MockLaunchDetails />);

    expect(await findByText(/udany/i)).toBeInTheDocument();
  });

  it("renders status properly wenn flight wasn't launched", async () => {
    launchSelectorMock.mockReturnValue(dataWithoutImages);

    const { findByText } = render(<MockLaunchDetails />);

    expect(await findByText(/przed startem/i)).toBeInTheDocument();
  });

  it("renders status properly wenn flight failed", async () => {
    launchSelectorMock.mockReturnValue(failedFlightData);

    const { findByText } = render(<MockLaunchDetails />);

    expect(await findByText(/nieudany/i)).toBeInTheDocument();
  });

  it("renders pageNorFound component if status of fatching data is failed", () => {
    stateStatusSelectorMock.mockReturnValue("failed");

    const { getByTestId } = render(<MockLaunchDetails />);
    const pageNotFound = getByTestId("pageNotFound");

    expect(pageNotFound).toBeTruthy();
  });
});
