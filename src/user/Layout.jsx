import { Link, Outlet } from 'react-router-dom';
import { Sidebar } from './components';
import './admin.css';
import { cart, logo } from './assets';
import { useApp } from './hooks';
import { useEffect, useState } from 'react';

window.addEventListener('beforeunload', () => {
  sessionStorage.clear();
});

function AppLayout() {
  const { cartItems } = useApp();
  const [isBlinking, setIsBlinking] = useState(false);

  useEffect(() => {
    setIsBlinking(true);

    const timeoutId = setTimeout(() => {
      setIsBlinking(false);
    }, 1000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [cartItems]);
  return (
    <div>
      <div className="sidebar">
        <Sidebar />
      </div>
      <div className="header container">
        <img
          src={logo}
          alt=""
          className="logo"
        />
        <Link to="./cart">
          <img
            src={cart}
            alt=""
            className={isBlinking ? 'blink' : ''}
          />
        </Link>
      </div>
      <div className="outlet container">
        <Outlet />
      </div>
    </div>
  );
}
export default AppLayout;
