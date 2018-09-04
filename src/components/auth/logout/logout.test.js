import React from "react";
import ReactDOM from "react-dom";
import { shallow } from "enzyme";
import { spy } from "sinon";
import Logout from "./logout";

describe("Test Logout", () => {
  let logOut, wrapper;
  beforeEach(() => {
    logOut = spy();
    wrapper = shallow(<Logout logOut={logOut} />);
  });
  it("renders content", () => {
    expect(wrapper.find("div").length).toEqual(1);
  });
  it("function get called", () => {
    expect(logOut).toHaveBeenCalled;
  });
});
