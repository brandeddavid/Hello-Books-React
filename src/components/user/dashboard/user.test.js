import React from "react";
import ReactDOM from "react-dom";
import { shallow } from "enzyme";
import { spy } from "sinon";
import UserDash from "./user";

describe("Tests for user dash", () => {
  let wrapper, user, borrowedBooks, getUser, borrowed;
  beforeEach(() => {
    borrowedBooks = [];
    user = {
      email: "alice@gmail.com",
      firstName: "Alice",
      is_admin: false,
      lastName: "Wanjiku",
      username: "alice"
    };
    getUser = spy();
    borrowed = spy();
    wrapper = shallow(
      <UserDash
        user={user}
        borrowedBooks={borrowedBooks}
        getUser={getUser}
        borrowed={borrowed}
      />
    );
  });
  it("renders content", () => {
    expect(wrapper.find("h1").text()).toEqual("Borrowed Books");
  });
  it("runs getUser function", () => {
    expect(getUser()).toHaveBeenCalled;
  });
  it("runs borrowed function", () => {
    expect(borrowed()).toHaveBeenCalled;
  });
  it("renders all div", () => {
    expect(wrapper.find("div").length).toEqual(10);
  });
});
