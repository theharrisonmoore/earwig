import React from "react";
import {
  render,
  fireEvent,
  cleanup,
  waitForElement
} from "react-testing-library";
import userEvent from "user-event";
import Search, { axiosCall, getSuggestions } from "./index";
import mockAxios from "axios";
import { resultArray } from "./resultArray";

// helpers
let data = null;
// stores elements in data obj
const init = elements => {
  data = elements;
};

// make api call
const apiCall = async () => {
  mockAxios.get.mockResolvedValueOnce({ data: resultArray });
  const organisations = await axiosCall();
  return organisations;
};

// checks input value
const expectInputValue = (actualValue, expectedValue) => {
  expect(actualValue).toEqual(expectedValue);
};

// clicks input field and changes value
const focusAndSetInputValue = value => {
  fireEvent.click(data.input);
  data.input.value = value;
  fireEvent.change(data.input);
};

// simulates key press in input
const pressKeys = key => {
  userEvent.type(data.input, key);
  expect(data.input.value).toBe(key);
};

// compares suggestions (stored in state)
// i know that this only tests the function rather than the rendering
// i'm just not sure how to get the suggestions as they don't seem to be rendered in my tests at all if I inspect the dom elements...
const expectSuggestions = (expectedSuggestions, value, array) => {
  const suggestions = getSuggestions(value, array).map(
    suggestion => suggestion.name
  );

  expect(suggestions).toEqual(expectedSuggestions);
};
// i guess it should rather be like
// const suggestions = data.autosuggestContainer.querySelectorAll(
//   ".react-autosuggest__suggestion"
// );

// start testing
afterEach(cleanup);

// test if loading renders
it("renders loading...", () => {
  const { getByTestId } = render(<Search />);
  const loadingRender = getByTestId("loading");
  expect(loadingRender.textContent).toBe("loading...");
});

// testing for api call and after
describe("tests for successful rendering", () => {
  beforeEach(async () => {
    // render component
    const { getByTestId, getByRole } = render(<Search />);
    // get search component
    const container = await waitForElement(() => getByTestId("searchwrapper"));
    // get input field (react testing library didn't work here...)
    const input = container.querySelector("input");
    // get autosuggest container (like above needed to use DOM)
    const autosuggestContainer = container.querySelector(
      ".react-autosuggest__container"
    );
    // when user clicks on input the autosuggestcontainer class becomes 'react-autosuggest__container react-autosuggest__container--open'
    // inside the suggestioncontainer is renderered
    const suggestionsContainer = getByRole("listbox");
    // however I cant get the open class to work in my tests.. so the container stays closed...

    // create data object
    init({ container, autosuggestContainer, input, suggestionsContainer });
  });

  // test http request
  it("calls axios", async () => {
    apiCall().then(result => {
      expect(result.data).toEqual(resultArray);
      expect(mockAxios.get).toHaveBeenCalledTimes(3);
    });
  });

  describe("tests for running app with data ", () => {
    it("renders headline and input ", async () => {
      mockAxios.get.mockResolvedValueOnce({ data: resultArray });
      const organisations = await axiosCall();

      // test if headline renders
      const headline = data.container.querySelector("h2");
      expect(headline.textContent).toBe("Welcome to earwig.");
      //   test if resolved container renders
      expectInputValue(data.input.placeholder, "🔍        start typing...");
      // test input value
      expectInputValue(data.input.value, "");

      // test if input is selected and focussed
      focusAndSetInputValue("a");
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

      // test for key events

      pressKeys("b");

      expectSuggestions(
        ["Bournemouth University"],
        data.input.value,
        organisations.data
      );
      // tests are not rendering the correct container including the data from axios...
    });
  });
});
