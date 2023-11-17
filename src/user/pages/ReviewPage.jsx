import axios from 'axios';
import { useState } from 'react';
import Swal from 'sweetalert2';
import { okStar, noStar } from '../assets';
import styles from './ReviewPage.module.css';

const StarRating = ({ rating, setRating }) => {
  return (
    <>
      {[...Array(5)].map((star, index) => {
        index += 1;
        return (
          <button
            type="button"
            key={index}
            onClick={() => setRating(index)}
          >
            {index <= rating ? (
              <img
                src={okStar}
                alt="StarRating"
              />
            ) : (
              <img
                src={noStar}
                alt="StarRating"
              />
            )}
          </button>
        );
      })}
    </>
  );
};

export const ReviewPage = () => {
  const [fullName, setFullName] = useState('');
  const [number, setNumber] = useState('');
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(0);

  async function handlePost() {
    const feedBk = {
      fullname: fullName,
      phone_number: number,
      comment: comment,
      stars: rating,
      cafe: 1
    };
    await axios
      .post('https://intuzaeats.uz/api/v1/feedback/', feedBk, {
        headers: {
          Authorization: 'Token a65b6c2fcfaf601b4f468f9121b4aa6d3eab6cb2'
        }
      })
      .then((res) => {
        Swal.fire({
          icon: 'success',
          title: 'Косылды',
          text: 'Пикир ушин рахмет :)'
        });
        setFullName('');
        setComment('');
        setRating('');
        setNumber('');
      })
      .catch((err) => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Кателик кетти'
        });
      });
  }

  return (
    <div className={styles.feedback}>
      <h3>Пикир</h3>
      <p>Биз туралы пикирингиз</p>
      <div className={styles.ball}>
        <StarRating
          rating={rating}
          setRating={setRating}
        />
      </div>
      <input
        type="text"
        placeholder="Атынгыз"
        value={fullName}
        required
        onChange={(e) => {
          setFullName(e.target.value);
        }}
      />
      <input
        type="text"
        placeholder="Телефон номерингиз"
        value={number}
        required
        onChange={(e) => {
          setNumber(e.target.value);
        }}
      />
      <p>Пикирингизди жазып калдырынг</p>
      <textarea
        rows={4}
        required
        cols={35}
        value={comment}
        onChange={(e) => {
          setComment(e.target.value);
        }}
      />
      <div
        className={styles.Send}
        onClick={() => {
          if (JSON.stringify(rating) === 0) {
            Swal.fire({
              icon: 'info',
              title: 'Жулдызлармен баха беринг'
            });
          } else {
            handlePost();
          }
        }}
      >
        Жиберу
      </div>
    </div>
  );
};
