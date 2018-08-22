import React, { Component } from "react";
import { Switch, BrowserRouter as Router, Route, Link } from "react-router-dom";
import AdminNav from "./components/navbars/adminnav";
import IndexNav from "./components/navbars/indexnav";
import Login from "./components/login/login";
import Logout from "./components/logout/logout";
import Index from "./components/index/index";
import Register from "./components/register/register";
import Library from "./components/library/library";
import AdminDash from "./components/dashboards/admin";
import ManageBooks from "./components/admin/manageBooks";
import UserDash from "./components/dashboards/user";
import PrivateRoute from "./utils/privateRoutes";
import history from "./utils/history";
import { fetchBooks, addBook } from "./utils/api";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAdmin: null,
      library: [],
      bookAdded: false,
      error: {}
    };
  }

  getBooks = () => {
    fetchBooks().then(res => {
      res.status === "success"
        ? this.setState({ library: res.books })
        : this.setState({ error: res.error });
    });
  };
  newBook = (event, bookData) => {
    event.preventDefault();
    console.log("=====>", bookData);
    let accessToken = localStorage.getItem("accessToken");
    addBook(bookData, accessToken).then(res => {
      res.status === "success"
        ? this.setState(() => ({
            bookAdded: true,
            library: [...this.state.library, res.book]
          }))
        : this.setState(() => ({ error: res.error }));
    });
  };
  render() {
    return (
      <Router>
        <div>
          <IndexNav />
          <AdminNav />
          <Switch>
            <Route exact path="/" component={Index} />
            <Route
              path="/login"
              render={props => <Login {...props} {...this.state} />}
            />
            <Route path="/register" component={Register} />
            <Route
              path="/library"
              render={props => (
                <Library {...props} {...this.state} getBooks={this.getBooks} />
              )}
            />
            <PrivateRoute path="/admin" component={AdminDash} />
            <PrivateRoute
              path="/managebooks"
              component={ManageBooks}
              {...this.state}
              getBooks={this.getBooks}
              newBook={this.newBook}
              bookAdded={this.state.bookAdded}
              error={this.state.error}
            />
            <PrivateRoute path="/user" component={UserDash} />
            <PrivateRoute path="/logout" component={Logout} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
