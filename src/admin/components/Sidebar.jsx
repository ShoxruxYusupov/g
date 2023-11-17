import { NavLink } from "react-router-dom";
import { links } from "../assets/constants";
import style from "./sidebar.module.css";
import { logout } from "../assets";

export function Sidebar() {
  return (
    <>
      <h2 className={style.title}>Intuza Eats</h2>
      {links.map((item) => (
        <NavLink
          className={({ isActive }) =>
            style.navlink + ` ${isActive ? style.active : null}`
          }
          to={item.to}
          key={item.id}
        >
          <img className={style.icon} src={item.icon} />
          <span className={style.text}>{item.title}</span>
        </NavLink>
      ))}
      <div className={style.btn}>
        <img className={style.icon} src={logout} />
        <span className={style.text}>Logout</span>
      </div>
    </>
  );
}
