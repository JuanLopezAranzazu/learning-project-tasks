import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Tasks.css";
import swal from "sweetalert";
// redux
import { useDispatch } from "react-redux";
// actions
import { startAddTask } from "../../actions/task";

const TaskAdd = () => {
  const [formValues, setFormValues] = useState({ title: "", description: "" });
  const [formErrors, setFormErrors] = useState({ title: "", description: "" });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });

    let errors = { ...formErrors };

    switch (name) {
      case "title":
        errors.title =
          value.length < 3 || value.length > 128
            ? "El titulo debe ser de 3 a 128 caracteres"
            : "";
        break;
      case "description":
        errors.description =
          value.length < 6 || value.length > 128
            ? "La descripcion debe ser de 6 a 128 caracteres"
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
      dispatch(startAddTask(formValues));
      navigate(-1);
    } else {
      swal("Error", "Datos incorrectos", "error");
    }
  };

  const goBack = () => navigate(-1);

  return (
    <section className="task-add">
      <h2>Crear Tarea</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Titulo</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formValues.title}
            onChange={handleChange}
            required
          />
          {formErrors.title.length > 0 && (
            <span className="error">{formErrors.title}</span>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="description">Descripcion</label>
          <textarea
            id="description"
            name="description"
            value={formValues.description}
            onChange={handleChange}
            required
          ></textarea>
          {formErrors.description.length > 0 && (
            <span className="error">{formErrors.description}</span>
          )}
        </div>
        <div className="form-actions">
          <button type="button" className="btn-secondary" onClick={goBack}>
            Volver
          </button>
          <button type="submit" className="btn-primary">
            Guardar
          </button>
        </div>
      </form>
    </section>
  );
};

export default TaskAdd;
