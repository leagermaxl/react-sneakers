import React from "react";

function Drawer({ items = [], onRemove, clickCloseCart }) {
  return (
    <div className="overlay">
      <div className="drawer">
        <h2>
          Корзина{" "}
          <img
            onClick={clickCloseCart}
            className="btn-remove"
            src="img/btn-remove.svg"
            alt="Close"
          />
        </h2>
        {items.length !== 0 ? (
          <div className="items">
            {items.map((item) => (
              <div className="cartNoEmpty">
                <div className="cart-item">
                  <img width={70} height={70} src={item.urlImage} alt="sneaker" />
                  <div className="cart-info">
                    <p>{item.title}</p>
                    <b>{item.price} руб.</b>
                  </div>
                  <img
                    onClick={() => onRemove(item.id)}
                    className="btn-remove"
                    src="img/btn-remove.svg"
                    alt="Remove"
                  />
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
                  <button className="greenButton">
                    Оформить заказ <img src="img/arrow.svg" alt="Arrow" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="cartEmp">
            <div className="cartEmpty">
              <img width={120} height={120} src="/img/cart-empty.svg" alt="Empty Cart" />
              <h3>Корзина пустая</h3>
              <p>Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ.</p>
              <button className="greenButton" onClick={clickCloseCart}>
                <img src="img/arrow.svg" alt="Arrow" />
                Вернуться назад
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Drawer;
