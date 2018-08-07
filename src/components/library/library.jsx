import React, { Component } from "react";
import IndexNav from "../navbars/indexnav";
import axios from "axios";

const url = "http://localhost:5000/api/v1/books";
class Library extends Component {
  constructor(props) {
    super(props);
    this.state = {
      library: []
    };
  };
  componentDidMount(){
    this.getBooks();
  }
  getBooks = () => {
    let axiosConfig = {
      header: {
        "Content-Type": "application/json",
        AccessControlAllowOrigin: "*"
      }
    };
    axios
      .get(url, axiosConfig)
      .then(res => {
        this.setState({library: res.data.Books});
      })
      .catch(err => {
        console.log({ Error: err });
      });
  }
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
                <th>Publisher</th>
                <th>ISBN</th>
              </tr>
            </thead>
            <tbody>
              {this.state.library.map(book => (
                <tr key={book.isbn}>
                  <td>{book.title}</td>
                  <td>{book.author}</td>
                  <td>{book.publisher}</td>
                  <td>{book.isbn}</td>
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
