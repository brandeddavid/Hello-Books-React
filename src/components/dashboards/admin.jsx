import React, { Component } from "react";
import "../../static/css/admin.css";
import IndexNav from "../navbars/adminnav";

class AdminDash extends Component {
  state = {};
  render() {
    return (
      <React.Fragment>
        <IndexNav />
        <div className="admin-body">
          <div className="container">
            <div className="admin-panel">
              <div className="row">
                <div className="col-md-4">
                  <div className="panel panel-default book white-background">
                    <div className="panel-heading">
                      <hr />
                      <h3>
                        <i className="fas fa-book fa-3x" />
                      </h3>
                      <hr />
                    </div>
                    <div className="panel-body">
                      <h1 className="text-center admin-panel-link">
                        <a href="/managebooks">Manage Books</a>
                      </h1>
                    </div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="panel panel-default book white-background">
                    <div className="panel-heading">
                      <hr />
                      <h3>
                        <i className="fas fa-user fa-3x" />
                      </h3>
                      <hr />
                    </div>
                    <div className="panel-body">
                      <h1 className="text-center admin-panel-link">
                        <a href="#">Manage Users</a>
                      </h1>
                    </div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="panel panel-default book white-background">
                    <div className="panel-heading">
                      <hr />
                      <h3>
                        <i className="fas fa-retweet fa-3x" />
                      </h3>
                      <hr />
                    </div>
                    <div className="panel-body">
                      <h1 className="text-center admin-panel-link">
                        <a href="#">Authorize Return</a>
                      </h1>
                    </div>
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

export default AdminDash;
