import axios from "../api/axios";
import swal from "sweetalert";

const AUTH_URL = "/auth";

export const loginUser = (user) => {
  return {
    type: "LOGIN_USER",
    payload: user,
  };
};

export const logoutUser = () => {
  return {
    type: "LOGOUT_USER",
  };
};

export const startLoginUser = (formData, redirect) => {
  return (dispatch) => {
    axios
      .post(`${AUTH_URL}/login`, formData)
      .then((response) => {
        if (response.data.hasOwnProperty("errors")) {
          // mostrar errores
          console.log(response?.data.errors);
          swal("Ocurrio un error", response.data.errors, "error");
        } else {
          console.log(response?.data);
          // mostrar mensaje de éxito
          swal("Inicio de sesión exitoso", "", "success");
          // guardar token en localStorage
          localStorage.setItem("authToken", response.data.token);
          dispatch(loginUser(response.data.user));
          redirect(); // redirigir a la página de inicio
        }
      })
      .catch((err) => {
        swal("Ocurrio un error", err.message, "error");
      });
  };
};

export const startRegisterUser = (formData, redirect) => {
  return (dispatch) => {
    axios
      .post(`${AUTH_URL}/register`, formData)
      .then((response) => {
        if (response.data.hasOwnProperty("errors")) {
          // mostrar errores
          console.log(response?.data.errors);
          swal("Ocurrio un error", response.data.errors, "error");
        } else {
          console.log(response?.data);
          // mostrar mensaje de éxito
          swal("Registro exitoso", "", "success");
          // guardar token en localStorage
          // localStorage.setItem("authToken", response.data.token);
          // dispatch(loginUser(response.data.user));
          redirect(); // redirigir a la página de inicio
        }
      })
      .catch((err) => {
        swal("Ocurrio un error", err.message, "error");
      });
  };
};

export const startLogoutUser = (redirect) => {
  return (dispatch) => {
    swal({
      title: "¿Estás seguro?",
      text: "Una vez cerrada la sesión, deberás iniciar sesión de nuevo",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((value) => {
      if (value) {
        axios
          .delete(`${AUTH_URL}/logout`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("authToken")}`,
            },
          })
          .then((response) => {
            console.log(response?.data);
            // mostrar mensaje de éxito
            swal("Cierre de sesión exitoso", "", "success");
            // eliminar token de localStorage
            localStorage.removeItem("authToken");
            dispatch(logoutUser());
            redirect(); // redirigir a la página de inicio
          })
          .catch((err) => {
            swal("Ocurrio un error", err.message, "error");
          });
      }
    });
  };
};
