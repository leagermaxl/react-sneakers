import React from "react";
import styles from "./Card.module.scss";

function Card({ urlImage, title, price, onPlus }) {
  const [clickAdd, setClickAdd] = React.useState(false);

  const onClickPlus = () => {
    onPlus({ title, price, urlImage });
    setClickAdd(!clickAdd);
  };

  return (
    <div className={styles.card}>
      <div className={styles.favorite}>
        <img src="img/heart-unliked.svg" alt="unliked" />
      </div>
      <img width={133} height={112} src={urlImage} alt="sneaker" />
      <h5>{title}</h5>
      <div className={styles.cardBottom}>
        <div className={styles.cardInfo}>
          <span>Цена:</span>
          <b>{price} руб.</b>
        </div>
        <img
          onClick={onClickPlus}
          className={styles.button}
          src={!clickAdd ? "img/btn-plus.svg" : "img/btn-checked.svg"}
          alt="Plus"
        />
      </div>
    </div>
  );
}

export default Card;
