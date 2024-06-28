import axios from "../api/axios";
import swal from "sweetalert";

const USER_URL = "/user";

export const getAllUsers = (users) => {
  return {
    type: "GET_ALL_USERS",
    payload: users,
  };
};

export const addUser = (user) => {
  return {
    type: "ADD_USER",
    payload: user,
  };
};

export const editUser = (user) => {
  return {
    type: "EDIT_USER",
    payload: user,
  };
};

export const removeUser = (id) => {
  return {
    type: "REMOVE_USER",
    payload: id,
  };
};

export const getUser = (user) => {
  return {
    type: "SINGLE_USER",
    payload: user,
  };
};

export const startGetAllUsers = () => {
  return (dispatch) => {
    axios
      .get(USER_URL, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      })
      .then((response) => {
        console.log(response?.data);
        const users = response.data;
        dispatch(getAllUsers(users));
      })
      .catch((err) => {
        swal("Ocurrio un error", err.message, "error");
      });
  };
};

export const startGetUser = (id) => {
  return (dispatch) => {
    axios
      .get(`${USER_URL}/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      })
      .then((response) => {
        console.log(response?.data);
        const user = response.data;
        dispatch(getUser(user));
      })
      .catch((err) => {
        swal("Ocurrio un error", err.message, "error");
      });
  };
};

export const startAddUser = (formData) => {
  return (dispatch) => {
    axios
      .post(USER_URL, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      })
      .then((response) => {
        console.log(response?.data);
        const user = response.data;
        dispatch(addUser(user));
        swal("Usuario creado exitosamente", "", "success");
      })
      .catch((err) => {
        swal("Ocurrio un error", err.message, "error");
      });
  };
};

export const startEditUser = (id, formData) => {
  return (dispatch) => {
    axios
      .put(`${USER_URL}/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      })
      .then((response) => {
        console.log(response?.data);
        const user = response.data;
        dispatch(editUser(user));
        swal("Usuario actualizado exitosamente", "", "success");
      })
      .catch((err) => {
        swal("Ocurrio un error", err.message, "error");
      });
  };
};

export const startRemoveUser = (id) => {
  return (dispatch) => {
    swal({
      title: "¿Estás seguro de eliminar este usuario?",
      text: "Una vez eliminada el usuario, no se podrá recuperar",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((value) => {
      if (value) {
        axios
          .delete(`${USER_URL}/${id}`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("authToken")}`,
            },
          })
          .then((response) => {
            console.log(response?.data);
            dispatch(removeUser(id));
            swal("Usuario eliminado exitosamente", "", "success");
          })
          .catch((err) => {
            swal("Ocurrio un error", err.message, "error");
          });
      }
    });
  };
};
