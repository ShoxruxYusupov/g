import styles from './CartProductCard.module.css';

import { useEffect, useState } from 'react';
import { useApp } from '../hooks/useApp';

export function CartProductCard({ props }) {
  const [count, setCount] = useState(+sessionStorage.getItem(props.id) || 1);
  const { setTotal, total, removeById, innerToCart } = useApp();

  // Менимше корзинкада санын 0ге тусирген жаксы
  // 0ге туссе жок етип жберуден, маселен амайман деп - ты басып
  // кийин алгысы кеп каса гл старицага кайттан барип келуи керек
  // боладыго, 0боп турса не зиян бар ценага тасир етпидиго главный
  useEffect(() => {
    if (count === 0) {
      removeById(props.id);
      innerToCart(props.id);
    }
    sessionStorage.setItem(props.id, count);
  }, [count]);

  return (
    <div className={styles.singleFood}>
      <div className={styles.wrap}>
        <div className={styles.img}>
          <img
            src={props.image}
            alt={props.name}
          />
        </div>
        <div className={styles.foodInfo}>
          <h3 className={styles.res}>{props.name}</h3>
          <span className={styles.pri}>
            {props.price.toLocaleString('ru')}sum
          </span>
        </div>
      </div>
      <div className={styles.counter}>
        <button
          className={styles.counterBtn + ' ' + styles.minus}
          onClick={() => {
            if (count) {
              count < 1 ? setCount(1) : setCount(count - 1);
              total > 1 ? setTotal(total - +props.price) : setTotal(0);
            }
          }}
        >
          -
        </button>
        <p className={styles.count}>{count}</p>
        <button
          className={styles.counterBtn}
          onClick={() => {
            setCount(count + 1);
            setTotal(total + +props.price);
          }}
        >
          +
        </button>
        <button
          className={styles.delete}
          onClick={() => {
            setCount(0);
            setTotal(total - +(props.price * count).toFixed(2));
            removeById(props.id);
            innerToCart(props.id);
            sessionStorage.setItem(props.id, 1);
          }}
        >
          &times;
        </button>
      </div>
    </div>
  );
}
