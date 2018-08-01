import React, { Component } from 'react';
import Login from "./components/login/login"
import { Router, Route } from "react-router-dom"
import history from "./utils/history";

class App extends Component {
  render() {
    return (
      <div>
        <Router history={history}>
          <div>
            <Route path="/login" component={Login} ></Route>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
