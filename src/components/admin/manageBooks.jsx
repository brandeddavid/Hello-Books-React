import React, { Component } from "react";
import { fetchBooks } from "../../utils/api";

class ManageBooks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      library: [],
      error: {}
    };
  }
  componentDidMount() {
    this.getBooks();
  }
  getBooks = () => {
    fetchBooks().then(res => {
      res.status === "success"
        ? this.setState({ library: res.books })
        : this.setState({ error: res.error });
    });
  };
  render() {
    return (
      <div className="container">
        <div>
          <a href="/addbook">
            <button className="btn btn-lg btn-success add-book-btn">
              Add Book
            </button>
          </a>
        </div>
        {this.state.error ? <span>{this.state.error.Message}</span> : ""}
        <div className="table-responsive">
          <table className="table table-striped table-hover">
            <thead className="thead-dark">
              <tr>
                <th>Title</th>
                <th>Author</th>
                <th>ISBN</th>
                <th>Publisher</th>
                <th>Quantity</th>
                <th />
                <th />
              </tr>
            </thead>
            <tbody>
              {this.state.library.map(book => (
                <tr key={book.isbn}>
                  <td>{book.title}</td>
                  <td>{book.author}</td>
                  <td>{book.isbn}</td>
                  <td>{book.publisher}</td>
                  <td>{book.availability ? "Available" : "Not Available"}</td>
                  <td className="text-center">
                    <button className="btn btn-primary">Edit</button>
                  </td>
                  <td className="text-center">
                    <button className="btn btn-danger">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default ManageBooks;
