import React, { Component } from "react";
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  FormText
} from "reactstrap";
import UserNav from "../../navbars/usernav";
import "./user.css";

/**
 * User dashboard component
 */

class UserDash extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {}
    };
  }
  componentDidMount() {
    this.props.getUser();
    this.props.borrowed();
    this.setState(() => ({
      user: this.props.user
    }));
  }
  render() {
    return (
      <React.Fragment>
        <UserNav />
        <div className="container">
          <div className="row border border-white rounded profile">
            <div className="col-md-4">
              <div className="prof-pic-div img-responsive border border-white">
                <img
                  src="https://cdn2.iconfinder.com/data/icons/rcons-user/32/male-shadow-circle-512.png"
                  alt="Profile Picture"
                  className="prof-pic"
                />
              </div>
            </div>
            <div className="col-md-4">
              <Form>
                <FormGroup>
                  <Label for="exampleFirstName">First Name</Label>
                  <Input
                    type="text"
                    name="firstName"
                    id="examplefirstName"
                    placeholder="First Name"
                    value={this.props.user.firstName}
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="exampleFirstName">Last Name</Label>
                  <Input
                    type="text"
                    name="lastName"
                    id="examplelastName"
                    placeholder="Last Name"
                    value={this.props.user.lastName}
                  />
                </FormGroup>
              </Form>
            </div>
            <div className="col-md-4">
              <Form>
                <FormGroup>
                  <Label for="exampleEmail">Username</Label>
                  <Input
                    type="text"
                    name="username"
                    id="exampleUsername"
                    placeholder="Username"
                    value={this.props.user.username}
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="exampleEmail">Email</Label>
                  <Input
                    type="email"
                    name="email"
                    id="exampleEmail"
                    placeholder="Email"
                    value={this.props.user.email}
                    readOnly
                  />
                </FormGroup>
              </Form>
              <Button outline color="primary">
                Edit Profile
              </Button>{" "}
              <Button outline color="primary">
                Reset Password
              </Button>{" "}
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12">
              <div className="text-center">
                <hr />
                <h1>Borrowed Books</h1>
                <hr />
              </div>
              {this.props.loading ? (
                this.props.loader
              ) : this.props.borrowedBooks.length === 0 ? (
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
