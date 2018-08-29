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
import BorrowHistory from "./components/user/history/borrowHistory";
import Borrow from "./components/user/borrow/borrow";
import PrivateRoute from "./utils/privateRoutes";
import history from "./utils/history";
import {
  fetchBooks,
  addBook,
  editBook,
  removeBook,
  loginUser,
  borrow,
  notReturned,
  returnABook,
  borrowingHistory
} from "./utils/api";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      loggedIn: false,
      isAdmin: null,
      library: [],
      renderModal: false,
      renderDeleteAlert: false,
      error: {},
      borrowedBooks: [],
      borrowedBooksHistory: []
    };
  }

  logIn = loginData => {
    loginUser(loginData).then(res => {
      if (res.status === "success") {
        localStorage.setItem("accessToken", res.accessToken);
        // set state is an asynchronous function
        // Pass function to make it deterministic
        this.setState(() => ({
          loggedIn: true,
          isAdmin: res.user.is_admin,
          user: res.user
        }));
      } else {
        this.setState(() => ({ error: res.error }));
      }
    });
  };

  logOut = () => {
    localStorage.removeItem("accessToken");
    this.setState(() => ({
      loggedIn: false,
      isAdmin: null
    }));
  };

  getBooks = () => {
    fetchBooks().then(res => {
      res.status === "success"
        ? this.setState({ library: res.books })
        : this.setState({ error: res.error });
    });
  };

  toggleModal = () => {
    this.setState(() => ({ renderModal: !this.state.renderModal }));
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
        ? this.setState(() => {
            const library = this.state.library.map(book => {
              if (book.id === res.book.id) {
                return res.book;
              }
              return book;
            });
            return { renderModal: false, library };
          })
        : this.setState(() => ({ error: res.error }));
    });
  };

  deleteBook = (event, bookId) => {
    event.preventDefault();
    let accessToken = localStorage.getItem("accessToken");
    removeBook(bookId, accessToken).then(res => {
      res.status === "success"
        ? this.setState(() => {
            const library = this.state.library.filter(
              book => book.id !== bookId
            );
            return { renderDeleteAlert: false, library };
          })
        : this.setState(() => ({
            error: res.error
          }));
    });
  };

  toggleDeleteAlert = () => {
    this.setState(() => ({
      renderDeleteAlert: !this.state.renderDeleteAlert
    }));
  };

  borrowBook = (event, bookId) => {
    event.preventDefault();
    let accessToken = localStorage.getItem("accessToken");
    return borrow(bookId, accessToken).then(res => {
      res.status === "success"
        ? this.setState(() => {
            const library = this.state.library.map(book => {
              if (book.id === res.book.id) {
                return res.book;
              }
              return book;
            });
            return { library };
          })
        : this.setState(() => ({ error: res.error }));
    });
  };

  borrowed = () => {
    let accessToken = localStorage.getItem("accessToken");
    notReturned(accessToken).then(res => {
      res.status === "success"
        ? this.setState(() => ({
            borrowedBooks: res.borrowedBooks
          }))
        : this.setState(() => ({ error: res.error }));
    });
  };

  returnBook = (event, bookId) => {
    event.preventDefault();
    let accessToken = localStorage.getItem("accessToken");
    return returnABook(bookId, accessToken).then(res => {
      res.status === "success"
        ? this.setState(() => {
            const borrowedBooks = this.state.borrowedBooks.filter(
              book => book.id !== bookId
            );
            return { borrowedBooks };
          })
        : this.setState(() => ({ error: res.error }));
    });
  };

  borrowHistory = () => {
    let accessToken = localStorage.getItem("accessToken");
    borrowingHistory(accessToken).then(res => {
      console.log(res);
      res.status === "success"
        ? this.setState(() => ({
            borrowedBooksHistory: res.history
          }))
        : this.setState(() => ({
            error: res.error
          }));
    });
  };

  render() {
    return (
      <Router>
        <div>
          {/* {this.state.loggedIn ? <IndexNav /> : <AdminNav />} */}
          <Switch>
            <Route exact path="/" component={Index} />
            <Route
              path="/login"
              render={props => (
                <Login {...props} {...this.state} logIn={this.logIn} />
              )}
            />
            <Route path="/register" component={Register} />
            <Route
              path="/library"
              render={props => (
                <Library {...props} {...this.state} getBooks={this.getBooks} />
              )}
            />
            <PrivateRoute path="/admin" component={AdminDash} {...this.state} />
            <PrivateRoute
              path="/managebooks"
              component={ManageBooks}
              {...this.state}
              getBooks={this.getBooks}
              toggleModal={this.toggleModal}
              newBook={this.newBook}
              updateBook={this.updateBook}
              error={this.state.error}
              toggleDeleteAlert={this.toggleDeleteAlert}
              deleteBook={this.deleteBook}
            />
            <PrivateRoute
              path="/user"
              component={UserDash}
              {...this.state}
              borrowed={this.borrowed}
              borrowedBooks={this.state.borrowedBooks}
              returnBook={this.returnBook}
            />
            <PrivateRoute
              path="/borrow"
              component={Borrow}
              {...this.state}
              getBooks={this.getBooks}
              borrowBook={this.borrowBook}
            />
            <PrivateRoute
              path="/history"
              component={BorrowHistory}
              {...this.state}
              borrowHistory={this.borrowHistory}
            />
            <PrivateRoute
              path="/logout"
              component={Logout}
              logOut={this.logOut}
            />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
