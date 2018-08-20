import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import IndexNav from "../navbars/indexnav";
import "../../static/css/forms.css";
import "../../static/css/main.css";
import { loginUser } from "../../utils/api";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      loggedIn: false,
      error: {},
      admin: true
    };
  }
  handleSubmit = event => {
    event.preventDefault();
    loginUser(this.state).then(res => {
      if (res.status === "success") {
        localStorage.setItem("accessToken", res.accessToken);
        // set state is an asynchronous function
        // Pass function to make it deterministic
        this.setState(() => ({ loggedIn: true }));
        // () => this.props.history.push("/admin")
      } else {
        this.setState({ error: res.error });
      }
    });
  };

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  render() {
    return this.state.loggedIn && !this.state.admin ? (
      <Redirect to="/user" />
    ) : this.state.loggedIn && this.state.admin ? (
      <Redirect to="/admin" />
    ) : (
      <React.Fragment>
        <IndexNav />
        <div className="container">
          <div className="row">
            <div className="col-md-6 login-left" />
            <div className="col-md-6">
              <div className="login-form">
                <legend>Login</legend>
                <form onSubmit={this.handleSubmit}>
                  {this.state.error.Message ? (
                    <div className="error">{this.state.error.Message}</div>
                  ) : (
                    ""
                  )}
                  <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <br />
                    <span className="error">
                      {this.state.error.username
                        ? this.state.error.username
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
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <br />
                    <span className="error">
                      {this.state.error.password
                        ? this.state.error.password
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
                    />
                  </div>
                  <button type="submit" className="btn btn-primary">
                    Login
                  </button>
                </form>
                <p className="no-account">
                  Don't have an account? <a href="/register">Register</a>
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
