import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { logoutUser } from "../../utils/api";

class Logout extends Component {
  state = {
    error: {},
    loggedOut: false
  };
  componentDidMount() {
    this.logout();
  }
  logout = () => {
    let accessToken = localStorage.getItem("accessToken");
    console.log("=====>", accessToken);
    localStorage.removeItem("accessToken");
    logoutUser(accessToken).then(res => {
      if (res.status === "success") {
        this.setState(
          () => {
            loggedOut: res.loggedOut;
          },
          () => this.props.history.push("/")
        );
        localStorage.removeItem("accessToken");
      } else {
        this.setState({ error: res.error });
      }
    });
  };
  render() {
    return (
      <div>
        <Redirect to="/login" />
      </div>
    );
  }
}

export default Logout;
