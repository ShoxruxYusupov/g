import { useContext } from 'react';
import { AppContext } from '../../app/context/AppContext';

export function useApp() {
  const {
    cartItems,
    addToCart,
    removeById,
    setTotal,
    total,
    foods,
    setFoods,
    innerToCart
  } = useContext(AppContext);
  return {
    cartItems,
    addToCart,
    removeById,
    setTotal,
    total,
    foods,
    setFoods,
    innerToCart
  };
}
