import { useNavigate } from "react-router-dom";
import "./Users.css";
// redux
import { useDispatch, useSelector } from "react-redux";
// actions
import { startRemoveUser } from "../../actions/users";

const User = ({ user }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userAuthenticated = useSelector((state) => state.user);

  const handleEditUser = () => {
    navigate(`/users/edit/${user._id}`);
  };

  const handleDeleteUser = () => {
    dispatch(startRemoveUser(user._id));
  };

  return (
    <div className="user">
      <div className="user-info">
        <h2>
          {user.firstName} {user.lastName}
        </h2>
        <p>Correo {user.email}</p>
        <p>ROLES {user?.role?.name}</p>
      </div>
      {userAuthenticated._id !== user._id && (
        <div className="user-actions">
          <button
            type="button"
            className="btn-primary"
            onClick={handleEditUser}
          >
            Editar
          </button>
          <button
            type="button"
            className="btn-danger"
            onClick={handleDeleteUser}
          >
            Eliminar
          </button>
        </div>
      )}
    </div>
  );
};

export default User;
