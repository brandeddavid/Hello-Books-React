import React, { Component } from "react";
import { Button } from "reactstrap";
import BookModal from "./bookModal";
import DeleteBook from "../alerts/deleteBook";
import IndexNav from "../navbars/adminnav";
import "../../static/css/admin.css";

class ManageBooks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      renderModal: false,
      currentBook: null,
      renderDeleteAlert: false,
    };
  }
  componentDidMount() {
    this.props.getBooks();
  }

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

  deleteAlert = book => {
    this.setState({
      renderDeleteAlert: true,
      book: book
    });
  };

  toggleDeleteAlert = () => {
    this.setState({
      renderDeleteAlert: !this.state.renderDeleteAlert
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
              library={this.props.library}
              newBook={this.props.newBook}
              bookAdded={this.props.bookAdded}
              updateBook={this.props.updateBook}
              bookUpdated={this.props.bookUpdated}
              error={this.props.error}
            />
          ) : null}
          {this.state.renderDeleteAlert ? (
            <DeleteBook
              book={this.state.book}
              show={this.state.renderDeleteAlert}
              toggleDeleteAlert={this.toggleDeleteAlert}
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
                {this.props.library.map(book => (
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
                        onClick={() => this.deleteAlert(book)}
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
