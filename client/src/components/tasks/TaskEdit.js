import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./Tasks.css";
import swal from "sweetalert";
// redux
import { useDispatch, useSelector } from "react-redux";
// actions
import { startGetTask, startEditTask } from "../../actions/task";

const priorities = ["Baja", "Media", "Alta"];
const statuses = ["Pendiente", "En progreso", "Completada"];

const TaskEdit = () => {
  const [formValues, setFormValues] = useState({
    title: "",
    description: "",
    priority: "",
    status: "",
  });
  const [formErrors, setFormErrors] = useState({
    title: "",
    description: "",
    priority: "",
    status: "",
  });
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(startGetTask(id));
  }, [id, dispatch]);

  const taskToEdit = useSelector((state) => state.singleTask);

  useEffect(() => {
    if (taskToEdit) {
      setFormValues({
        title: taskToEdit.title || "",
        description: taskToEdit.description || "",
        priority: taskToEdit.priority || "",
        status: taskToEdit.status || "",
      });
    }
  }, [taskToEdit]);

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
      case "priority":
        errors.priority = !priorities.includes(value)
          ? "La prioridad debe ser baja, media o alta"
          : "";
        break;
      case "status":
        errors.status = !statuses.includes(value)
          ? "El estado debe ser pendiente, en progreso o terminada"
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
      dispatch(startEditTask(id, formValues));
      navigate(-1);
    } else {
      swal("Error", "Datos incorrectos", "error");
    }
  };

  const goBack = () => navigate(-1);

  return (
    <section>
      <h2>Editar tarea</h2>
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
        <div className="form-group">
          <label htmlFor="priority">Prioridad</label>
          <select
            id="priority"
            name="priority"
            value={formValues.priority}
            onChange={handleChange}
          >
            <option value="">Seleccione una prioridad</option>
            {priorities.map((priority, index) => (
              <option key={index} value={priority}>
                {priority}
              </option>
            ))}
          </select>
          {formErrors.priority.length > 0 && (
            <span className="error">{formErrors.priority}</span>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="status">Estado</label>
          <select
            id="status"
            name="status"
            value={formValues.status}
            onChange={handleChange}
          >
            <option value="">Seleccione un estado</option>
            {statuses.map((status, index) => (
              <option key={index} value={status}>
                {status}
              </option>
            ))}
          </select>
          {formErrors.status.length > 0 && (
            <span className="error">{formErrors.status}</span>
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

export default TaskEdit;
