import { Routes, Route } from "react-router-dom";
// components
import Layout from "./components/common/layout/Layout";
// tasks
import TaskList from "./components/tasks/TaskList";
import TaskAdd from "./components/tasks/TaskAdd";
import TaskEdit from "./components/tasks/TaskEdit";
// users
import UserList from "./components/users/UserList";
import UserForm from "./components/users/UserForm";
import Missing from "./components/Missing";
import Login from "./components/Login";
import Register from "./components/Register";
import PrivateRoute from "./components/PrivateRoute";
import RequireAuth from "./components/RequireAuth";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* rutas publicas */}
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        {/* rutas privadas */}
        <Route element={<RequireAuth allowedRoles={["admin", "user"]} />}>
          <Route path="" element={<TaskList />} />
          <Route path="tasks/add" element={<TaskAdd />} />
          <Route path="tasks/edit/:id" element={<TaskEdit />} />
        </Route>
        <Route element={<RequireAuth allowedRoles={["admin"]} />}>
          <Route path="/users" element={<UserList />} />
          <Route path="users/add" element={<UserForm />} />
          <Route path="users/edit/:id" element={<UserForm />} />
        </Route>
        <Route path="*" element={<Missing />} />
      </Route>
    </Routes>
  );
}

export default App;
