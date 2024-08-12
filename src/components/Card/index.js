import React from 'react';
import ContentLoader from 'react-content-loader';

import { AppContext } from '../../App';

import styles from './Card.module.scss';

function Card({ onPlus, onFavorite, loading, id, title, urlImage, price }) {
  const { isAddToFavorites, isAddToCart } = React.useContext(AppContext);

  const onClickPlus = () => {
    onPlus({ id, parentId: id, title, urlImage, price });
  };

  const onClickFavorite = () => {
    // console.log(item);
    onFavorite({ id, parentId: id, title, urlImage, price });
  };

  return loading ? (
    <ContentLoader
      speed={2}
      width={210}
      height={281}
      viewBox="0 0 210 260"
      backgroundColor="#f3f3f3"
      foregroundColor="#ecebeb"
      className="contentLoader"
      style={{ border: '1px solid #f3f3f3', borderRadius: '40px' }}
    >
      <rect x="20" y="20" rx="10" ry="10" width="150" height="126" />
      <rect x="20" y="162" rx="10" ry="10" width="150" height="15" />
      <rect x="20" y="181" rx="10" ry="10" width="93" height="15" />
      <rect x="20" y="218" rx="10" ry="10" width="80" height="24" />
      <rect x="156" y="210" rx="10" ry="10" width="32" height="32" />
    </ContentLoader>
  ) : (
    <div className={styles.card}>
      {onFavorite && (
        <div className={styles.favorite}>
          <img
            onClick={onClickFavorite}
            src={isAddToFavorites(id) ? 'img/liked.svg' : 'img/unliked.svg'}
            alt="Unliked"
          />
        </div>
      )}
      <img width={150} height={126} src={urlImage} alt="Sneaker" />
      <h5>{title}</h5>
      <div className={styles.cardBottom}>
        <div className={styles.cardInfo}>
          <span>Цена:</span>
          <b>{price} руб.</b>
        </div>
        {onPlus && (
          <img
            onClick={onClickPlus}
            className={styles.button}
            src={isAddToCart(id) ? 'img/btn-checked.svg' : 'img/btn-plus.svg'}
            alt="Plus"
          />
        )}
      </div>
    </div>
  );
}

export default Card;
