import React, { Component } from "react";
import { Modal } from "react-bootstrap";
import { addBook, editBook } from "../../utils/api";

class BookModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: this.props.book ? this.props.book.title : "",
      author: this.props.book ? this.props.book.author : "",
      isbn: this.props.book ? this.props.book.isbn : "",
      publisher: this.props.book ? this.props.book.publisher : "",
      quantity: this.props.book ? this.props.book.quantity : "",
      bookAdded: false,
      bookUpdated: false,
      error: {}
    };
  }
  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };
  newBook = event => {
    event.preventDefault();
    let accessToken = localStorage.getItem("accessToken");
    addBook(this.state, accessToken).then(res => {
      res.status === "success"
        ? this.setState({ bookAdded: res.bookAdded })
        : this.setState({ error: res.error });
    });
  };
  updateBook = (event, bookId) => {
    event.preventDefault();
    // console.log("Book Id", bookId);
    let accessToken = localStorage.getItem("accessToken");
    return editBook(this.state, bookId, accessToken).then(res => {
      res.status === "success"
        ? this.setState({ bookUpdated: res.bookUpdated })
        : this.setState({ error: res.error });
    });
  };
  render() {
    return (
      <React.Fragment>
        <Modal.Dialog show={this.props.show} onHide={this.props.toggleModal}>
          <Modal.Header closeButton>
            <Modal.Title>{this.props.book ? "Edit Book Info" : "Add New Book"}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form
              onSubmit={
                this.props.book
                  ? (event) => this.updateBook(event, this.props.book.id)
                  : this.newBook
              }
              className="add-book-form"
            >
              <div className="error">
                {this.state.error.Message ? this.state.error.Message : ""}
              </div>
              <div className="form-group">
                <label htmlFor="title">Title</label>
                <div className="error">
                  {this.state.error.title ? this.state.error.title : ""}
                </div>
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  placeholder="Enter Book Title"
                  name="title"
                  onChange={this.handleChange}
                  value={this.state.title}
                />
              </div>
              <div className="form-group">
                <label htmlFor="author">Author</label>
                <div className="error">
                  {this.state.error.author ? this.state.error.author : ""}
                </div>
                <input
                  type="text"
                  className="form-control"
                  id="author"
                  placeholder="Enter Book Author"
                  name="author"
                  onChange={this.handleChange}
                  value={this.state.author}
                />
              </div>
              <div className="form-group">
                <label htmlFor="isbn">ISBN</label>
                <div className="error">
                  {this.state.error.isbn ? this.state.error.isbn : ""}
                </div>
                <input
                  type="text"
                  className="form-control"
                  id="isbn"
                  placeholder="Enter Book ISBN"
                  name="isbn"
                  onChange={this.handleChange}
                  value={this.state.isbn}
                />
              </div>
              <div className="form-group">
                <label htmlFor="publisher">Publisher</label>
                <div className="error">
                  {this.state.error.publisher ? this.state.error.publisher : ""}
                </div>
                <input
                  type="text"
                  className="form-control"
                  id="publisher"
                  placeholder="Enter Book Publisher"
                  name="publisher"
                  onChange={this.handleChange}
                  value={this.state.publisher}
                />
              </div>
              <div className="form-group">
                <label htmlFor="quantity">Quantity</label>
                <div className="error">
                  {this.state.error.quantity ? this.state.error.quantity : ""}
                </div>
                <input
                  type="number"
                  className="form-control"
                  id="quantity"
                  placeholder="Enter Book Quantity"
                  name="quantity"
                  onChange={this.handleChange}
                  value={this.state.quantity}
                  min="0"
                />
              </div>
              <button type="submit" className="btn btn-primary">
                Save
              </button>
            </form>
          </Modal.Body>
          <Modal.Footer />
        </Modal.Dialog>
      </React.Fragment>
    );
  }
}

export default BookModal;
