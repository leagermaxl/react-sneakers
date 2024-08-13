import React from 'react';
// import axios from 'axios';
import { Link } from 'react-router-dom';
import Card from '../Components/Card';
import { AppContext } from '../App';

function Favorites({ onAddToCart, onAddToFavorite }) {
  const { favoriteItems } = React.useContext(AppContext);

  return favoriteItems.length !== 0 ? (
    <div className="content">
      <div className="content-top-favorites">
        <Link to={'/react-sneakers/'}>
          <img src="img/btn-back.svg" alt="Back" />
        </Link>
        <h1>Мои закладки</h1>
      </div>
      <div className="sneakers">
        {favoriteItems.map((obj, index) => (
          <Card
            key={index}
            onPlus={onAddToCart}
            onFavorite={onAddToFavorite}
            {...obj}
            id={obj.parentId}
          />
        ))}
      </div>
    </div>
  ) : (
    <div className="emptyFavoritesAndOrders">
      <img width={70} height={70} src="img/emoji-favorites.svg" alt="Emoji" />
      <div className="emptyFavoritesAndOrdersInfo">
        <h3>Закладок нет :(</h3>
        <p>Вы ничего не добавляли в закладки</p>
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
export default Favorites;
