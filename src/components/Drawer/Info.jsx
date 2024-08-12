import React from 'react';

import styles from './Drawer.module.scss';

function Info({ title, description, urlImage, clickCloseCart }) {
  return (
    <div className={styles.cartEmptyBlock}>
      <div className={styles.cartEmpty}>
        <img width={120} height={120} src={urlImage} alt="Empty Cart" />
        <h3>{title}</h3>
        <p>{description}</p>
        <button className={styles.greenButton} onClick={clickCloseCart}>
          <img src="img/arrow.svg" alt="Arrow" />
          Вернуться назад
        </button>
      </div>
    </div>
  );
}

export default Info;
