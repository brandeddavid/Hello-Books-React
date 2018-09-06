import React from "react";
import ReactDOM from "react-dom";
import { shallow, mount } from "enzyme";
import { spy } from "sinon";
import ManageBooks from "./manageBooks";
import BookModal from "./bookModal";
import DeleteBook from "../alerts/deleteBook";

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
    expect(wrapper.find("div").length).toEqual(3);
  });
  it("function get called", () => {
    expect(getBooks).toHaveBeenCalled;
  });
  it("has current book null on mount", () => {
    expect(wrapper.state().currentBook).toEqual(null);
  });
});

describe("It renders add book modal", () => {
  const getBooks = spy();
  const error = {};
  const library = [];
  const book = null;
  const renderModal = true;
  const wrapper = shallow(
    <ManageBooks
      renderModal={renderModal}
      library={library}
      getBooks={getBooks}
    />
  );
  const modal = shallow(<BookModal error={error} book={book} />);
  expect(modal).toHaveLength(1);
  expect(modal.find("div.header").text()).toEqual("Add New Book");
});

describe("It renders edit book modal", () => {
  const getBooks = spy();
  const error = {};
  const library = [];
  const book = {
    author: "Mentorship",
    availability: true,
    id: 63,
    isbn: "55555",
    publisher: "Mentorship",
    quantity: 60,
    title: "Mentorship"
  };
  const renderModal = true;
  const wrapper = shallow(
    <ManageBooks
      renderModal={renderModal}
      library={library}
      getBooks={getBooks}
    />
  );
  const modal = shallow(<BookModal error={error} book={book} />);
  expect(modal).toHaveLength(1);
  expect(modal.find("div.header").text()).toEqual("Edit Book Info");
});

describe("It renders delete modal", () => {
  const getBooks = spy();
  const error = {};
  const library = [];
  const renderModal = true;
  const wrapper = shallow(
    <ManageBooks
      renderDeleteModal={renderModal}
      library={library}
      getBooks={getBooks}
    />
  );
  const modal = shallow(<DeleteBook error={error} />);
  expect(modal).toHaveLength(1);
});
