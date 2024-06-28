import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import swal from "sweetalert";
// redux
import { useDispatch, useSelector } from "react-redux";
// actions
import { startAddUser, startEditUser, startGetUser } from "../../actions/users";
// services
import { getUser } from "../../services/users";

const roles = [
  { name: "Administrador", value: "admin" },
  { name: "Usuario", value: "user" },
];

const UserForm = () => {
  const [formValues, setFormValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    roleName: "",
  });
  const [formErrors, setFormErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    roleName: "",
  });
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // const userToEdit = useSelector((state) => state.singleUser);

  // useEffect(() => {
  //   if (userToEdit) {
  //     setFormValues({
  //       firstName: userToEdit.firstName || "",
  //       lastName: userToEdit.lastName || "",
  //       email: userToEdit.email || "",
  //       password: "",
  //       roleName: userToEdit?.role?.name || "",
  //     });
  //   }
  // }, [userToEdit]);

  useEffect(() => {
    if (id) {
      getUser(id)
        .then((response) => {
          const user = response.data;
          setFormValues({
            firstName: user.firstName || "",
            lastName: user.lastName || "",
            email: user.email || "",
            password: "",
            roleName: user?.role?.name || "",
          });
        })
        .catch((err) => {
          swal("Ocurrio un error", err.message, "error");
        });
    }
  }, []);

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
      case "roleName":
        errors.roleName = roles.some((role) => role.value === value)
          ? ""
          : "El rol es invalido!";
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
    if (!validateForm(formErrors)) {
      swal("Error", "Datos incorrectos", "error");
      return;
    }
    console.log(formValues);
    if (id) {
      dispatch(startEditUser(id, formValues));
    } else {
      dispatch(startAddUser(formValues));
    }
    navigate(-1);
  };

  const goBack = () => navigate(-1);

  return (
    <section>
      {id ? <h2>Editar Usuario</h2> : <h2>Crear Usuario</h2>}
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
        <div className="form-group">
          <label htmlFor="roleName">Rol</label>
          <select
            id="roleName"
            name="roleName"
            value={formValues.roleName}
            onChange={handleChange}
            required
          >
            <option value="">Seleccionar un rol</option>
            {roles.map((role) => (
              <option key={role.value} value={role.value}>
                {role.name}
              </option>
            ))}
          </select>
          {formErrors.roleName.length > 0 && (
            <span className="error">{formErrors.roleName}</span>
          )}
        </div>
        <div className="form-actions">
          <button type="button" className="btn-secondary" onClick={goBack}>
            Cancelar
          </button>
          <button type="submit" className="btn-primary">
            Guardar
          </button>
        </div>
      </form>
    </section>
  );
};

export default UserForm;
