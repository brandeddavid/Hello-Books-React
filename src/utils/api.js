import axios from "axios";

const errorHandler = error => {
  const err = error.response ? error.response.data : { Message: error.message };
  return { status: "failure", error: err };
};

const baseURL = "https://banana-pie-71385.herokuapp.com/api/v1";
let axiosConfig = {
  headers: {
    "Content-Type": "application/json",
    AccessControlAllowOrigin: "*"
  }
};

export const registerUser = userData => {
  let url = `${baseURL}/auth/register`;
  let payload = {
    first_name: userData.first_name,
    last_name: userData.last_name,
    email: userData.email,
    username: userData.username,
    password: userData.password,
    confirm_password: userData.confirm_password
  };
  return axios
    .post(url, payload, axiosConfig)
    .then(res => {
      return { status: "success", registered: true };
    })
    .catch(error => {
      return { status: "failure", error: error.response.data };
    });
};

export const loginUser = userData => {
  let url = `${baseURL}/auth/login`;
  let payload = {
    username: userData.username,
    password: userData.password
  };
  return axios
    .post(url, payload, axiosConfig)
    .then(res => {
      return {
        status: "success",
        accessToken: res.data.Token,
        user: res.data.User
      };
    })
    .catch(error => {
      return { status: "failure", error: error.response.data };
    });
};

export const fetchUser = accessToken => {
  let url = `${baseURL}/user`;
  let axiosConfigAuth = {
    headers: {
      "Content-Type": "application/json",
      AccessControlAllowOrigin: "*",
      Authorization: "Bearer " + accessToken
    }
  };
  return axios.get(url, axiosConfigAuth).then(res => {
    return { user: res.data.User };
  });
};

export const logoutUser = accessToken => {
  let url = `${baseURL}/auth/logout`;
  let axiosConfigAuth = {
    headers: {
      "Content-Type": "application/json",
      AccessControlAllowOrigin: "*",
      Authorization: "Bearer " + accessToken
    }
  };
  return axios
    .post(url, axiosConfigAuth)
    .then(res => {
      console.log("========>", res);
      return { status: true, loggedOut: true };
    })
    .catch(error => {
      return { status: "failure", error: error.response.data };
    });
};

export const fetchBooks = () => {
  let url = `${baseURL}/books`;
  return axios
    .get(url, axiosConfig)
    .then(res => {
      return { status: "success", books: res.data.Books };
    })
    .catch(error => {
      return { status: "failure", error: error.response.data };
    });
};

export const addBook = (bookData, accessToken) => {
  let url = `${baseURL}/books`;
  let payload = {
    title: bookData.title,
    author: bookData.author,
    isbn: bookData.isbn,
    publisher: bookData.publisher,
    quantity: bookData.quantity
  };
  let axiosConfigAuth = {
    headers: {
      "Content-Type": "application/json",
      AccessControlAllowOrigin: "*",
      Authorization: "Bearer " + accessToken
    }
  };
  return axios
    .post(url, payload, axiosConfigAuth)
    .then(res => {
      return { status: "success", bookAdded: true, book: res.data.Book };
    })
    .catch(error => {
      return { status: "failure", error: error.response.data };
    });
};

export const editBook = (bookData, bookId, accessToken) => {
  let url = `${baseURL}/book/${bookId}`;
  let payload = {
    title: bookData.title,
    author: bookData.author,
    isbn: bookData.isbn,
    publisher: bookData.publisher,
    quantity: bookData.quantity
  };
  let axiosConfigAuth = {
    headers: {
      "Content-Type": "application/json",
      AccessControlAllowOrigin: "*",
      Authorization: "Bearer " + accessToken
    }
  };
  return axios
    .put(url, payload, axiosConfigAuth)
    .then(res => {
      return { status: "success", bookUpdated: true, book: res.data.Book };
    })
    .catch(errorHandler);
};

export const removeBook = (bookId, accessToken) => {
  let url = `${baseURL}/book/${bookId}`;
  let axiosConfigAuth = {
    headers: {
      "Content-Type": "application/json",
      AccessControlAllowOrigin: "*",
      Authorization: "Bearer " + accessToken
    }
  };
  return axios
    .delete(url, axiosConfigAuth)
    .then(res => {
      return { status: "success", bookDeleted: true };
    })
    .catch(errorHandler);
};

export const borrow = (bookId, accessToken) => {
  let url = `${baseURL}/users/books/${bookId}`;
  let axiosConfigAuth = {
    headers: {
      "Content-Type": "application/json",
      AccessControlAllowOrigin: "*",
      Authorization: "Bearer " + accessToken
    }
  };
  let payload = null;
  return axios
    .post(url, payload, axiosConfigAuth)
    .then(res => {
      return { status: "success", book: res.data.Book };
    })
    .catch(errorHandler);
};

export const notReturned = accessToken => {
  let url = `${baseURL}/users/books?returned=false`;
  let axiosConfigAuth = {
    headers: {
      "Content-Type": "application/json",
      AccessControlAllowOrigin: "*",
      Authorization: "Bearer " + accessToken
    }
  };
  return axios
    .get(url, axiosConfigAuth)
    .then(res => {
      return { status: "success", borrowedBooks: res.data.unreturned };
    })
    .catch(errorHandler);
};

export const returnABook = (bookId, accessToken) => {
  let url = `${baseURL}/users/books/${bookId}`;
  let axiosConfigAuth = {
    headers: {
      "Content-Type": "application/json",
      AccessControlAllowOrigin: "*",
      Authorization: "Bearer " + accessToken
    }
  };
  let payload = null;
  return axios
    .put(url, payload, axiosConfigAuth)
    .then(res => {
      return { status: "success", data: res.data };
    })
    .catch(errorHandler);
};

export const borrowingHistory = accessToken => {
  let url = `${baseURL}/users/books`;
  let axiosConfigAuth = {
    headers: {
      "Content-Type": "application/json",
      AccessControlAllowOrigin: "*",
      Authorization: "Bearer " + accessToken
    }
  };
  return axios
    .get(url, axiosConfigAuth)
    .then(res => {
      return { status: "success", history: res.data.borrowHistory };
    })
    .catch(errorHandler);
};
