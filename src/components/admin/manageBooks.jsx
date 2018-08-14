import React, { Component } from "react";
import { Button } from "reactstrap";
import { fetchBooks, deleteBook } from "../../utils/api";
import BookModal from "./bookModal";
import IndexNav from "../navbars/adminnav";
import "../../static/css/admin.css";

class ManageBooks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      library: [],
      error: {},
      renderModal: false,
      currentBook: null
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
      renderModal: !this.state.renderModal,
      currentBook: null
    });
  };

  renderEditModal = book => {
    this.setState({
      renderModal: !this.state.renderModal,
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
            <BookModal
              onHide={this.closeModal}
              book={this.state.currentBook}
              toggleModal={this.renderAddModal}
              show={this.state.renderModal}
            />
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
