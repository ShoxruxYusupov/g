import axios from 'axios';

const { createContext, useState, useEffect } = require('react');

export const AppContext = createContext();

export function AppProvider({ children }) {
  // Корзина
  const [foods, setFoods] = useState([]);
  async function fetchData() {
    setTimeout(() => {
      setFoods([
        {
          id: 1,
          name: 'Сочный бургер',
          description: 'гриль с говяжьей котлетой',
          price: '899',
          image:
            'https://masterpiecer-images.s3.yandex.net/0be806905cf411eebc65cef0812af5c0:upscaled',
          category: 1
        },
        {
          id: 2,
          name: 'Бургер',
          description: 'с перцем халапеньо и сыром',
          price: '439',
          image:
            'https://imgtest.mir24.tv/uploaded/images/crops/2021/September/870x489_0x506_detail_crop_20210926234014_905f1d64_6a84d8fbb4620445f5daa5f422e31fd6fa6fb63a4e4612796e52620c916250a6.jpg',
          category: 1
        },
        {
          id: 3,
          name: 'Пицца',
          description: 'Ветчина и грибы 26 см традиционное тесто',
          price: '339',
          image:
            'https://user36270.clients-cdnnow.ru/1661946463083-350x234.jpeg',
          category: 2
        },
        {
          id: 4,
          name: 'Пепперони',
          description: 'и грибы 26 см тонкое тесто',
          price: '349',
          image: 'https://testov-spb.ru/images/items2/734.jpg',
          category: 2
        }
      ]);
    }, 1500);
    // await axios
    //   .get('https://intuzaeats.uz/api/v1/foods/?format=json', {
    //     headers: {
    //       Authorization: 'Token a65b6c2fcfaf601b4f468f9121b4aa6d3eab6cb2'
    //     }
    //   })
    //   .then((res) => {
    //     setFoods(res?.data);
    //   })
    //   .catch((err) => console.log(err));
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
