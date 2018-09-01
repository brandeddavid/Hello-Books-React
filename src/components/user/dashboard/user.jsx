import React, { Component } from "react";
import { Button } from "reactstrap";
import UserNav from "../../navbars/usernav";
import "./user.css";

class UserDash extends Component {
  componentDidMount() {
    this.props.borrowed();
  }
  render() {
    return (
      <React.Fragment>
        <UserNav />
        <div className="container">
          <div className="row">
            <div className="col-md-3">
              <div className="prof-pic-div img-responsive">
                <img
                  src="https://cdn2.iconfinder.com/data/icons/rcons-user/32/male-shadow-circle-512.png"
                  alt="Profile Picture"
                  className="prof-pic"
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className="table-responsive">
                <table className="table">
                  <tbody>
                    <tr>
                      <th>First Name:</th>
                      <td>{this.props.user.firstName}</td>
                    </tr>
                    <tr>
                      <th>Last Name:</th>
                      <td>{this.props.user.lastName}</td>
                    </tr>
                    <tr>
                      <th>Username:</th>
                      <td>{this.props.user.username}</td>
                    </tr>
                    <tr>
                      <th>Email Address:</th>
                      <td>{this.props.user.email}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div className="col-md-3" />
          </div>
          <div className="row">
            <div className="col-lg-12">
              <div className="text-center">
                <hr />
                <h1>Borrowed Books</h1>
                <hr />
              </div>
              {this.props.borrowedBooks.length === 0 ? (
                <div className="text-center error">
                  <h3>You do not have borrowed books</h3>
                </div>
              ) : (
                <div className="table-responsive">
                  <table className="table table-hover">
                    <thead className="thead-dark">
                      <tr>
                        <th>Book Title</th>
                        <th>Book Author</th>
                        <th>Book ISBN</th>
                        <th>Date Borrowed</th>
                        <th>Date Due</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.props.borrowedBooks.map(book => (
                        <tr key={book.id}>
                          <td>{book.title}</td>
                          <td>{book.author}</td>
                          <td>{book.isbn}</td>
                          <td>{book.borrowDate}</td>
                          <td>{book.dueDate}</td>
                          <td>
                            <Button
                              className="btn btn-success"
                              onClick={event =>
                                this.props.returnBook(event, book.id)
                              }
                            >
                              Return Book
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default UserDash;
