import axios from 'axios';
import { useEffect } from 'react';
import { useState } from 'react';
import styles from './MenuPage.module.css';
import { ProductCard } from '../components';
import { useApp } from '../hooks';
import { useNavigate } from 'react-router-dom';

const Tabs = () => {
  const { foods } = useApp();
  const [currentTab, setCurrentTab] = useState('all');
  const [filter, setFilter] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const navigation = useNavigate();

  async function fetchCat() {
    await axios
      .get('https://intuzaeats.uz/api/v1/menu/?format=json', {
        headers: {
          Authorization: 'Token a65b6c2fcfaf601b4f468f9121b4aa6d3eab6cb2'
        }
      })
      .then((res) => {
        setCategories([
          {
            id: 'all',
            name: 'Барлиги',
            image:
              'https://www.koolinar.ru/all_image/recipes/162/162783/recipe_331e4d8d-dd95-42d3-90f8-2fe61ab49c93_w450.jpg'
          },
          ...res?.data
        ]);
        setIsLoading(false);
      })
      .catch((err) => console.log(err));
  }

  useEffect(() => {
    if (!sessionStorage.getItem('okay')) {
      navigation('/loading');
    }
    fetchCat();
  }, []);

  useEffect(() => {
    if (currentTab === 'all') {
      setFilter(foods);
    } else {
      setFilter(foods.filter((item) => item.category == currentTab));
    }
  }, [currentTab]);

  const handleTabClick = (e) => {
    e.stopPropagation();
    if (e.target.id !== currentTab) {
      setCurrentTab(e.target.id);
    }
  };

  return (
    <div>
      <h1 className={styles.h1}>Меню</h1>
      <div className={styles.tabs}>
        {!isLoading ? (
          categories.length !== 0 ? (
            categories?.map((tab) => (
              <button
                key={tab.id + tab.name}
                id={tab.id}
                disabled={currentTab === `${tab.id}`}
                onClick={handleTabClick}
              >
                <img
                  id={tab.id}
                  onClick={handleTabClick}
                  src={tab.image}
                  alt="Menu"
                />
                <p
                  id={tab.id}
                  onClick={handleTabClick}
                >
                  {tab.name}
                </p>
              </button>
            ))
          ) : (
            <h1 className={styles.status}>Empty</h1>
          )
        ) : (
          <h1 className={styles.status}>Loading</h1>
        )}
      </div>
      <div
        className={styles.content}
        style={
          !isLoading && filter.length !== 0
            ? { gridTemplateColumns: '1fr 1fr' }
            : null
        }
      >
        {filter.length !== 0 ? (
          filter?.map((tab, i) => (
            <ProductCard
              key={tab.id + i}
              data={tab}
            />
          ))
        ) : (
          <h1 className={styles.status}>Empty</h1>
        )}
      </div>
    </div>
  );
};

export const MenuPage = () => {
  return <Tabs />;
};
