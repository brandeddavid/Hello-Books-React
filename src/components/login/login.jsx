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
        this.setState({ loggedIn: true });
        localStorage.setItem("accessToken", res.accessToken);
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
            <div className="col-md-4" />
            <div className="col-md-4">
              <form onSubmit={this.handleSubmit} className="login-form">
                {this.state.error.Message ? (
                  <div className="error">{this.state.error.Message}</div>
                ) : (
                  ""
                )}
                <div className="form-group">
                  <label htmlFor="username">Username</label>
                  <br />
                  <span className="error">
                    {this.state.error.username ? this.state.error.username : ""}
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
                    {this.state.error.password ? this.state.error.password : ""}
                  </span>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    placeholder="Password"
                    onChange={this.handleChange}
                    name="password"
                    value={this.state.password}
                  />
                </div>
                <button type="submit" className="btn btn-primary">
                  Login
                </button>
              </form>
            </div>
            <div className="col-md-4" />
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Login;
