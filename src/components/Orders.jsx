import React from 'react';
import axios from 'axios';

import { Link } from 'react-router-dom';

import Card from './Card';

function Orders() {
  const [orderItems, setOrderItems] = React.useState([]);

  React.useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get('https://751e092a9f248e19.mokky.dev/orders');
        setOrderItems(data);
      } catch (error) {
        alert('Не удалось получить список заказов.');
        console.error(error);
      }
    })();
  }, []);
  return orderItems.length !== 0 ? (
    <div className="content">
      <div className="content-top-favorites">
        <Link to={'/react-sneakers/'}>
          <img src="img/btn-back.svg" alt="Back" />
        </Link>
        <h1>Мои покупки</h1>
      </div>
      <div className="sneakers">
        {orderItems.map((obj, index) => {
          console.log(obj);
          return (
            <div className="ordersItem">
              <h2>Заказ №{index + 1}</h2>
              <div className="sneakers">
                {obj.items.map((item) => {
                  return <Card key={index} {...item} />;
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  ) : (
    <div className="emptyFavoritesAndOrders">
      <img width={70} height={70} src="img/emoji-orders.svg" alt="Emoji" />
      <div className="emptyFavoritesAndOrdersInfo">
        <h3>У вас нет заказов</h3>
        <p>Вы нищеброд?</p>
        <p>Оформите хотя бы один заказ.</p>
      </div>
      <Link to={'/react-sneakers/'}>
        <button className="greenButton">
          <img src="img/arrow.svg" alt="Arrow" />
          Вернуться назад
        </button>
      </Link>
    </div>
  );
}

export default Orders;
