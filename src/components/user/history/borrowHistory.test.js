import React from "react";
import ReactDOM from "react-dom";
import { shallow } from "enzyme";
import { spy } from "sinon";
import BorrowHistory from "./borrowHistory";

describe("Tests for Borrow History", () => {
  let wrapper, borrowHistory, borrowedBooksHistory;
  beforeEach(() => {
    borrowedBooksHistory = [];
    borrowHistory = spy();
    wrapper = shallow(
      <BorrowHistory
        borrowHistory={borrowHistory}
        borrowedBooksHistory={borrowedBooksHistory}
      />
    );
  });
  it("renders content", () => {
    expect(wrapper.find("h1").text()).toEqual("Borrowing History");
  });
  it("function get called", () => {
    expect(borrowHistory).toHaveBeenCalled;
  });
  it("renders all divs", () => {
    expect(wrapper.find("div").length).toEqual(5);
  });
});
