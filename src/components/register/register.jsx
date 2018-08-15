import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import IndexNav from "../navbars/indexnav";
import "../../static/css/forms.css";
import "../../static/css/main.css";
import { registerUser } from "../../utils/api";

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      first_name: "",
      last_name: "",
      email: "",
      username: "",
      password: "",
      confirm_password: "",
      registered: false,
      error: {}
    };
  }
  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };
  handleSubmit = event => {
    event.preventDefault();
    registerUser(this.state).then(res => {
      res.status === "success"
        ? this.setState({ registered: res.registered })
        : this.setState({ error: res.error });
    });
  };
  render() {
    return this.state.registered ? (
      <Redirect to="/login" />
    ) : (
      <React.Fragment>
        <IndexNav />
        <div className="container">
          <div className="row">
            <div className="col-md-6" />
            <div className="col-md-6">
              <div className="registration-form">
                <legend>Register</legend>
                <form onSubmit={this.handleSubmit}>
                  <div className="error">
                    {this.state.error.Message ? this.state.error.Message : ""}
                  </div>
                  <div className="form-group">
                    <label htmlFor="first_name">First Name</label>
                    <div className="error">
                      {this.state.error.first_name
                        ? this.state.error.first_name
                        : ""}
                    </div>
                    <input
                      type="text"
                      className="form-control"
                      id="first_name"
                      placeholder="Enter First Name"
                      onChange={this.handleChange}
                      name="first_name"
                      value={this.state.first_name}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="last_name">Last Name</label>
                    <div className="error">
                      {this.state.error.last_name
                        ? this.state.error.last_name
                        : ""}
                    </div>
                    <input
                      type="text"
                      className="form-control"
                      id="last_name"
                      placeholder="Enter Last Name"
                      onChange={this.handleChange}
                      name="last_name"
                      value={this.state.last_name}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <div className="error">
                      {this.state.error.email ? this.state.error.email : ""}
                    </div>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      placeholder="Enter Email"
                      onChange={this.handleChange}
                      name="email"
                      value={this.state.email}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <div className="error">
                      {this.state.error.username
                        ? this.state.error.username
                        : ""}
                    </div>
                    <input
                      type="text"
                      className="form-control"
                      id="username"
                      placeholder="Enter Username"
                      onChange={this.handleChange}
                      name="username"
                      value={this.state.username}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <div className="error">
                      {this.state.error.password
                        ? this.state.error.password
                        : ""}
                    </div>
                    <input
                      type="password"
                      className="form-control"
                      id="password"
                      placeholder="Enter Password"
                      onChange={this.handleChange}
                      name="password"
                      value={this.state.password}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="confirm_password">Confirm Password</label>
                    <div className="error">
                      {this.state.error.confirm_password
                        ? this.state.error.confirm_password
                        : ""}
                    </div>
                    <input
                      type="password"
                      className="form-control"
                      id="confirm_password"
                      placeholder="Confirm Password"
                      onChange={this.handleChange}
                      name="confirm_password"
                      value={this.state.confirm_password}
                    />
                  </div>
                  <button type="submit" className="btn btn-primary">
                    Register
                  </button>
                </form>
                <p className="member-already">Already a member? <a href="/login">Log in</a></p>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Register;
