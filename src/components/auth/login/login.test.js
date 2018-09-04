import React from "react";
import Login from "./login";
import { spy } from "sinon";
import { shallow } from "enzyme";

describe("Login Component", () => {
  let wrapper, loginErrors, logIn;
  beforeEach(() => {
    loginErrors = {};
    logIn = spy();
    wrapper = shallow(<Login loginErrors={loginErrors} logIn={logIn} />);
  });
  it("starts with empty username", () => {
    const usernameState = wrapper.state().username;
    expect(usernameState).toEqual("");
  });
  it("starts with empty password", () => {
    const passwordState = wrapper.state().password;
    expect(passwordState).toEqual("");
  });
  it("renders content", () => {
    expect(wrapper.find("legend").text()).toEqual("Login");
    expect(wrapper.find("div").length).toEqual(8);
  });
  it("submits data", () => {
    wrapper.find("button").simulate("click");
    expect(logIn()).toHaveBeenCalled;
  });
});
