import { CartProductCard } from '../components';
import { useApp } from '../hooks';
import styles from './CartPage.module.css';

export const CartPage = () => {
  const { total, cartItems } = useApp();
  return (
    <div>
      <h2 className={styles.ShoppingCart}>Себетше</h2>
      {cartItems.map((item) => (
        <CartProductCard
          key={item.id}
          props={item}
        />
      ))}

      {total === 0 || cartItems.length === 0 ? (
        <div className={styles.emptyCart}>
          <h1>БОС</h1>
          <h3>себетте ессат жок</h3>
        </div>
      ) : (
        <div className={styles.pay}>
          <ul className={styles.ul}>
            <li className={styles.li}>
              <p>Сумма</p>
              <span>{total.toLocaleString('ru')}sum</span>
            </li>
            <li className={styles.li}>
              <p>Кол хакы</p>
              <span>{total ? '10%' : 0}</span>
            </li>
            <li className={styles.total + ' ' + styles.li}>
              <p>ЦЕНА</p>
              <span>
                {total ? (total + total * 0.1).toLocaleString('ru') : 0}sum
              </span>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};
