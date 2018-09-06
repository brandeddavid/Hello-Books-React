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
  let getBooks, error, library, book, renderModal, wrapper, modal;
  beforeEach(() => {
    getBooks = spy();
    error = {};
    library = [];
    book = null;
    renderModal = true;
    wrapper = shallow(
      <ManageBooks
        renderModal={renderModal}
        library={library}
        getBooks={getBooks}
      />
    );
    modal = shallow(<BookModal error={error} book={book} />);
  });
  it("renders add book modal", () => {
    expect(modal).toHaveLength(1);
  });
  it("renders header for add book", () => {
    expect(modal.find("div.header").text()).toEqual("Add New Book");
  });
  it("renders with state empty values", () => {
    expect(modal.state().title).toEqual("");
    expect(modal.state().author).toEqual("");
    expect(modal.state().isbn).toEqual("");
    expect(modal.state().publisher).toEqual("");
    expect(modal.state().quantity).toEqual("");
  });
});

describe("It renders edit book modal", () => {
  let getBooks, error, library, book, renderModal, wrapper, modal;
  beforeEach(() => {
    getBooks = spy();
    error = {};
    library = [];
    book = {
      author: "Mentorship",
      availability: true,
      id: 63,
      isbn: "55555",
      publisher: "Mentorship",
      quantity: 60,
      title: "Mentorship"
    };
    renderModal = true;
    wrapper = shallow(
      <ManageBooks
        renderModal={renderModal}
        library={library}
        getBooks={getBooks}
      />
    );
    modal = shallow(<BookModal error={error} book={book} />);
  });
  it("renders add book modal", () => {
    expect(modal).toHaveLength(1);
  });
  it("renders header for add book", () => {
    expect(modal.find("div.header").text()).toEqual("Edit Book Info");
  });
  it("renders with book values", () => {
    expect(modal.state().title).toEqual("Mentorship");
    expect(modal.state().author).toEqual("Mentorship");
    expect(modal.state().isbn).toEqual("55555");
    expect(modal.state().publisher).toEqual("Mentorship");
    expect(modal.state().quantity).toEqual(60);
  });
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
