import React from 'react';
import axios from 'axios';

import Info from './Info';
import { useCart } from '../Hooks/useCart';

import styles from './Drawer.module.scss';

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function Drawer({ items = [], onRemove, clickCloseCart, opened }) {
  const [orderId, setOrderId] = React.useState(null);
  const [isOrderComplete, setIsOrderComlete] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  const { cartItems, setCartItems, totalPrice } = useCart();

  const onClickOrder = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.post('https://751e092a9f248e19.mokky.dev/orders', {
        items: cartItems,
      });
      setIsOrderComlete(true);

      for (let i = 0; i < cartItems.length; i++) {
        const item = cartItems[i];
        await axios.delete(`https://751e092a9f248e19.mokky.dev/cart/${item.id}`);
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
    <div className={`${styles.overlay} ${opened ? styles.overlayVisible : ''}`}>
      <div className={styles.drawer}>
        <h2>
          Корзина
          <img
            onClick={clickCloseCart}
            className={styles.btnRemove}
            src="img/btn-remove.svg"
            alt="Close"
          />
        </h2>
        {items.length !== 0 ? (
          <div className={styles.cartNoEmpty}>
            <div className={styles.items}>
              {items.map((item) => (
                <div key={item.id} className={styles.cartItem}>
                  <img width={70} height={70} src={item.urlImage} alt="sneaker" />
                  <div className={styles.cartInfo}>
                    <p>{item.title}</p>
                    <b>{item.price} руб.</b>
                  </div>
                  <img
                    onClick={() => {
                      onRemove(item.id);
                    }}
                    className={styles.btnRemove}
                    src="img/btn-remove.svg"
                    alt="Remove"
                  />
                </div>
              ))}
            </div>
            <div className={styles.cardTotalBlock}>
              <ul>
                <li>
                  <span>Итого:</span>
                  <div></div>
                  <b>{totalPrice} руб.</b>
                </li>
                <li>
                  <span>Налог 5%:</span>
                  <div></div>
                  <b>{(totalPrice * 0.05).toFixed(2)} руб.</b>
                </li>
              </ul>
              <button className={styles.greenButton} onClick={onClickOrder} disabled={isLoading}>
                Оформить заказ <img src="img/arrow.svg" alt="Arrow" />
              </button>
            </div>
          </div>
        ) : (
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
