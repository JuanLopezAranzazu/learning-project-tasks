import axios from "../api/axios";

const AUTH_URL = "/auth";

export const registerUser = (user) => {
  return axios.post(`${AUTH_URL}/register`, user);
};
