import "./Header.css";
import { Link, useNavigate } from "react-router-dom";
// redux
import { useDispatch, useSelector } from "react-redux";
// actions
import { startLogoutUser } from "./../../../actions/user";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user);

  const handleClick = () => {
    dispatch(startLogoutUser(() => navigate("/")));
  };

  return (
    <header>
      <div className="header-content">
        <Link to="/" className="nav-link">
          <h1 style={{ margin: 0, padding: 0 }}>App Tareas</h1>
        </Link>
        {user ? (
          <nav>
            <Link to="/" className="nav-link">
              Tareas
            </Link>
            <button type="button" className="btn-danger" onClick={handleClick}>
              Cerrar sesion
            </button>
          </nav>
        ) : (
          <nav>
            <Link to="/login" className="nav-link">
              Iniciar sesion
            </Link>
            <Link to="/register" className="nav-link">
              Registrarse
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
