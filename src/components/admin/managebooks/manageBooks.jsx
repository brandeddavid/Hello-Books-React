import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { Button } from "reactstrap";
import BookModal from "./bookModal";
import DeleteBook from "../alerts/deleteBook";
import IndexNav from "../../navbars/adminnav";
import "../../../static/css/admin.css";
import { Input } from "reactstrap";
/**
 * Manage books component.
 * Lists all books with add, edit and delete book actions
 */

class ManageBooks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentBook: null
    };
  }
  componentDidMount() {
    /**
     * Runs when component mounts
     */
    this.props.getBooks();
    this.scrollListener = window.addEventListener("scroll", event => {
      this.handleScroll(event);
    });
  }

  handleScroll = () => {
    /**
     * Scroll event listener
     */
    const { scrolling, totalPages, page } = this.props;
    if (scrolling) return;
    if (totalPages <= page) return;
    const lastTr = document.querySelector("tr.book > td:last-child");
    const lastTrOffset = lastTr.offsetTop + lastTr.clientHeight;
    const pageOffset = window.pageYOffset + window.innerHeight;
    var bottomOffset = 20;
    if (pageOffset > lastTrOffset - bottomOffset) this.props.loadMore();
  };

  renderAddModal = () => {
    /**
     * Renders book modal for add action
     */
    this.props.toggleModal();
    this.setState({
      currentBook: null
    });
  };

  renderEditModal = book => {
    /**
     * Renders book modal for edit action
     */
    this.props.toggleModal();
    this.setState({
      currentBook: book
    });
  };

  deleteAlert = book => {
    /**
     * Renders delete alert for delete action
     */
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
              error={this.props.bookErrors}
              loader={this.props.loader}
              loading={this.props.loading}
            />
          ) : null}
          {this.props.renderDeleteAlert ? (
            <DeleteBook
              book={this.state.book}
              show={this.props.renderDeleteAlert}
              deleteBook={this.props.deleteBook}
              toggleDeleteAlert={this.props.toggleDeleteAlert}
              loader={this.props.loader}
              loading={this.props.loading}
              error={this.props.deleteBookErrors}
            />
          ) : null}
          <div className="row">
            <div className="col-md-2">
              <div>
                <Button
                  className="btn btn-lg btn-success add-book-btn"
                  onClick={() => this.renderAddModal()}
                >
                  Add Book
                </Button>
              </div>
            </div>
            <div className="col-md-6" />
            <div className="col-md-4">
              <Input
                name="search"
                type="text"
                placeholder="Search..."
                className="search"
              />
            </div>
          </div>
          {this.props.library.length === 0 && !this.props.loading ? (
            <span>
              <h1 className="text-center error">No Books Available</h1>
            </span>
          ) : (
            <h1 className="text-center">Available Books</h1>
          )}
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
                    <tr key={book.id} className="book">
                      <td>{book.title}</td>
                      <td>{book.author}</td>
                      <td>{book.isbn}</td>
                      <td>{book.publisher}</td>
                      <td>{book.quantity}</td>
                      <td className="">
                        <button
                          onClick={() => this.renderEditModal(book)}
                          className="btn btn-primary"
                        >
                          Edit
                        </button>
                      </td>
                      <td className="">
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
          {this.props.scrolling ? this.props.loader : ""}
        </div>
      </React.Fragment>
    );
  }
}

export default ManageBooks;
