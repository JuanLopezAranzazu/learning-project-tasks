import axios from "../api/axios";

const USER_URL = "/user";

export const getUser = (id) => {
  return axios.get(`${USER_URL}/${id}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("authToken")}`,
    },
  });
};
