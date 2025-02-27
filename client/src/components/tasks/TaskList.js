import { useEffect } from "react";
import "./Tasks.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
// components
import Task from "./Task";
// actions
import { startGetAllTasks } from "../../actions/task";

const TaskList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleAddTask = () => {
    navigate("/tasks/add");
  };

  const tasks = useSelector((state) => state.tasks);

  useEffect(() => {
    dispatch(startGetAllTasks());
  }, [dispatch]);

  return (
    <div className="task-list">
      <div className="task-list-header">
        {tasks.length === 0 ? (
          <h3>No hay tareas</h3>
        ) : (
          <h3>Total tareas {tasks.length}</h3>
        )}
        <button
          type="button"
          className="btn btn-primary"
          onClick={handleAddTask}
        >
          Agregar tarea
        </button>
      </div>
      {tasks.map((task) => (
        <Task key={task._id} task={task} />
      ))}
    </div>
  );
};

export default TaskList;
