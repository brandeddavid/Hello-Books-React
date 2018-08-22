import React, { Component } from "react";
import { Modal, ModalHeader, ModalBody } from "reactstrap";
import { Redirect } from "react-router-dom";
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
      bookAdded: null,
      bookUpdated: false,
    };
  }
  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };
  updateBook = (event, bookId) => {
    event.preventDefault();
    console.log("=======>", this.props.library);
    let accessToken = localStorage.getItem("accessToken");
    return editBook(this.state, bookId, accessToken).then(res => {
      res.status === "success"
        ? this.setState({ bookUpdated: res.bookUpdated })
        : this.setState({ error: res.error });
    });
  };
  render() {
    return this.props.bookAdded || this.props.bookUpdated ? (
      <Redirect to="/managebooks" />
    ) : (
      <React.Fragment>
        <Modal isOpen={this.props.show} toggle={this.props.toggleModal}>
          <ModalHeader toggle={this.props.toggleModal}>
            <div>{this.props.book ? "Edit Book Info" : "Add New Book"}</div>
          </ModalHeader>
          <ModalBody>
            <form
              onSubmit={
                this.props.book
                  ? event => this.updateBook(event, this.props.book.id)
                  : event => this.props.newBook(event, this.state)
              }
              className="add-book-form"
            >
              <div className="error">
                {this.props.error.Message ? this.props.error.Message : ""}
              </div>
              <div className="form-group">
                <label htmlFor="title">Title</label>
                <div className="error">
                  {this.props.error.title ? this.props.error.title : ""}
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
                  {this.props.error.author ? this.props.error.author : ""}
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
                  {this.props.error.isbn ? this.props.error.isbn : ""}
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
                  {this.props.error.publisher ? this.props.error.publisher : ""}
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
                  {this.props.error.quantity ? this.props.error.quantity : ""}
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
          </ModalBody>
        </Modal>
      </React.Fragment>
    );
  }
}

export default BookModal;
