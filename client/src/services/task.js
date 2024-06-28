import axios from "../api/axios";

const TASK_URL = "/task";

export const getTask = (id) => {
  return axios.get(`${TASK_URL}/${id}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("authToken")}`,
    },
  });
};
