import axios from "../api/axios";
import swal from "sweetalert";

const TASK_URL = "/task";

export const getAllTasks = (tasks) => {
  return {
    type: "GET_ALL_TASKS",
    payload: tasks,
  };
};

export const addTask = (task) => {
  return {
    type: "ADD_TASK",
    payload: task,
  };
};

export const editTask = (task) => {
  return {
    type: "EDIT_TASK",
    payload: task,
  };
};

export const removeTask = (id) => {
  return {
    type: "REMOVE_TASK",
    payload: id,
  };
};

export const getTask = (task) => {
  return {
    type: "SINGLE_TASK",
    payload: task,
  };
};

export const startGetAllTasks = () => {
  return (dispatch) => {
    axios
      .get(`${TASK_URL}/user`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      })
      .then((response) => {
        console.log(response?.data);
        const tasks = response.data;
        dispatch(getAllTasks(tasks));
      })
      .catch((err) => {
        swal("Ocurrio un error", err.message, "error");
      });
  };
};

export const startGetTask = (id) => {
  return (dispatch) => {
    axios
      .get(`${TASK_URL}/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      })
      .then((response) => {
        console.log(response?.data);
        const task = response.data;
        dispatch(getTask(task));
      })
      .catch((err) => {
        swal("Ocurrio un error", err.message, "error");
      });
  };
};

export const startAddTask = (formData) => {
  return (dispatch) => {
    axios
      .post(TASK_URL, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      })
      .then((response) => {
        console.log(response?.data);
        const task = response.data;
        dispatch(addTask(task));
        swal("Tarea creada exitosamente", "", "success");
      })
      .catch((err) => {
        swal("Ocurrio un error", err.message, "error");
      });
  };
};

export const startEditTask = (id, formData) => {
  return (dispatch) => {
    axios
      .put(`${TASK_URL}/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      })
      .then((response) => {
        console.log(response?.data);
        const task = response.data;
        dispatch(editTask(task));
        swal("Tarea actualizada exitosamente", "", "success");
      })
      .catch((err) => {
        swal("Ocurrio un error", err.message, "error");
      });
  };
};

export const startRemoveTask = (id) => {
  return (dispatch) => {
    swal({
      title: "¿Estás seguro de eliminar esta tarea?",
      text: "Una vez eliminada la tarea, no se podrá recuperar",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((value) => {
      if (value) {
        axios
          .delete(`${TASK_URL}/${id}`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("authToken")}`,
            },
          })
          .then((response) => {
            console.log(response?.data);
            dispatch(removeTask(id));
            swal("Tarea eliminada exitosamente", "", "success");
          })
          .catch((err) => {
            swal("Ocurrio un error", err.message, "error");
          });
      }
    });
  };
};
