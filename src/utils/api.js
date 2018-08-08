import axios from "axios";

const baseURL = "http://localhost:5000/api/v1";
let axiosConfig = {
  header: {
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
      return { status: "success", accessToken: res.data.Token };
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
