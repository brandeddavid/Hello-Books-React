import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { deleteBook } from "../../utils/api";

class DeleteBook extends Component {
  constructor(props) {
    super(props);
    this.state = {
      deleted: false,
      error: {}
    };
  }
  removeBook = bookId => {
    let token = localStorage.getItem("accessToken");
    deleteBook(bookId, token).then(res => {
      if (res.status === "success") {
        this.setState({
          deleted: res.bookDeleted
        });
      } else {
        this.setState({
          error: res.error
        });
      }
    });
  };

  render() {
    return this.state.deleted ? (
      <Redirect to="/managebooks" />
    ) : (
      <div>
        <Modal isOpen={this.props.show} toggle={this.props.toggleDeleteAlert}>
          <ModalHeader toggle={this.props.toggleDeleteAlert}>
            Delete Book
          </ModalHeader>
          <ModalBody>
            <p className="error">
              {this.state.error.Message ? this.state.error.Message : ""}
            </p>
            <p>Are you sure you want to delete book?</p>
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={this.props.toggleDeleteAlert}>
              Cancel
            </Button>
            <Button
              color="danger"
              onClick={() => this.removeBook(this.props.book.id)}
            >
              Delete
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default DeleteBook;
