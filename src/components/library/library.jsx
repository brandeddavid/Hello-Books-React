import React, { Component } from "react";
import PropTypes from "prop-types";
import IndexNav from "../navbars/indexnav";
import "./library.css";
import { Input, Badge } from "reactstrap";

/**
 * Library component
 * Displays all books before user log in
 */

// Stateless Component: Has no state and operates with props only. Easy to follow and test

class Library extends Component {
  componentDidMount() {
    this.props.getBooks();
    this.scrollListener = window.addEventListener("scroll", event => {
      this.handleScroll(event);
    });
  }

  handleScroll = () => {
    const { scrolling, totalPages, page } = this.props;
    if (scrolling) return;
    if (totalPages <= page) return;
    const lastTr = document.querySelector("tr.book > td:last-child");
    const lastTrOffset = lastTr.offsetTop + lastTr.clientHeight;
    const pageOffset = window.pageYOffset + window.innerHeight;
    var bottomOffset = 20;
    if (pageOffset > lastTrOffset - bottomOffset) this.props.loadMore();
  };
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
              <div className="row">
                <div className="col-md-4" />
                <div className="col-md-4" />
                <div className="col-md-4">
                  <Input
                    name="search"
                    type="text"
                    placeholder="Search..."
                    className="search"
                  />
                </div>
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
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.props.library.map(book => (
                      <tr key={book.isbn} className="book">
                        <td>{book.title}</td>
                        <td>{book.author}</td>
                        <td>{book.isbn}</td>
                        <td>{book.publisher}</td>
                        <td>
                          {book.availability ? <Badge color="success">Available</Badge> : <Badge color="danger">Not Available</Badge>}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
              {this.props.scrolling ? this.props.loader : ""}
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

Library.propTypes = {
  library: PropTypes.array.isRequired,
  loading: PropTypes.bool
};

export default Library;
