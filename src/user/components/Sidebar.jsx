import { NavLink } from 'react-router-dom';
import { links } from '../assets/constants';
import style from './sidebar.module.css';

export function Sidebar() {
  return (
    <div
      className="container"
      style={{ padding: '0' }}
    >
      <div className={style.nav}>
        {links.map((item) => (
          <NavLink
            className={({ isActive }) =>
              style.navlink + ` ${isActive ? style.active : null}`
            }
            to={item.to}
            key={item.id}
          >
            <img
              className={style.icon}
              src={item.icon}
              alt="Sidebar"
            />
            <span className={style.text}>{item.title}</span>
          </NavLink>
        ))}
      </div>
    </div>
  );
}
