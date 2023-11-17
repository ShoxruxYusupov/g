import axios from 'axios';
import { useState } from 'react';
import { roll } from '../assets';
import styles from './FaceControl.module.css';

export const FaceControl = ({ setAdmin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [wrong, setWrong] = useState(false);

  const isAdmin = (e) => {
    e.preventDefault();
    setTimeout(() => {
      if (username == 'admin' && password == '123456') {
        setWrong(false);
        setAdmin(true);
        setLoading(false);
      } else {
        setWrong(true);
        setLoading(false);
        setUsername('');
        setPassword('');
        setTimeout(() => {
          setWrong(false);
        }, 2000);
      }
    }, 2000);
  };

  return (
    <div className={styles.control}>
      <form
        onSubmit={(e) => {
          setLoading(!loading);
          isAdmin(e);
        }}
        className={styles.controlForm}
      >
        <h1>Докажи что ты админ</h1>
        <input
          type="text"
          placeholder="admin"
          value={username}
          required
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="text"
          placeholder="123456"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          className={loading ? styles.loading : ''}
          disabled={loading}
          onSubmit={(e) => {
            setLoading(!loading);
            isAdmin(e);
          }}
        >
          {!loading ? 'send' : <img src={roll} />}
        </button>
        {wrong && <span>Ты не админ</span>}
      </form>
    </div>
  );
};
