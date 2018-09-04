import React, { Component } from "react";
import PropTypes from "prop-types";
import UserNav from "../../navbars/usernav";
import { Button } from "reactstrap";

class Borrow extends Component {
  componentDidMount() {
    this.props.getBooks();
  }
  render() {
    return (
      <React.Fragment>
        <UserNav />
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="text-center">
                <hr />
                <h1>Book Library</h1>
                <hr />
              </div>
              {this.props.loading ? (
                this.props.loader
              ) : (
                <table className="table table-striped">
                  <thead className="thead-dark">
                    <tr>
                      <th>Title</th>
                      <th>Author</th>
                      <th>ISBN</th>
                      <th>Publisher</th>
                      <th>Copies</th>
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
                        <td>
                          {book.quantity === 0 ? (
                            "Not Available"
                          ) : (
                            <Button
                              className="btn btn-success"
                              onClick={event =>
                                this.props.borrowBook(event, book.id)
                              }
                            >
                              Borrow
                            </Button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

Borrow.propTypes = {
  library: PropTypes.array.isRequired
};

export default Borrow;
