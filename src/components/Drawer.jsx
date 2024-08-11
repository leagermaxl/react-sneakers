import React from 'react';
import axios from 'axios';

import Info from './Info';
import { AppContext } from '../App';

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function Drawer({ items = [], onRemove, clickCloseCart }) {
  const { cartItems, setCartItems } = React.useContext(AppContext);
  const [orderId, setOrderId] = React.useState(null);
  const [isOrderComplete, setIsOrderComlete] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  const onClickOrder = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.post('https://751e092a9f248e19.mokky.dev/orders', {
        items: cartItems,
      });
      setIsOrderComlete(true);

      for (let i = 0; i < cartItems.length; i++) {
        const item = cartItems[i];
        await axios.delete(`https://66ae1047b18f3614e3b6a785.mockapi.io/cart/${item.id}`);
        delay(1000);
      }
      setCartItems([]);

      setOrderId(data.id);
    } catch (error) {
      alert('Не удалось создать заказ!');
    }
    setIsLoading(false);
  };

  return (
    <div className="overlay">
      <div className="drawer">
        <h2>
          Корзина{' '}
          <img
            onClick={clickCloseCart}
            className="btn-remove"
            src="img/btn-remove.svg"
            alt="Close"
          />
        </h2>

        {items.length !== 0 ? (
          <div className="cartNoEmpty">
            <div className="items">
              {items.map((item) => (
                <div key={item.id} className="cart-item">
                  <img width={70} height={70} src={item.urlImage} alt="sneaker" />
                  <div className="cart-info">
                    <p>{item.title}</p>
                    <b>{item.price} руб.</b>
                  </div>
                  <img
                    onClick={() => {
                      onRemove(item.id);
                    }}
                    className="btn-remove"
                    src="img/btn-remove.svg"
                    alt="Remove"
                  />
                </div>
              ))}
            </div>
            <div className="cardTotalBlock">
              <ul>
                <li>
                  <span>Итого:</span>
                  <div></div>
                  <b>21 498 руб.</b>
                </li>
                <li>
                  <span>Налог 5%:</span>
                  <div></div>
                  <b>1074 руб.</b>
                </li>
              </ul>
              <button className="greenButton" onClick={onClickOrder} disabled={isLoading}>
                Оформить заказ <img src="img/arrow.svg" alt="Arrow" />
              </button>
            </div>
          </div>
        ) : (
          //
          //Корзина пустая
          //Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ.
          <Info
            title={isOrderComplete ? 'Заказ оформлен!' : 'Корзина пустая'}
            description={
              isOrderComplete
                ? `Ваш заказ №${orderId} скоро будет передан курьерской доставке`
                : 'Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ.'
            }
            urlImage={isOrderComplete ? 'img/order-complete.svg' : 'img/cart-empty.svg'}
            clickCloseCart={clickCloseCart}
          />
        )}
      </div>
    </div>
  );
}

export default Drawer;
