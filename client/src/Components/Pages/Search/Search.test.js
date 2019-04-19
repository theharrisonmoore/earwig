import React from "react";
import { render, cleanup, waitForElement } from "react-testing-library";
import userEvent from "user-event";
import Search, { axiosCall, getSuggestions } from "./index";
import mockAxios from "axios";
import { resultArray } from "./resultArray";
import { BrowserRouter } from "react-router-dom";

// helpers
// create a data object that can be called throughout all tests
let data = null;
// stores elements in data obj
const init = elements => {
  data = elements;
};

// makes api call
const apiCall = async () => {
  mockAxios.get.mockResolvedValueOnce({ data: resultArray });
  const organisations = await axiosCall();
  return organisations;
};

// checks input value
const expectInputValue = (actualValue, expectedValue) => {
  expect(actualValue).toEqual(expectedValue);
};

// simulates key press in input
const pressKeys = key => {
  userEvent.click(data.input);
  userEvent.type(data.input, key);
  expect(data.input.value).toBe(key);
};

// compares suggestions (stored in state)
// tests the function rather than the rendering

const expectSuggestions = (expectedSuggestions, value, array) => {
  const suggestions = getSuggestions(value, array).map(suggestion =>
    suggestion.isEmpty ? "empty" : suggestion.name
  );
  expect(suggestions).toEqual(expectedSuggestions);
};

// start testing
afterEach(cleanup);

// test if loading renders
it("renders loading...", () => {
  const { getByTestId } = render(
    <BrowserRouter>
      <Search />
    </BrowserRouter>
  );
  const loadingRender = getByTestId("loading");
  expect(loadingRender.textContent).toBe("loading...");
});

beforeAll(async () => {
  // render component
  const { getByTestId, getByRole } = render(
    <BrowserRouter>
      <Search />
    </BrowserRouter>
  );
  // get search component
  const container = await waitForElement(() => getByTestId("searchwrapper"));
  // get input field
  const input = container.querySelector("input");
  // get autosuggest container
  const autosuggestContainer = container.querySelector(
    ".react-autosuggest__container"
  );

  // inside the suggestioncontainer is renderered
  const suggestionsContainer = getByRole("listbox");

  // create data object
  init({ container, autosuggestContainer, input, suggestionsContainer });
});

describe("tests for running app with data ", () => {
  // test http request
  it("calls axios", () => {
    apiCall().then(result => {
      expect(result.data).toEqual(resultArray);
    });
  });

  it("renders headline and input ", () => {
    // test if headline renders
    const headline = data.container.querySelector("h2");
    expect(headline.textContent).toBe("Welcome to earwig.");

    //   test if resolved container renders
    expectInputValue(data.input.placeholder, "🔍        start typing...");
    // // test input value
    expectInputValue(data.input.value, "");
  });

  it("gets expected suggestions based on user input ", async () => {
    // test if input is selected and focussed
    const organisations = await apiCall();

    // if user presses a -> check suggestion array
    pressKeys("a");
    expectSuggestions(
      [
        "A A C Mechanical & Electrical",
        "Aspire Recruitment",
        "Abbey Builders",
        "Advanced Payroll Services"
      ],
      data.input.value,
      organisations.data
    );

    pressKeys("b");

    expectSuggestions(
      ["Bournemouth University"],
      data.input.value,
      organisations.data
    );

    pressKeys("/£@");
    expectSuggestions(["empty"], data.input.value, organisations.data);
  });
});
