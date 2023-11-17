import axios from 'axios';
import React, { useState } from 'react';
import { useEffect } from 'react';
import Swal from 'sweetalert2';

export const AdminHomePage = () => {
  const [percent, setPercent] = useState(0);
  const getPercent = async () => {
    await fetch('https://intuzaeats.uz/api/v1/service-percent/1', {
      method: 'GET',
      headers: {
        Authorization: 'Token a65b6c2fcfaf601b4f468f9121b4aa6d3eab6cb2'
      }
    })
      .then((res) => setPercent(res?.data?.percent))
      .catch((err) => console.log(err));
  };

  const patchPercent = async () => {
    const per = new FormData();
    per.append('percent', percent);
    console.log(percent);
    await axios
      .patch('https://intuzaeats.uz/api/v1/service-percent/1', per, {
        headers: {
          Authorization: 'Token a65b6c2fcfaf601b4f468f9121b4aa6d3eab6cb2'
        }
      })
      .then((res) => {
        Swal.fire({
          icon: 'success',
          title: 'Обновлено'
        });
        getPercent();
      });
  };

  useEffect(() => {
    getPercent();
  }, []);

  return (
    <div>
      <label htmlFor="percent">
        <h3>Укажите процент вашего обслуживания</h3>
        <input
          type="number"
          id="percent"
          value={percent || ''}
          onChange={(e) => setPercent(+e.target.value)}
        />
      </label>
      <button onClick={patchPercent}>Send</button>
    </div>
  );
};
