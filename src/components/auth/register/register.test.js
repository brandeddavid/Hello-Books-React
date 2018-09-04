import React from "react";
import Register from "./register";
import { spy } from "sinon";
import { shallow } from "enzyme";

describe("Register Component", () => {
  let wrapper, regErrors, register;
  beforeEach(() => {
    regErrors = {};
    register = spy();
    wrapper = shallow(<Register regErrors={regErrors} register={register} />);
  });
  it("starts with empty first name", () => {
    const fnameState = wrapper.state().first_name;
    expect(fnameState).toEqual("");
  });
  it("starts with empty last name", () => {
    const lnameState = wrapper.state().last_name;
    expect(lnameState).toEqual("");
  });
  it("starts with empty email", () => {
    const emailState = wrapper.state().email;
    expect(emailState).toEqual("");
  });
  it("starts with empty username", () => {
    const usernameState = wrapper.state().username;
    expect(usernameState).toEqual("");
  });
  it("starts with empty password", () => {
    const passwordState = wrapper.state().password;
    expect(passwordState).toEqual("");
  });
  it("starts with empty confirm password", () => {
    const cpasswordState = wrapper.state().confirm_password;
    expect(cpasswordState).toEqual("");
  });
  it("renders content", () => {
    expect(wrapper.find("div").length).toEqual(19);
  });
  it("submits data", () => {
    wrapper.find("button").simulate("click");
    expect(register()).toHaveBeenCalled;
  });
});
