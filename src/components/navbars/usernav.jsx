import React, { Component } from "react";
import { Link } from "react-router-dom";
/**
 * User nav component
 */

class UserNav extends Component {
  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top index-nav">
        <Link className="navbar-brand" to="/user">
          Hello Books
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div className="collapse navbar-collapse" id="">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
              <Link className="nav-link" to="/user">
                Home <span className="sr-only">(current)</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/borrow">
                Borrow Books
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/history">
                Borrowing History
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <ul className="nav">
            <li className="nav-item">
              <Link className="nav-link" to="/logout">
                Log Out
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

export default UserNav;
