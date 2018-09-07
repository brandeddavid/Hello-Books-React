import React from "react";
import moxios from "moxios";
import ReactDOM from "react-dom";
import App from "./App";
import { mount, shallow } from "enzyme";
import UserDash from "./components/user/dashboard/user";

describe("<App />", () => {
  beforeEach(function() {
    // import and pass your custom axios instance to this method
    moxios.install();
  });

  afterEach(function() {
    // import and pass your custom axios instance to this method
    moxios.uninstall();
  });
  it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<App />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it("renders one route at a time", () => {
    const app = mount(<App />);
    expect(app).toHaveLength(1);
  });
  it("calls get books", () => {
    const app = mount(<App />);
    expect(app).toHaveLength(1);
    app.instance().getBooks();
  });
  it("calls get user", () => {
    const app = mount(<App />);
    expect(app).toHaveLength(1);
    app.instance().getUser();
  });
  it("calls login", () => {
    const loginData = {
      username: "dmwangi",
      password: "password12345"
    };
    const app = mount(<App />);
    expect(app).toHaveLength(1);
    app.instance().logIn(loginData);
  });
  it("calls borrowed", () => {
    const app = mount(<App />);
    expect(app).toHaveLength(1);
    app.instance().borrowed();
  });
  it("calls borrow history", () => {
    const app = mount(<App />);
    expect(app).toHaveLength(1);
    app.instance().borrowHistory();
  });
});
