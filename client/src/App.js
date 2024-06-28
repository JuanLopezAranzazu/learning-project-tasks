import { Routes, Route } from "react-router-dom";
// components
import Layout from "./components/common/layout/Layout";
import Home from "./components/common/home/Home";
import TaskAdd from "./components/tasks/TaskAdd";
import TaskEdit from "./components/tasks/TaskEdit";
import Missing from "./components/Missing";
import Login from "./components/Login";
import Register from "./components/Register";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* rutas publicas */}
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        {/* rutas privadas */}
        <Route element={<PrivateRoute />}>
          <Route path="" element={<Home />} />
          <Route path="tasks/add" element={<TaskAdd />} />
          <Route path="tasks/edit/:id" element={<TaskEdit />} />
        </Route>
        <Route path="*" element={<Missing />} />
      </Route>
    </Routes>
  );
}

export default App;
