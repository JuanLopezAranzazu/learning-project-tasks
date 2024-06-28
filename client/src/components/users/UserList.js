import { useEffect } from "react";
import "./Users.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
// components
import User from "./User";
// actions
import { startGetAllUsers } from "../../actions/users";

const TaskList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleAddUser = () => {
    navigate("/users/add");
  };

  const users = useSelector((state) => state.users);

  useEffect(() => {
    dispatch(startGetAllUsers());
  }, [dispatch]);

  return (
    <div className="task-list">
      <div className="task-list-header">
        {users.length === 0 ? (
          <h3>No hay usuarios</h3>
        ) : (
          <h3>Total usuarios {users.length}</h3>
        )}
        <button
          type="button"
          className="btn btn-primary"
          onClick={handleAddUser}
        >
          Agregar usuario
        </button>
      </div>
      {users.map((user) => (
        <User key={user._id} user={user} />
      ))}
    </div>
  );
};

export default TaskList;
