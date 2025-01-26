import style from "./Layout.module.css";
import { Outlet } from "react-router-dom";
import Header from "../Header/Header.jsx";
import Footer from "../Footer/Footer.jsx";

export default function Layout() {
  return (
    <div id={style.layout}>
      <Header />
      <main id={style.layout_main_content}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
