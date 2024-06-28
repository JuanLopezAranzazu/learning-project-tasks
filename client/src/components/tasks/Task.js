import { useNavigate } from "react-router-dom";
import "./Tasks.css";
// redux
import { useDispatch } from "react-redux";
// actions
import { startRemoveTask } from "../../actions/task";

const Task = ({ task }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleEditTask = () => {
    navigate(`/tasks/edit/${task._id}`);
  };

  const handleDeleteTask = () => {
    dispatch(startRemoveTask(task._id));
  };

  return (
    <div className="task">
      <div className="task-info">
        <h2>{task.title}</h2>
        <p>{task.description}</p>
        <p>Prioridad {task.priority}</p>
        {task.done ? (
          <p>La tarea esta completa</p>
        ) : (
          <p>La tarea NO esta completa</p>
        )}
      </div>
      <div className="task-actions">
        <button type="button" className="btn-primary" onClick={handleEditTask}>
          Editar
        </button>
        <button type="button" className="btn-danger" onClick={handleDeleteTask}>
          Eliminar
        </button>
      </div>
    </div>
  );
};

export default Task;
