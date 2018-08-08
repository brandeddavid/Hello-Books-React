import React, { Component } from "react";
import { Router, Route } from "react-router-dom";
import Login from "./components/login/login";
import Index from "./components/index/index";
import Register from "./components/register/register";
import Library from "./components/library/library";
import AdminDash from "./components/dashboards/admin";
import ManageBooks from "./components/admin/manageBooks";
import AddBook from "./components/admin/addBook";
import UserDash from "./components/dashboards/user";
import PrivateRoute from "./utils/privateRoutes";
import history from "./utils/history";

class App extends Component {
  render() {
    return (
      <div>
        <Router history={history}>
          <div>
            <Route exact path="" component={Index} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <Route path="/library" component={Library} />
            <PrivateRoute path="/admin" component={AdminDash} />
            <PrivateRoute path="/managebooks" component={ManageBooks} />
            <PrivateRoute path="/user" component={UserDash} />
            <PrivateRoute path="/addbook" component={AddBook} />
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
