import React, { Component } from "react";
import IndexNav from "../navbars/indexnav";
import { fetchBooks } from "../../utils/api";
class Library extends Component {
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
      <React.Fragment>
        <IndexNav />
        <div className="container">
          <h1>Book Library</h1>
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
              {this.state.library.map(book => (
                <tr key={book.isbn}>
                  <td>{book.title}</td>
                  <td>{book.author}</td>
                  <td>{book.isbn}</td>
                  <td>{book.publisher}</td>
                  <td>{book.availability ? "Available": "Not Available"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </React.Fragment>
    );
  }
}

export default Library;
