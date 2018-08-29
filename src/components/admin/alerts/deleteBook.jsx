import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

class DeleteBook extends Component {
  render() {
    return (
      <div>
        <Modal isOpen={this.props.show} toggle={this.props.toggleDeleteAlert}>
          <ModalHeader toggle={this.props.toggleDeleteAlert}>
            Delete Book
          </ModalHeader>
          <ModalBody>
            <p className="error">
            </p>
            <p>Are you sure you want to delete book?</p>
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={this.props.toggleDeleteAlert}>
              Cancel
            </Button>
            <Button
              color="danger"
              onClick={event =>
                this.props.deleteBook(event, this.props.book.id)
              }
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
