import axios from 'axios';
import { useEffect, useState } from 'react';
import { del, edit } from '../assets';
import style from './ProductsPage.module.css';
import Swal from 'sweetalert2';

const ProductCard = ({ data, handleDelete, fetchData }) => {
  const { image, name, id } = data;

  const handleEdit = async (id) => {
    const { value: formValues } = await Swal.fire({
      title: 'Edit food',
      html:
        `<label for="swal-input1">Name</label><input id="swal-input1" value="${name}" class="swal2-input"><br>` +
        `<div style="display:flex;align-items:center;gap:70px;justify-content:center;"><img src=${image} style="width: 74px; height: 74px; object-fit: cover;" /><input type="file" value=${image} accept="image/*" id="myFileInput"></div>`,
      showCancelButton: true,
      preConfirm: () => {
        return {
          image: document.getElementById('myFileInput').files[0] || image,
          name: document.getElementById('swal-input1').value
        };
      }
    });

    if (formValues) {
      if (formValues.image !== image || formValues.name !== name) {
        console.log(typeof formValues.image);
        const formValuesData = new FormData();
        formValuesData.append('name', formValues.name);
        formValuesData.append('image', formValues.image);
        await axios
          .patch(`https://intuzaeats.uz/api/v1/menu/${id}`, formValuesData, {
            headers: {
              'Content-Type':
                'multipart/form-data; boundary=----WebKitFormBoundaryABC123',
              Authorization: 'Token a65b6c2fcfaf601b4f468f9121b4aa6d3eab6cb2'
            }
          })
          .then((res) => {
            Swal.fire({
              icon: 'success',
              title: 'Успешно обновлено'
            });
            fetchData();
          })
          .catch((err) =>
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Что-то пошло не так, попробуйте снова'
            })
          );
      }
    }
  };

  return (
    <div className={style.ProductCard}>
      <div className={style.productCardInfo}>
        <img src={image} />
        <span>{name}</span>
      </div>
      <div className={style.productCardInfo}>
        <button onClick={() => handleEdit(id)}>
          <img
            className={style.icon}
            src={edit}
          />
        </button>
        <button onClick={() => handleDelete(id)}>
          <img
            className={style.icon}
            src={del}
          />
        </button>
      </div>
    </div>
  );
};

export const AdminCatalogPage = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  async function fetchData() {
    await axios
      .get('https://intuzaeats.uz/api/v1/menu/?format=json', {
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

  const handleDelete = async (id) => {
    Swal.fire({
      title: 'Точно удалить?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes'
    }).then(async (result) => {
      if (result.isConfirmed) {
        await axios.delete(`https://intuzaeats.uz/api/v1/menu/${id}`, {
          headers: {
            Authorization: 'Token a65b6c2fcfaf601b4f468f9121b4aa6d3eab6cb2'
          }
        });
        fetchData();
      }
    });
  };

  const handlePost = async () => {
    const { value: formValues } = await Swal.fire({
      title: 'Добавить элемент',
      html:
        `<label for="swal-input1">Name</label><input id="swal-input1" class="swal2-input"><br><br>` +
        `<input type="file" accept="image/*" id="myFileInput">`,
      showCancelButton: true,
      preConfirm: () => {
        return {
          image: document.getElementById('myFileInput').files[0],
          name: document.getElementById('swal-input1').value
        };
      }
    });

    if (formValues) {
      const formValuesData = new FormData();
      formValuesData.append('name', formValues.name);
      formValuesData.append('image', formValues.image);
      await axios
        .post(`https://intuzaeats.uz/api/v1/menu/`, formValuesData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: 'Token a65b6c2fcfaf601b4f468f9121b4aa6d3eab6cb2'
          }
        })
        .then((res) => fetchData())
        .catch((err) =>
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Что-то пошло не так, попробуйте снова'
          })
        );
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className={style.products}>
      <button
        className={style.btn}
        onClick={handlePost}
      >
        <span>+</span>
        <p>Add new</p>
      </button>
      {!isLoading ? (
        data.length !== 0 ? (
          data?.map((item) => (
            <ProductCard
              key={item.id}
              data={item}
              handleDelete={handleDelete}
              fetchData={fetchData}
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
