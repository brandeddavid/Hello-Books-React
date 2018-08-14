import React, { Component } from "react";
import { logoutUser } from "../../utils/api";

class Logout extends Component {
  state = {
    error: {},
    loggedOut: false
  };
  logout = () => {
    let accessToken = localStorage.getItem("accessToken");
    localStorage.removeItem("accessToken");
    logoutUser(accessToken).then(res => {
      if (res.status === "success") {
        this.setState({ loggedOut: res.loggedOut });
      } else {
        this.setState({ error: res.error });
      }
    });
  };
  render() {
    return (
      <div className="container">
        {this.state.loggedOut
          ? console.log("Logged Out")
          : console.log("Error =====>", this.state.error)}
        <p>You have been logged out</p>
      </div>
    );
  }
}

export default Logout;
