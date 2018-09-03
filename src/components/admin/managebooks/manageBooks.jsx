import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { Button } from "reactstrap";
import BookModal from "./bookModal";
import DeleteBook from "../alerts/deleteBook";
import IndexNav from "../../navbars/adminnav";
import "../../../static/css/admin.css";

class ManageBooks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentBook: null
    };
  }
  componentDidMount() {
    this.props.getBooks();
  }

  renderAddModal = () => {
    this.props.toggleModal();
    this.setState({
      currentBook: null
    });
  };

  renderEditModal = book => {
    this.props.toggleModal();
    this.setState({
      currentBook: book
    });
  };

  deleteAlert = book => {
    this.props.toggleDeleteAlert();
    this.setState({
      book: book
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
          {this.props.renderModal ? (
            <BookModal
              onHide={this.closeModal}
              book={this.state.currentBook}
              toggleModal={this.renderAddModal}
              show={this.props.renderModal}
              library={this.props.library}
              newBook={this.props.newBook}
              bookAdded={this.props.bookAdded}
              updateBook={this.props.updateBook}
              bookUpdated={this.props.bookUpdated}
              error={this.props.error}
            />
          ) : null}
          {this.props.renderDeleteAlert ? (
            <DeleteBook
              book={this.state.book}
              show={this.props.renderDeleteAlert}
              deleteBook={this.props.deleteBook}
              toggleDeleteAlert={this.props.toggleDeleteAlert}
            />
          ) : null}
          {this.state.error ? <span>{this.state.error.Message}</span> : ""}
          {this.props.loading ? (
            this.props.loader
          ) : (
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
          )}
        </div>
      </React.Fragment>
    );
  }
}

export default ManageBooks;
