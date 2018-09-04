import React from "react";
import ReactDOM from "react-dom";
import { shallow } from "enzyme";
import { spy } from "sinon";
import Borrow from "./borrow";

describe("Tests for Borrow", () => {
  let library, getBooks, wrapper;
  beforeEach(() => {
    library = [
      {
        author: "Mentorship",
        availability: true,
        id: 63,
        isbn: "55555",
        publisher: "Mentorship",
        quantity: 60,
        title: "Mentorship"
      }
    ];
    getBooks = spy();
    wrapper = shallow(<Borrow library={library} getBooks={getBooks} />);
  });
  it("renders content", () => {
    expect(wrapper.find("h1").text()).toEqual("Book Library");
  });
  it("function get called", () => {
    expect(getBooks).toHaveBeenCalled;
  });
  it("renders all div", () => {
    expect(wrapper.find("div").length).toEqual(4);
  });
  it("renders all div", () => {
    expect(wrapper.find("Button").length).toEqual(1);
  });
});
