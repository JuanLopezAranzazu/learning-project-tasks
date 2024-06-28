import { useEffect } from "react";
import "./Tasks.css";
import { useDispatch, useSelector } from "react-redux";
// components
import Task from "./Task";
// actions
import { startGetAllTasks } from "../../actions/task";

const TaskList = () => {
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.tasks);

  useEffect(() => {
    dispatch(startGetAllTasks());
  }, [dispatch]);

  return (
    <div className="task-list">
      {tasks.length === 0 && <span>No hay tareas</span>}
      {tasks.length > 0 && <span>Total tareas {tasks.length}</span>}
      {tasks.map((task) => (
        <Task key={task._id} task={task} />
      ))}
    </div>
  );
};

export default TaskList;
