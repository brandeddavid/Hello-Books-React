import React, { Component } from "react";
import { Switch, BrowserRouter as Router, Route } from "react-router-dom";
import AdminNav from "./components/navbars/adminnav";
import IndexNav from "./components/navbars/indexnav";
import Login from "./components/auth/login/login";
import Logout from "./components/auth/logout/logout";
import Index from "./components/index/index";
import Register from "./components/auth/register/register";
import Library from "./components/library/library";
import AdminDash from "./components/admin/dashboard/admin";
import ManageBooks from "./components/admin/managebooks/manageBooks";
import UserDash from "./components/user/dashboard/user";
import PrivateRoute from "./utils/privateRoutes";
import history from "./utils/history";
import { fetchBooks, addBook, editBook } from "./utils/api";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAdmin: null,
      library: [],
      renderModal: false,
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

  toggleModal = () => {
    this.setState({ renderModal: !this.state.renderModal });
  };

  newBook = (event, bookData) => {
    event.preventDefault();
    let accessToken = localStorage.getItem("accessToken");
    addBook(bookData, accessToken).then(res => {
      res.status === "success"
        ? this.setState(() => ({
            library: [...this.state.library, res.book],
            renderModal: false
          }))
        : this.setState(() => ({ error: res.error }));
    });
  };

  updateBook = (event, bookId, bookData) => {
    event.preventDefault();
    let accessToken = localStorage.getItem("accessToken");
    return editBook(bookData, bookId, accessToken).then(res => {
      res.status === "success"
        ? this.setState(() => ({
            library: [...this.state.library, res.book],
            renderModal: false
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
              toggleModal={this.toggleModal}
              newBook={this.newBook}
              updateBook={this.updateBook}
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
