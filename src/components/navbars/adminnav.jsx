import React, { Component } from "react";

class AdminNav extends Component {
  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top index-nav">
        <a className="navbar-brand" href="/admin">
          Hello Books
        </a>
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
              <a className="nav-link" href="/admin">
                Home <span className="sr-only">(current)</span>
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/managebooks">
                Manage Books
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="">
                Manage Users
              </a>
            </li>
          </ul>
        </div>

        <div>
          <ul className="nav">
            <li className="nav-item">
              <a className="nav-link" href="">
                Log Out
              </a>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

export default AdminNav;
