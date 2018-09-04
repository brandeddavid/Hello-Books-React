import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { mount, shallow } from "enzyme";
import UserDash from "./components/user/dashboard/user";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it("renders one route at a time", () => {
  const app = mount(<App />);
  expect(app).toHaveLength(1);
});
