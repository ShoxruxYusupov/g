import { Outlet } from 'react-router-dom';
import { Sidebar, FaceControl } from './components';
import style from './admin.module.css';
import { useState } from 'react';

function AppLayout() {
  const [admin, setAdmin] = useState(false);
  return (
    <>
      {admin ? (
        <>
          <div className={style.sidebar}>
            <Sidebar />
          </div>
          <div className={style.outlet}>
            <Outlet />
          </div>
        </>
      ) : (
        <FaceControl setAdmin={setAdmin} />
      )}
    </>
  );
}
export default AppLayout;
