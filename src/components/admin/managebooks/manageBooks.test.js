import React from "react";
import ReactDOM from "react-dom";
import { shallow } from "enzyme";
import { spy } from "sinon";
import ManageBooks from "./manageBooks";

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
    wrapper = shallow(<ManageBooks library={library} getBooks={getBooks} />);
  });
  it("renders all div", () => {
    expect(wrapper.find('div').length).toEqual(3);
  });
  it("function get called", () => {
    expect(getBooks).toHaveBeenCalled;
  });
  it("has current book null on mount", () => {
    expect(wrapper.state().currentBook).toEqual(null)
  });
});
