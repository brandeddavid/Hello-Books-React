import React, { Component } from "react";
import UserNav from "../../navbars/usernav";
class BorrowHistory extends Component {
  componentDidMount() {
    this.props.borrowHistory();
  }
  render() {
    return (
      <React.Fragment>
        <UserNav />
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="text-center">
                <hr />
                <h1>Borrow History</h1>
                <hr />
              </div>
              <div className="table-responsive">
                <table className="table table-hover">
                  <thead className="thead-dark">
                    <tr>
                      <th>Book Title</th>
                      <th>Book Author</th>
                      <th>Book ISBN</th>
                      <th>Date Borrowed</th>
                      <th>Date Due</th>
                      <th>Date Returned</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.props.borrowedBooksHistory.map(book => (
                      <tr key={null}>
                        <td>{book.title}</td>
                        <td>{book.author}</td>
                        <td>{book.isbn}</td>
                        <td>{book.borrowDate}</td>
                        <td>{book.dueDate ? book.dueDate : "Returned"}</td>
                        <td>
                          {book.returnDate ? book.returnDate : "Not Returned"}
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

export default BorrowHistory;
