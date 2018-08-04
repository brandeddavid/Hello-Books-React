import axios from "axios";

const baseURL = "http://localhost:5000/api/v1";
let axiosConfig = {
  header: {
    "Content-Type": "application/json",
    AccessControlAllowOrigin: "*"
  }
};

let registerUser = userData => {
  let url = `${baseURL}/auth/register`;
  let payload = {
    first_name: userData.first_name,
    last_name: userData.last_name,
    email: userData.email,
    username: userData.username,
    password: userData.password,
    confirm_password: userData.confirm_password
  };
  axios
    .post(url, payload, axiosConfig)
    .then(res => {
      return { status: "success", data: res.data };
    })
    .catch(error => {
      return { error: error.message };
    });
};

export { registerUser };
