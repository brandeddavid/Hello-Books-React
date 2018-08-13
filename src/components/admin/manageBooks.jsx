import React, { Component } from "react";
import { Button } from "react-bootstrap";
import { fetchBooks, deleteBook } from "../../utils/api";
import BookModel from "./bookModal";
import IndexNav from "../navbars/adminnav";
import "../../static/css/admin.css";

class ManageBooks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      library: [],
      error: {},
      renderModal: false,
      currentBook: undefined
    };
  }
  componentDidMount() {
    this.getBooks();
  }
  getBooks = () => {
    fetchBooks().then(res => {
      res.status === "success"
        ? this.setState({ library: res.books })
        : this.setState({ error: res.error });
    });
  };

  renderAddModal = () => {
    this.setState({
      renderModal: true
    });
  };

  renderEditModal = book => {
    this.setState({
      renderModal: true,
      currentBook: book
    });
  };

  closeModal = () => {
    this.setState({
      renderModal: false
    });
  };

  removeBook = bookId => {
    let token = localStorage.getItem("accessToken");
    deleteBook(bookId, token)
      .then(res => {
        if (res.status === "success") {
          console.log("Success");
        } else {
          console.log("Failure");
        }
      })
      .catch(error => {
        console.log("++++", error);
      });
  };

  render() {
    return (
      <React.Fragment>
        <IndexNav />
        <div className="container admin-container">
          <div>
            <Button
              className="btn btn-lg btn-success add-book-btn"
              onClick={() => this.renderAddModal()}
            >
              Add Book
            </Button>
          </div>
          {this.state.renderModal ? (
            <BookModel onHide={this.closeModal} book={this.state.currentBook} />
          ) : null}
          {this.state.error ? <span>{this.state.error.Message}</span> : ""}
          <div className="table-responsive">
            <table className="table table-striped table-hover book-table">
              <thead className="thead-dark">
                <tr>
                  <th>Title</th>
                  <th>Author</th>
                  <th>ISBN</th>
                  <th>Publisher</th>
                  <th>Quantity</th>
                  <th />
                  <th />
                </tr>
              </thead>
              <tbody>
                {this.state.library.map(book => (
                  <tr key={book.id}>
                    <td>{book.title}</td>
                    <td>{book.author}</td>
                    <td>{book.isbn}</td>
                    <td>{book.publisher}</td>
                    <td>{book.quantity}</td>
                    <td className="text-center">
                      <button
                        onClick={() => this.renderEditModal(book)}
                        className="btn btn-primary"
                      >
                        Edit
                      </button>
                    </td>
                    <td className="text-center">
                      <button
                        className="btn btn-danger"
                        onClick={() => this.removeBook(book.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default ManageBooks;
