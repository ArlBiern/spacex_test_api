import { render, cleanup, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import Form from "./Form";
import { store } from "../../app/store";

const MockForm = () => {
  return (
    <Provider store={store}>
      <Form />
    </Provider>
  );
};

describe("Form Component", () => {
  afterEach(cleanup);

  it("renders form in the component", async () => {
    const { getByTestId } = render(<MockForm />);

    expect(getByTestId("form")).toBeTruthy();
  });

  it("checkbox button is in unchecked state", async () => {
    const { getByTestId } = render(<MockForm />);

    expect(getByTestId("successInput")).not.toHaveAttribute("checked");
  });

  it("checkbox button is in checked state after triger click event from label", async () => {
    const { getByTestId } = render(<MockForm />);

    fireEvent.click(getByTestId("checkbox_text"));
    expect(getByTestId("cb1")).toHaveAttribute("data-checked", "true");
  });

  it("changes query text if user types", async () => {
    const { getByTestId } = render(<MockForm />);

    const inputQuery = "star";
    const input = getByTestId("queryInput");
    fireEvent.change(input, {
      target: {
        value: inputQuery,
      },
    });

    expect(input.value).toBe(inputQuery);
  });

  it("leaves entered query after submit buttom press", async () => {
    const { getByTestId, getByText } = render(<MockForm />);

    const inputQuery = "star";
    const input = getByTestId("queryInput");
    const submitButton = getByText(/szukaj/i);

    fireEvent.change(input, {
      target: {
        value: inputQuery,
      },
    });
    fireEvent.click(submitButton);
    expect(input.value).toBe(inputQuery);
  });

  it("changes date ranges if user types", async () => {
    const { getByPlaceholderText } = render(<MockForm />);

    const inputData = "2020-01-01 ~ 2022-01-01";
    const dataInput = getByPlaceholderText("yyyy-MM-dd ~ yyyy-MM-dd");
    fireEvent.change(dataInput, {
      target: {
        value: inputData,
      },
    });

    expect(dataInput.value).toBe(inputData);
  });

  it("leaves entered data range after submit buttom press", async () => {
    const { getByText, getByPlaceholderText } = render(<MockForm />);

    const inputData = "2020-01-01 ~ 2022-01-01";
    const dataInput = getByPlaceholderText("yyyy-MM-dd ~ yyyy-MM-dd");
    const submitButton = getByText(/szukaj/i);
    fireEvent.change(dataInput, {
      target: {
        value: inputData,
      },
    });

    fireEvent.click(submitButton);
    expect(dataInput.value).toBe(inputData);
  });
});
