import React, { Component } from "react";
import PropTypes from "prop-types";
import UserNav from "../../navbars/usernav";
import { Button, Badge } from "reactstrap";

/**
 * Borrow books component
 */

class Borrow extends Component {
  componentDidMount() {
    /**
     * Gets all books on component mount
     */
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
                      <tr key={book.id} className="book">
                        <td>{book.title}</td>
                        <td>{book.author}</td>
                        <td>{book.isbn}</td>
                        <td>{book.publisher}</td>
                        <td>{book.quantity}</td>
                        <td>
                          {book.quantity === 0 ? (
                            <Badge color="danger">Not Available</Badge>
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
              {this.props.scrolling ? this.props.loader : ""}
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
