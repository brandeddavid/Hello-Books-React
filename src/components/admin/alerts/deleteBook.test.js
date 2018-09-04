import React from "react";
import ReactDOM from "react-dom";
import { shallow } from "enzyme";
import DeleteBook from "./deleteBook";

describe("Tests for Library", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<DeleteBook />);
  });
  it("renders all div", () => {
    expect(wrapper.find("div").length).toEqual(1);
  });
  it("renders components", () => {
    expect(wrapper.find("ModalHeader").text()).toEqual("<ModalHeader />");
  });
  it("displays all buttons", () => {
    expect(wrapper.find("Button").length).toEqual(2);
  });
  it("displays content", () => {
    expect(wrapper.find("p.confirm").text()).toEqual(
      "Are you sure you want to delete book?"
    );
  });
});
