import React, { Component } from "react";
import "../../static/css/main.css";
import IndexNav from "../navbars/indexnav";

/**
 * Applicationshome page component
 */

class Index extends Component {
  render() {
    return (
      <React.Fragment>
        <IndexNav />
        <div className="header">
          <div className="bg-overlay">
            <div className="container">
              <div className="row">
                <div className="col-lg-12">
                  <div className="jumbotron">
                    <h1 className="display-4">Welcome to Hello Books</h1>
                    <p className="lead">
                      A library application that allows you to find and rent
                      your favorite books. We are here to help.
                    </p>
                    <hr className="my-4" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Index;
