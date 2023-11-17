import axios from 'axios';
import { useEffect, useState } from 'react';
import style from './ReviewPage.module.css';
import { okStar, noStar } from '../assets';

const ReviewCard = (props) => {
  const { fullname, comment, published_date, stars, phone_number } = props.feed;
  const s = new Date(published_date);
  let star = [0, 0, 0, 0, 0];

  const getStars = (count) => {
    for (let index = 0; index < count; index++) {
      star[index] = 1;
    }

    return (
      <>
        {star.map((i, s) => {
          if (i) {
            return (
              <img
                src={okStar}
                key={s}
                alt={s}
              />
            );
          }
          return (
            <img
              src={noStar}
              key={s}
              alt={s}
            />
          );
        })}
      </>
    );
  };

  return (
    <div className={style.reviewCard}>
      <p className={style.fullName}>
        {fullname}
        <span style={{ marginTop: '5px' }}>{getStars(stars)}</span>
      </p>
      <p className={style.comment}>{comment}</p>
      <p className={style.comment}>{phone_number}</p>
      <p className={style.date}>
        {s.toLocaleDateString() + ' ' + s.toLocaleTimeString()}
      </p>
    </div>
  );
};

export const AdminReviewPage = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  async function fetchData() {
    await axios
      .get('https://intuzaeats.uz/api/v1/feedback/?format=json', {
        headers: {
          Authorization: 'Token a65b6c2fcfaf601b4f468f9121b4aa6d3eab6cb2'
        }
      })
      .then((res) => {
        setData(res?.data);
        setIsLoading(false);
      })
      .catch((err) => console.log(err));
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className={style.review}>
      <div className={style.title}>
        <p>Reviewer</p>
        <p>Review</p>
        <p>Status</p>
      </div>
      {!isLoading ? (
        data.length !== 0 ? (
          data?.map((item, i) => (
            <ReviewCard
              key={item.published_date + i}
              feed={item}
            />
          ))
        ) : (
          <h1 className={style.status}>Empty</h1>
        )
      ) : (
        <h1 className={style.status}>Loading</h1>
      )}
    </div>
  );
};
