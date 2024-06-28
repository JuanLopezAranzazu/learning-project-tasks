import "./Layout.css";
import { Outlet } from "react-router-dom";
// components
import Header from "../header/Header";

const Layout = () => {
  return (
    <section className="module-layout">
      <Header />
      <Outlet />
    </section>
  );
};

export default Layout;
