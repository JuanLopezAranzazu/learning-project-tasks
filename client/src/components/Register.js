import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import swal from "sweetalert";
// redux
import { useDispatch } from "react-redux";
// actions
import { startRegisterUser } from "../actions/user";
// services
import { registerUser } from "../services/user";

const Register = () => {
  const [formValues, setFormValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [formErrors, setFormErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });

    const validEmailRegex = RegExp(
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    );

    let errors = { ...formErrors };

    switch (name) {
      case "firstName":
        errors.firstName =
          value.length < 3 || value.length > 50
            ? "El nombre debe ser de 3 a 50 caracteres"
            : "";
        break;
      case "lastName":
        errors.lastName =
          value.length < 3 || value.length > 50
            ? "El apellido debe ser de 3 a 50 caracteres"
            : "";
        break;
      case "email":
        errors.email = validEmailRegex.test(value)
          ? ""
          : "El correo es invalido!";
        break;
      case "password":
        errors.password =
          value.length < 6 || value.length > 128
            ? "La contraseña debe ser de 6 a 128 caracteres"
            : "";
        break;
      default:
        break;
    }
    setFormErrors(errors);
  };

  const validateForm = (errors) => {
    let valid = true;
    Object.values(errors).forEach((val) => val.length > 0 && (valid = false));
    return valid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm(formErrors)) {
      // dispatch(startRegisterUser(formValues, () => navigate(from)));

      registerUser(formValues)
        .then((response) => {
          console.log(response?.data);
          swal("Usuario registrado", "Por favor inicia sesión", "success");
          navigate(from);
        })
        .catch((err) => {
          swal("Ocurrio un error", err.message, "error");
        });
    } else {
      swal("Error", "Datos incorrectos", "error");
    }
  };

  return (
    <section>
      <h1>Registrarse</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="firstName">Nombre</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formValues.firstName}
            onChange={handleChange}
            required
          />
          {formErrors.firstName.length > 0 && (
            <span className="error">{formErrors.firstName}</span>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="lastName">Nombre</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formValues.lastName}
            onChange={handleChange}
            required
          />
          {formErrors.lastName.length > 0 && (
            <span className="error">{formErrors.lastName}</span>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="email">Correo</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formValues.email}
            onChange={handleChange}
            required
          />
          {formErrors.email.length > 0 && (
            <span className="error">{formErrors.email}</span>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="password">Contraseña</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formValues.password}
            onChange={handleChange}
            required
          />
          {formErrors.password.length > 0 && (
            <span className="error">{formErrors.password}</span>
          )}
        </div>
        <button type="submit" className="btn-primary">
          Registrarse
        </button>
      </form>
    </section>
  );
};

export default Register;
