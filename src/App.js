import React, { Component } from "react";
import { Switch, BrowserRouter as Router, Route } from "react-router-dom";
import swal from "sweetalert";
import AdminNav from "./components/navbars/adminnav";
import IndexNav from "./components/navbars/indexnav";
import Login from "./components/auth/login/login";
import Loader from "./utils/loader/loader";
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
  registerUser,
  fetchBooks,
  addBook,
  editBook,
  removeBook,
  loginUser,
  fetchUser,
  borrow,
  notReturned,
  returnABook,
  borrowingHistory
} from "./utils/api";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      error: {},
      loginErrors: {},
      regErrors: {},
      bookErrors: {},
      deleteBookErrors: {},
      user: {},
      loggedIn: false,
      registered: false,
      isAdmin: null,
      library: [],
      renderModal: false,
      renderDeleteAlert: false,
      borrowedBooks: [],
      borrowedBooksHistory: []
    };
  }

  noErrors = () => {
    this.setState(() => ({
      error: {},
      regErrors: {},
      loginErrors: {}
    }));
  };

  toggleLoading = () => {
    this.setState(() => ({ loading: !this.state.loading }));
  };

  getUser = () => {
    let accessToken = localStorage.getItem("accessToken");
    fetchUser(accessToken).then(res => {
      this.setState(() => ({ user: res.user }));
    });
  };

  register = regData => {
    registerUser(regData).then(res => {
      if (res.status === "success") {
        this.setState(() => ({
          registered: true,
          regErrors: {},
          loading: false
        }));
        swal("Registration successful", "", "success");
      } else {
        this.setState(() => ({ regErrors: res.error, loading: false }));
      }
    });
  };

  logIn = loginData => {
    loginUser(loginData).then(res => {
      if (res.status === "success") {
        localStorage.setItem("accessToken", res.accessToken);
        // set state is an asynchronous function
        // Pass function to make it deterministic
        this.setState(() => ({
          loggedIn: true,
          isAdmin: res.user.is_admin,
          loading: false
        }));
        swal("Logged In Successfully", { buttons: false, timer: 1000 });
      } else {
        this.setState(() => ({ loginErrors: res.error, loading: false }));
      }
    });
  };

  logOut = () => {
    localStorage.removeItem("accessToken");
    this.setState(() => ({
      loggedIn: false,
      isAdmin: null,
      user: {}
    }));
  };

  getBooks = () => {
    this.toggleLoading();
    fetchBooks().then(res => {
      res.status === "success"
        ? this.setState({ library: res.books, loading: false, error: {} })
        : this.setState({ error: res.error, loading: false });
    });
  };

  toggleModal = () => {
    this.setState(() => ({ renderModal: !this.state.renderModal }));
  };

  newBook = (event, bookData) => {
    event.preventDefault();
    this.toggleLoading();
    let accessToken = localStorage.getItem("accessToken");
    addBook(bookData, accessToken).then(res => {
      if (res.status === "success") {
        this.setState(() => ({
          library: [...this.state.library, res.book],
          renderModal: false,
          loading: false,
          bookErrors: {},
          error: {}
        }));
        swal(`Added ${res.book.title}`, { buttons: false, timer: 3000 });
      } else {
        this.setState(() => ({ bookErrors: res.error, loading: false }));
      }
    });
  };

  updateBook = (event, bookId, bookData) => {
    event.preventDefault();
    this.toggleLoading();
    let accessToken = localStorage.getItem("accessToken");
    return editBook(bookData, bookId, accessToken).then(res => {
      if (res.status === "success") {
        this.setState(() => {
          const library = this.state.library.map(book => {
            if (book.id === res.book.id) {
              return res.book;
            }
            return book;
          });
          return {
            renderModal: false,
            library,
            loading: false,
            bookErrors: {}
          };
        });
        swal(`Updated ${res.book.title}`, { buttons: false, timer: 3000 });
      } else {
        this.setState(prevState => ({ bookErrors: res.error, loading: false }));
      }
    });
  };

  deleteBook = (event, bookId) => {
    event.preventDefault();
    this.toggleLoading();
    let accessToken = localStorage.getItem("accessToken");
    removeBook(bookId, accessToken).then(res => {
      if (res.status === "success") {
        this.setState(() => {
          const library = this.state.library.filter(book => book.id !== bookId);
          return {
            renderDeleteAlert: false,
            library,
            deleteBookErrors: {},
            loading: false
          };
        });
        swal("Book deleted successfully", { buttons: false, timer: 3000 });
      } else {
        this.setState(() => ({
          deleteBookErrors: res.error,
          loading: false
        }));
      }
    });
  };

  toggleDeleteAlert = () => {
    this.setState(() => ({
      renderDeleteAlert: !this.state.renderDeleteAlert
    }));
  };

  borrowBook = (event, bookId) => {
    event.preventDefault();
    this.toggleLoading();
    let accessToken = localStorage.getItem("accessToken");
    return borrow(bookId, accessToken).then(res => {
      if (res.status === "success") {
        this.setState(() => {
          const library = this.state.library.map(book => {
            if (book.id === res.book.id) {
              return res.book;
            }
            return book;
          });
          return { library, loading: false };
        });
        swal(`Borrowed ${res.book.title}`, { buttons: false, timer: 3000 });
      } else {
        this.setState(() => ({ loading: false }));
        swal(`${res.error.Message}`, "", "warning");
      }
    });
  };

  borrowed = () => {
    let accessToken = localStorage.getItem("accessToken");
    this.toggleLoading();
    notReturned(accessToken).then(res => {
      res.status === "success"
        ? this.setState(() => ({
            borrowedBooks: res.borrowedBooks,
            loading: false
          }))
        : this.setState(() => ({ error: res.error, loading: false }));
    });
  };

  returnBook = (event, bookId) => {
    event.preventDefault();
    this.toggleLoading();
    let accessToken = localStorage.getItem("accessToken");
    return returnABook(bookId, accessToken).then(res => {
      if (res.status === "success") {
        this.setState(() => {
          const borrowedBooks = this.state.borrowedBooks.filter(
            book => book.id !== bookId
          );
          return { borrowedBooks, loading: false };
        });
        swal("Returned successfully", { buttons: false, timer: 3000 });
      } else {
        this.setState(() => ({ loading: false }));
        swal(`${res.error.Message}`, "", "warning");
      }
    });
  };

  borrowHistory = () => {
    let accessToken = localStorage.getItem("accessToken");
    this.toggleLoading();
    borrowingHistory(accessToken).then(res => {
      res.status === "success"
        ? this.setState(() => ({
            borrowedBooksHistory: res.history,
            loading: false
          }))
        : this.setState(() => ({
            error: res.error,
            loading: false
          }));
    });
  };

  render() {
    return (
      <Router>
        <div>
          <Switch>
            <Route exact path="/" component={Index} />
            <Route path="/loader" component={Loader} />
            <Route
              path="/login"
              render={props => (
                <Login
                  {...props}
                  loginErrors={this.state.loginErrors}
                  loggedIn={this.state.loggedIn}
                  isAdmin={this.state.isAdmin}
                  logIn={this.logIn}
                  toggleLoading={this.toggleLoading}
                  loader={<Loader />}
                  loading={this.state.loading}
                />
              )}
            />
            <Route
              path="/register"
              render={props => (
                <Register
                  {...props}
                  noErrors={this.noErrors}
                  register={this.register}
                  registered={this.state.registered}
                  regErrors={this.state.regErrors}
                  toggleLoading={this.toggleLoading}
                  loading={this.state.loading}
                  loader={<Loader />}
                />
              )}
            />
            <Route
              path="/library"
              render={props => (
                <Library
                  {...props}
                  {...this.state}
                  getBooks={this.getBooks}
                  loader={<Loader />}
                  loading={this.state.loading}
                />
              )}
            />
            <PrivateRoute path="/admin" component={AdminDash} {...this.state} />
            <PrivateRoute
              path="/managebooks"
              renderModal={this.state.renderModal}
              renderDeleteAlert={this.state.renderDeleteAlert}
              library={this.state.library}
              component={ManageBooks}
              getBooks={this.getBooks}
              toggleModal={this.toggleModal}
              newBook={this.newBook}
              updateBook={this.updateBook}
              bookErrors={this.state.bookErrors}
              deleteBookErrors={this.state.deleteBookErrors}
              toggleDeleteAlert={this.toggleDeleteAlert}
              deleteBook={this.deleteBook}
              loader={<Loader />}
              loading={this.state.loading}
            />
            <PrivateRoute
              path="/user"
              component={UserDash}
              user={this.state.user}
              borrowed={this.borrowed}
              getUser={this.getUser}
              borrowedBooks={this.state.borrowedBooks}
              returnBook={this.returnBook}
              loader={<Loader />}
              loading={this.state.loading}
            />
            <PrivateRoute
              path="/borrow"
              component={Borrow}
              {...this.state}
              getBooks={this.getBooks}
              borrowBook={this.borrowBook}
              loading={this.state.loading}
              loader={<Loader />}
            />
            <PrivateRoute
              path="/history"
              component={BorrowHistory}
              {...this.state}
              borrowHistory={this.borrowHistory}
              loading={this.state.loading}
              loader={<Loader />}
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
