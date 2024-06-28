import { useNavigate } from "react-router-dom";
import "./Home.css";
// components
import TaskList from "../../tasks/TaskList";

const Home = () => {
  const navigate = useNavigate();

  const handleAddTask = () => {
    navigate("/tasks/add");
  };

  return (
    <section className="home">
      <div className="home-header">
        <h1>Lista de tareas</h1>
        <button type="button" className="btn-primary" onClick={handleAddTask}>
          Crear tarea
        </button>
      </div>
      <TaskList />
    </section>
  );
};

export default Home;
