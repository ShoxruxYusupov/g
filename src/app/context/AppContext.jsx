import axios from 'axios';

const { createContext, useState, useEffect } = require('react');

export const AppContext = createContext();

export function AppProvider({ children }) {
  // Корзина
  const [foods, setFoods] = useState([]);
  async function fetchData() {
    await axios
      .get('https://intuzaeats.uz/api/v1/foods/?format=json', {
        headers: {
          Authorization: 'Token a65b6c2fcfaf601b4f468f9121b4aa6d3eab6cb2'
        }
      })
      .then((res) => {
        setFoods(res?.data);
      })
      .catch((err) => console.log(err));
  }
  useEffect(() => {
    fetchData();
  }, []);
  // Продукты в корзине
  const [cartItems, setCartItems] = useState([]);

  // Общая цена - Subtotal
  const [total, setTotal] = useState(0);

  const addToCart = (item) => {
    setCartItems([...cartItems, item]);
  };

  const removeById = (id) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  function innerToCart(id) {
    let newList = foods.map((item) => {
      if (item.id === id) {
        item.inCart = !item.inCart;
      }
      return item;
    });
    setFoods(newList);
  }

  return (
    <AppContext.Provider
      value={{
        cartItems,
        addToCart,
        removeById,
        setTotal,
        total,
        foods,
        setFoods,
        innerToCart
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
