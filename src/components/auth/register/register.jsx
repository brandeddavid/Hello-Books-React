import React, { Component } from "react";
import { Redirect, Link } from "react-router-dom";
import IndexNav from "../../navbars/indexnav";
import "../../../static/css/forms.css";
import "../../../static/css/main.css";
import "./register.css";
import { registerUser } from "../../../utils/api";

/**
 * User registration component
 */

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      first_name: "",
      last_name: "",
      email: "",
      username: "",
      password: "",
      confirm_password: ""
    };
  }
  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };
  handleSubmit = event => {
    /**
     * Submits form content
     */
    event.preventDefault();
    this.props.toggleLoading();
    this.props.register(this.state);
  };
  render() {
    return this.props.registered ? (
      <Redirect to="/login" />
    ) : (
      <React.Fragment>
        <IndexNav />
        <div className="container">
          <div className="row">
            <div className="col-md-6 register-left text-center">
              <h1>WELCOME AVID READER</h1>
              <p>We are happy to have you here</p>
            </div>
            <div className="col-md-6">
              <div className="registration-form">
                <legend>Register</legend>
                <form onSubmit={this.handleSubmit}>
                  <div className="error">
                    {this.props.regErrors.Message
                      ? this.props.regErrors.Message
                      : ""}
                  </div>
                  <div className="form-group">
                    <label htmlFor="first_name">First Name</label>
                    <div className="error">
                      {this.props.regErrors.first_name
                        ? this.props.regErrors.first_name
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
                      required={true}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="last_name">Last Name</label>
                    <div className="error">
                      {this.props.regErrors.last_name
                        ? this.props.regErrors.last_name
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
                      required={true}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <div className="error">
                      {this.props.regErrors.email ? "Invalid Email" : ""}
                    </div>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      placeholder="Enter Email"
                      onChange={this.handleChange}
                      name="email"
                      value={this.state.email}
                      required={true}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <div className="error">
                      {this.props.regErrors.username
                        ? this.props.regErrors.username
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
                      required={true}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <div className="error">
                      {this.props.regErrors.password
                        ? this.props.regErrors.password
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
                      required={true}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="confirm_password">Confirm Password</label>
                    <div className="error">
                      {this.props.regErrors.confirm_password
                        ? this.props.regErrors.confirm_password
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
                      required={true}
                    />
                  </div>
                  <div>
                    {this.props.loading ? (
                      this.props.loader
                    ) : (
                      <button type="submit" className="btn btn-primary">
                        Register
                      </button>
                    )}
                  </div>
                </form>
                <p className="member-already">
                  Already a member? <Link to="/login">Log in</Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Register;
