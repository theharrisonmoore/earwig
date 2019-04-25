import React from "react";
import Enzyme, { mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import App, { initialState } from "./App";

Enzyme.configure({ adapter: new Adapter() });

describe("App", () => {
  it("has correct initial state", () => {
    const MountedApp = mount(<App />);
    expect(MountedApp.state()).toEqual(initialState);
  });
  it("handleChangeState updates state", () => {
    const MountedApp = mount(<App />);
    MountedApp.instance().handleChangeState({ isLoggedIn: true });
    expect(MountedApp.state()).toEqual({
      ...initialState,
      isLoggedIn: true,
      isMounted: true
    });
  });
});
