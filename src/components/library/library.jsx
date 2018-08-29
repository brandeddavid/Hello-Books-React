import React, { Component } from "react";
import PropTypes from "prop-types";
import IndexNav from "../navbars/indexnav";

// Stateless Component: Has no state and operates with props only. Easy to follow and test

class Library extends Component {
  componentDidMount() {
    this.props.getBooks();
  }
  render() {
    return (
      <React.Fragment>
        <IndexNav />
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="text-center">
                <hr />
                <h1>Book Library</h1>
                <hr />
              </div>
              <table className="table table-striped">
                <thead className="thead-dark">
                  <tr>
                    <th>Title</th>
                    <th>Author</th>
                    <th>ISBN</th>
                    <th>Publisher</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {this.props.library.map(book => (
                    <tr key={book.isbn}>
                      <td>{book.title}</td>
                      <td>{book.author}</td>
                      <td>{book.isbn}</td>
                      <td>{book.publisher}</td>
                      <td>
                        {book.availability ? "Available" : "Not Available"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

Library.propTypes = {
  library: PropTypes.array.isRequired
};

export default Library;
