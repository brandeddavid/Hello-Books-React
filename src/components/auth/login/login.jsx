import React, { Component } from "react";
import { Redirect, Link } from "react-router-dom";
import IndexNav from "../../navbars/indexnav";
import "./login.css";
import "../../../static/css/forms.css";
import "../../../static/css/main.css";
/**
 * Login component
 */

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: ""
    };
  }
  handleSubmit = event => {
    /**
     * Handles form submission
     */
    event.preventDefault();
    this.props.toggleLoading();
    this.props.logIn(this.state);
  };

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  render() {
    return this.props.loggedIn && !this.props.isAdmin ? (
      <Redirect to="/user" />
    ) : this.props.loggedIn && this.props.isAdmin ? (
      <Redirect to="/admin" />
    ) : (
      <React.Fragment>
        <IndexNav />
        <div className="container">
          <div className="row">
            <div className="col-md-6 login-left text-center">
              <h1>WELCOME AVID READER</h1>
              <p>We are happy to have you here</p>
            </div>
            <div className="col-md-6">
              <div className="login-form">
                <legend>Login</legend>
                <form onSubmit={this.handleSubmit}>
                  {this.props.loginErrors.Message ? (
                    <div className="error">
                      {this.props.loginErrors.Message}
                    </div>
                  ) : (
                    ""
                  )}
                  <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <br />
                    <span className="error">
                      {this.props.loginErrors.username
                        ? this.props.loginErrors.username
                        : ""}
                    </span>
                    <input
                      type="text"
                      className="form-control"
                      id="username"
                      aria-describedby="emailHelp"
                      placeholder="Enter username"
                      onChange={this.handleChange}
                      name="username"
                      value={this.state.username}
                      required={true}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <br />
                    <span className="error">
                      {this.props.loginErrors.password
                        ? this.props.loginErrors.password
                        : ""}
                    </span>
                    <input
                      type="password"
                      className="form-control"
                      id="password"
                      placeholder="Enter password"
                      onChange={this.handleChange}
                      name="password"
                      value={this.state.password}
                      required={true}
                    />
                  </div>
                  <div>
                    {this.props.loading ? (
                      this.props.loader
                    ) : (
                      <button type="submit" className="btn btn-primary">
                        Login
                      </button>
                    )}
                  </div>
                </form>
                <p className="no-account">
                  Don't have an account? <Link to="/register">Register</Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Login;
