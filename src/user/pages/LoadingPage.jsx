import { useNavigate } from 'react-router-dom';
import { logo } from '../assets';
import style from './LoadingPage.module.css';

export function LoadingPage() {
  sessionStorage.setItem('okay', 'okay');
  const navigate = useNavigate();
  setTimeout(() => {
    navigate('/');
  }, 3000);
  return (
    <div className={style.loading}>
      <h1>Спасибо что выбрали нас</h1>
      <div className={style.div1}></div>
      <div className={style.div2}></div>
      <div className={style.div3}></div>
      <div className={style.div4}></div>
      <img
        src={logo}
        alt=""
      />
      <div className={style.div5}></div>
    </div>
  );
}
