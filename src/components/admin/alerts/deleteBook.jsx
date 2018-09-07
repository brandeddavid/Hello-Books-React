import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

/**
 * Delete book alert component
 * Called after user opts to delete book
 * Confirms user action
 */

class DeleteBook extends Component {
  render() {
    return (
      <div>
        <Modal isOpen={this.props.show} toggle={this.props.toggleDeleteAlert}>
          <ModalHeader toggle={this.props.toggleDeleteAlert}>
            Delete Book
          </ModalHeader>
          <ModalBody>
            {this.props.error ? (
              <p className="error">{this.props.error.Message}</p>
            ) : (
              ""
            )}

            <p className="confirm">Are you sure you want to delete book?</p>
          </ModalBody>

          {this.props.loading ? (
            this.props.loader
          ) : (
            <ModalFooter>
              <Button color="secondary" onClick={this.props.toggleDeleteAlert}>
                Cancel
              </Button>
              <Button
              className='delete'
                color="danger"
                onClick={event =>
                  this.props.deleteBook(event, this.props.book.id)
                }
              >
                Delete
              </Button>
            </ModalFooter>
          )}
        </Modal>
      </div>
    );
  }
}

export default DeleteBook;
