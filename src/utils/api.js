import axios from "axios";

const errorHandler = error => {
  const err = error.response ? error.response.data : { Message: error.message };
  return { status: "failure", error: err };
};

// const baseURL = "http://localhost:5000/api/v1";
const baseURL = "https://banana-pie-71385.herokuapp.com/api/v1";
const axiosConfig = {
  headers: {
    "Content-Type": "application/json",
    AccessControlAllowOrigin: "*"
  }
};

export const registerUser = userData => {
  const url = `${baseURL}/auth/register`;
  const payload = {
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
  const url = `${baseURL}/auth/login`;
  const payload = {
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
  const url = `${baseURL}/user`;
  const axiosConfigAuth = {
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
  const url = `${baseURL}/auth/logout`;
  const axiosConfigAuth = {
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
  const url = `${baseURL}/books`;
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
  const url = `${baseURL}/books`;
  const payload = {
    title: bookData.title,
    author: bookData.author,
    isbn: bookData.isbn,
    publisher: bookData.publisher,
    quantity: bookData.quantity
  };
  const axiosConfigAuth = {
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
  const url = `${baseURL}/book/${bookId}`;
  const payload = {
    title: bookData.title,
    author: bookData.author,
    isbn: bookData.isbn,
    publisher: bookData.publisher,
    quantity: bookData.quantity
  };
  const axiosConfigAuth = {
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
  const url = `${baseURL}/book/${bookId}`;
  const axiosConfigAuth = {
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
  const url = `${baseURL}/users/books/${bookId}`;
  const axiosConfigAuth = {
    headers: {
      "Content-Type": "application/json",
      AccessControlAllowOrigin: "*",
      Authorization: "Bearer " + accessToken
    }
  };
  const payload = null;
  return axios
    .post(url, payload, axiosConfigAuth)
    .then(res => {
      return { status: "success", book: res.data.Book };
    })
    .catch(errorHandler);
};

export const notReturned = accessToken => {
  const url = `${baseURL}/users/books?returned=false`;
  const axiosConfigAuth = {
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
  const url = `${baseURL}/users/books/${bookId}`;
  const axiosConfigAuth = {
    headers: {
      "Content-Type": "application/json",
      AccessControlAllowOrigin: "*",
      Authorization: "Bearer " + accessToken
    }
  };
  const payload = null;
  return axios
    .put(url, payload, axiosConfigAuth)
    .then(res => {
      return { status: "success", data: res.data };
    })
    .catch(errorHandler);
};

export const borrowingHistory = accessToken => {
  const url = `${baseURL}/users/books`;
  const axiosConfigAuth = {
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
