import React, { Component } from "react";
import { Redirect } from "react-router-dom";

class Logout extends Component {
  componentDidMount() {
    this.props.logOut();
  }
  render() {
    return (
      <div>
        <Redirect to="/login" />
      </div>
    );
  }
}

export default Logout;
