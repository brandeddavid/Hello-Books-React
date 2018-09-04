import React from "react";
import ReactDOM from "react-dom";
import { shallow } from "enzyme";
import { spy } from "sinon";
import Library from "./library";

describe("Tests for Library", () => {
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
    wrapper = shallow(<Library library={library} getBooks={getBooks} />);
  });
  it("renders content", () => {
    expect(wrapper.find("h1").text()).toEqual("Book Library");
  });
  it("function get called", () => {
    expect(getBooks).toHaveBeenCalled;
  });
});
