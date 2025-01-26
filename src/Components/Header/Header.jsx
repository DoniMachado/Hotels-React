import style from "./Header.module.css";
import { FaHotel } from "react-icons/fa";
import { MdMenu } from "react-icons/md";
import { NavLink } from "react-router-dom";
import { ThemeContext } from "../../Contexts/ThemeContext.jsx";
import { FaSun, FaMoon } from "react-icons/fa";

import { useState, useRef, useContext } from "react";

export default function Header(props) {
  const menu = useRef(null);
  const { isDarkTheme, toggleTheme } = useContext(ThemeContext);

  function toggleHide() {
    menu.current.classList.toggle(style.hide);
  }

  return (
    <header id={style.header}>
      <div id={style.header_main}>
        <div id={style.header_logo_name}>
          <FaHotel id={style.header_logo_icon} />
          AnyHotel.com
        </div>
        <div id={style.header_icons}>
          <MdMenu id={style.header_menu_icon} onClick={toggleHide} />
          {isDarkTheme() ? (
            <FaSun className={style.theme_icon} onClick={toggleTheme} />
          ) : (
            <FaMoon className={style.theme_icon} onClick={toggleTheme} />
          )}
        </div>
      </div>
      <ul id={style.header_menu} className={style.hide} ref={menu}>
        <li className={style.header_menu_item}>
          <NavLink
            className={({ isActive }) => (isActive ? style.active : "")}
            to="/"
          >
            Home
          </NavLink>
        </li>
        {/* <li className={style.header_menu_item}>
          <NavLink
            className={({ isActive }) => (isActive ? style.active : "")}
            to="/favorite"
          >
            Favorite
          </NavLink>
        </li> */}
      </ul>
    </header>
  );
}
