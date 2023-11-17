import style from './ProductCard.module.css';
import { cart } from '../assets';
import { useApp } from '../hooks';

export const ProductCard = ({ data }) => {
  const { addToCart, setTotal, total, cartItems, removeById, innerToCart } =
    useApp();
  const { name, description, price, image } = data;

  function adderToCart(id) {
    if (cartItems.length === 0) {
      addToCart(data);
      setTotal(total + +data.price);
    } else {
      cartItems.map((item) => {
        if (item.id !== id) {
          addToCart(data);
          setTotal(total + +data.price);
        }
      });
    }
  }
  return (
    <div
      className={style.ProductCard}
      onClick={() => {
        if (data.inCart) {
          removeById(data.id);
          setTotal(total - +data.price);
        } else {
          adderToCart(data.id);
        }
        innerToCart(data.id);
      }}
    >
      <img
        className={style.img}
        src={image}
        alt="ProductCard"
      />
      <h3>{name}</h3>
      <p>{description}</p>
      <div>
        <span>{price.toLocaleString('ru')}sum</span>
        <img
          src={cart}
          alt="cart"
          className={data.inCart ? style.activate : ''}
        />
      </div>
    </div>
  );
};
