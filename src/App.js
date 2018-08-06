import React, { Component } from "react";
import Login from "./components/login/login";
import Index from "./components/index/index";
import Register from "./components/register/register";
import Library from "./components/library/library";
import AdminDash from "./components/dashboards/admin";
import UserDash from "./components/dashboards/user";
import { Router, Route } from "react-router-dom";
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
            <Route path="/admin" component={AdminDash} />
            <Route path="/user" component={UserDash} />
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
