import React from 'react';
import { AppContext } from '../App';

//img/cart-empty.svg
//Корзина пустая
//Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ.

function Info({ title, description, urlImage, clickCloseCart }) {
  const { setCartOpened } = React.useContext(AppContext);
  return (
    <div className="cartEmptyBlock">
      <div className="cartEmpty">
        <img width={120} height={120} src={urlImage} alt="Empty Cart" />
        <h3>{title}</h3>
        <p>{description}</p>
        <button className="greenButton" onClick={clickCloseCart}>
          <img src="img/arrow.svg" alt="Arrow" />
          Вернуться назад
        </button>
      </div>
    </div>
  );
}

export default Info;
