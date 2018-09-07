import React, { Component } from "react";
import { Redirect } from "react-router-dom";
/**
 * Logout component
 */

class Logout extends Component {
  componentDidMount() {
    /**
     * Calls logout function when component mounts
     */
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
