import React, { Component } from "react";
import IndexNav from "../navbars/indexnav"
import "../../static/css/form.css"
import axios from "axios";

const url = "http://localhost:5000/api/v1/auth/login";
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  loginUser = () => {
    fetch(url);
  };

  handleSubmit = event => {
    event.preventDefault();
    let axiosConfig = {
      header: {
        "Content-Type": "application/json",
        AccessControlAllowOrigin: "http://localhost:5000/api/v1/auth/login"
      }
    };
    let payload = {
      username: this.state.username,
      password: this.state.password
    };
    axios.post(url, payload, axiosConfig).then(function(res) {
      console.log("----->", res);
    });
  };

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  render() {
    return (
      <React.Fragment>
        <IndexNav/>
        <div className="container">
          <div className="row">
            <div className="col-md-4" />
            <div className="col-md-4">
              <form onSubmit={this.handleSubmit} className="login-form">
                <div className="form-group">
                  <label htmlFor="username">Username</label>
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
