import React, { Component } from "react";
import { Button } from "reactstrap";
import UserNav from "../../navbars/usernav";
import "./user.css";

class UserDash extends Component {
  state = {};
  componentDidMount() {
    this.props.borrowed();
  }
  render() {
    return (
      <React.Fragment>
        <UserNav />
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <div className="panel panel-deafault prof-pic-panel">
                <div className="panel-body">
                  <img
                    src="./prof.gif"
                    alt="Profile Picture"
                    className="prof-pic"
                    height="200"
                  />
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="table-responsive">
                <table className="table">
                  <tbody>
                    <tr>
                      <th>First Name:</th>
                      <td>John</td>
                    </tr>
                    <tr>
                      <th>Last Name:</th>
                      <td>John</td>
                    </tr>
                    <tr>
                      <th>Username:</th>
                      <td>John</td>
                    </tr>
                    <tr>
                      <th>Email Address:</th>
                      <td>John</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12">
              <div className="text-center">
                <h1>Borrowed Books</h1>
              </div>
              <div className="table-responsive">
                <table className="table table-hover">
                  <thead className="thead-dark">
                    <th>Book Title</th>
                    <th>Book Author</th>
                    <th>Book ISBN</th>
                    <th>Date Borrowed</th>
                    <th>Date Due</th>
                    <th>Action</th>
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
                          <Button className="btn btn-success">
                            Return Book
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default UserDash;
