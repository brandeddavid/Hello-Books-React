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
    expect(wrapper.find("div").length).toEqual(7);
  });
  it("function get called", () => {
    expect(getBooks).toHaveBeenCalled;
  });
  it("has current book null on mount", () => {
    expect(wrapper.state().currentBook).toEqual(null);
  });
  it("header", () => {
    expect(
      wrapper
        .find("h1")
        .first()
        .text()
    ).toEqual("Available Books");
  });
});

describe("it renders add book modal", () => {
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
  it("renders all divs", () => {
    expect(modal.find("div").length).toEqual(12);
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

describe("it renders edit book modal", () => {
  let getBooks, error, library, book, renderModal, wrapper, modal, updateBook;
  beforeEach(() => {
    getBooks = spy();
    error = {};
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
    book = {
      author: "Mentorship",
      availability: true,
      id: 63,
      isbn: "55555",
      publisher: "Mentorship",
      quantity: 60,
      title: "Mentorship"
    };
    updateBook = spy();
    renderModal = true;
    wrapper = shallow(
      <ManageBooks
        renderModal={renderModal}
        library={library}
        getBooks={getBooks}
        updateBook={updateBook}
      />
    );
    modal = shallow(<BookModal error={error} book={book} />);
  });
  it("renders add book modal", () => {
    expect(modal).toHaveLength(1);
  });
  it("renders all divs", () => {
    expect(modal.find("div").length).toEqual(12);
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
  it("calls edit book function", () => {
    modal
      .find("button.save")
      .hostNodes()
      .simulate("click");
    expect(updateBook).toHaveBeenCalled;
  });
});

describe("it renders delete modal", () => {
  const getBooks = spy();
  const error = {};
  const library = [];
  const renderModal = true;
  const deleteBook = spy();
  const wrapper = shallow(
    <ManageBooks
      renderDeleteModal={renderModal}
      library={library}
      getBooks={getBooks}
    />
  );
  const modal = shallow(<DeleteBook error={error} deleteBook={deleteBook} />);
  expect(modal).toHaveLength(1);
});

describe("it renders all buttons", () => {
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
  it("renders add book modal", () => {
    expect(wrapper.find("button.add-book-btn"));
  });
});

describe("it renders error message", () => {
  let getBooks, error, library, book, wrapper, modal;
  beforeEach(() => {
    getBooks = spy();
    error = {};
    library = [];
    book = null;
    wrapper = shallow(<ManageBooks library={library} getBooks={getBooks} />);
  });
  it("renders error", () => {
    expect(
      wrapper
        .find("h1")
        .first()
        .text()
    ).toEqual("No Books Available");
  });
});
