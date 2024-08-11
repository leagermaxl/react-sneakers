import React from 'react';
// import axios from 'axios';
import { Link } from 'react-router-dom';
import Card from '../Components/Card';
import { AppContext } from '../App';

function Favorites({ onAddToCart, onAddToFavorite }) {
  const state = React.useContext(AppContext);

  // React.useEffect(() => {
  //   axios
  //     .get('https://66ae1047b18f3614e3b6a785.mockapi.io/favorited')
  //     .then((res) => setFavorite(res.data));
  // }, []);
  return state.favoriteItems.length !== 0 ? (
    <div className="content">
      <div className="content-top-favorites">
        <Link to={'/'}>
          <img src="img/btn-back.svg" alt="Back" />
        </Link>
        <h1>Мои закладки</h1>
      </div>
      <div className="sneakers">
        {state.favoriteItems.map((obj, index) => (
          <Card key={index} onPlus={onAddToCart} onFavorite={onAddToFavorite} {...obj} />
        ))}
      </div>
    </div>
  ) : (
    <div className="emptyFavorites">
      <img width={70} height={70} src="img/emoji-favorites.png" alt="Emoji" />
      <div className="emptyFavoritesInfo">
        <h3>Закладок нет :(</h3>
        <p>Вы ничего не добавляли в закладки</p>
      </div>
      <Link to={'/'}>
        <button className="greenButton">
          <img src="img/arrow.svg" alt="Arrow" />
          Вернуться назад
        </button>
      </Link>
    </div>
  );
}
export default Favorites;
