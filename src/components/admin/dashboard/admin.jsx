import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { Icon } from "react-icons-kit";
import { book } from "react-icons-kit/icomoon/book";
import { users } from "react-icons-kit/icomoon/users";
import { Link } from "react-router-dom";
import "../../../static/css/admin.css";
import IndexNav from "../../navbars/adminnav";

class AdminDash extends Component {
  render() {
    return (
      <React.Fragment>
        <IndexNav />
        <div className="admin-body">
          <div className="container">
            <div className="admin-panel">
              <div className="row">
                <div className="col-md-2" />
                <div className="col-md-4">
                  <div className="panel panel-default book white-background">
                    <div className="panel-heading">
                      <hr />
                      <div style={{ color: "#261447" }}>
                        <Icon size={100} icon={book} />
                      </div>
                      <hr />
                    </div>
                    <div className="panel-body">
                      <h1 className="text-center admin-panel-link">
                        <Link to="/managebooks">Manage Books</Link>
                      </h1>
                    </div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="panel panel-default book white-background">
                    <div className="panel-heading">
                      <hr />
                      <div style={{ color: "#261447" }}>
                        <Icon size={100} icon={users} />
                      </div>
                      <hr />
                    </div>
                    <div className="panel-body">
                      <h1 className="text-center admin-panel-link">
                        <Link to="/managebooks">Manage Users</Link>
                      </h1>
                    </div>
                  </div>
                </div>
                <div className="col-md-2" />
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default AdminDash;
