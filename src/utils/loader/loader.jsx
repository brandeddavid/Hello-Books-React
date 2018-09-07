import React, { Component } from "react";

/**
 * Application loader component
 */

class Loader extends Component {
  render() {
    return (
      <div className="text-center">
        <img src="https://mir-s3-cdn-cf.behance.net/project_modules/disp/35771931234507.564a1d2403b3a.gif" alt="Loading..." height="50px"/>
      </div>
    );
  }
}

export default Loader;
