import React from "react";
import renderer from "react-test-renderer";
import HelloWorld from "./HelloWorld";

describe("Hello Component renders correctly", () => {
  it("renders correctly", () => {
    const tree = renderer.create(<HelloWorld />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
