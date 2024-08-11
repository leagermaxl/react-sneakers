import React from 'react';
import Card from '../Components/Card';
import { AppContext } from '../App';

function Home({
  searchValue,
  setSearchValue,
  onChangeSearchInput,
  onAddToCart,
  onAddToFavorite,
  isLoading,
}) {
  const state = React.useContext(AppContext);

  const renderItems = () => {
    const filteredItems = state.items.filter((item) =>
      item.title.toLowerCase().includes(searchValue.toLowerCase())
    );
    return (isLoading ? [...Array(8)] : filteredItems).map((obj, index) => (
      <Card
        key={index}
        onPlus={onAddToCart}
        onFavorite={onAddToFavorite}
        loading={isLoading}
        {...obj}
      />
    ));
  };

  return (
    <div className="content">
      <div className="content-top">
        <h1>{searchValue ? `Поиск по запросу "${searchValue}"` : 'Все кроссовки'}</h1>
        <div className="search-block">
          <img src="img/search.svg" alt="search" />
          {searchValue && (
            <img
              className="clear btn-remove"
              onClick={() => setSearchValue('')}
              src="img/btn-remove.svg"
              alt="Clear"
            />
          )}
          <input onChange={onChangeSearchInput} value={searchValue} placeholder="Поиск..." on />
        </div>
      </div>
      <div className="sneakers">{renderItems()}</div>
    </div>
  );
}

export default Home;
