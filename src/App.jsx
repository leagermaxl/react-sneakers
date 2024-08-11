import React from 'react';
import axios from 'axios';
import { Route, Routes } from 'react-router-dom';

import Drawer from './Components/Drawer';
import Header from './Components/Header';
import Home from './Pages/Home';
import Favorites from './Pages/Favorites';

export const AppContext = React.createContext({});

function App() {
  const openCloseCart = () => setCartOpened(!cartOpened);
  const [cartOpened, setCartOpened] = React.useState(false);
  const [searchValue, setSearchValue] = React.useState('');
  const [items, setItems] = React.useState([]);
  const [cartItems, setCartItems] = React.useState([]);
  const [favoriteItems, setFavoriteItems] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    async function fetchData() {
      const responseItems = await axios.get('https://751e092a9f248e19.mokky.dev/items');

      const responseCartItems = await axios.get('https://66ae1047b18f3614e3b6a785.mockapi.io/cart');

      const responseFavoriteItems = await axios.get(
        'https://66ae1047b18f3614e3b6a785.mockapi.io/favorited'
      );

      setIsLoading(false);

      setItems(responseItems.data);
      setCartItems(responseCartItems.data);
      setFavoriteItems(responseFavoriteItems.data);
    }
    fetchData();
  }, []);

  const onAddToCart = async (cartItemAdd) => {
    try {
      if (cartItems.some((item) => item.id === cartItemAdd.id)) {
        axios.delete(`https://66ae1047b18f3614e3b6a785.mockapi.io/cart/${cartItemAdd.id}`);
        setCartItems((prev) => prev.filter((item) => item.id !== cartItemAdd.id));
      } else {
        const { data } = await axios.post(
          'https://66ae1047b18f3614e3b6a785.mockapi.io/cart',
          cartItemAdd
        );
        setCartItems((prev) => [...prev, data]);
      }
    } catch {
      alert('Не удалось добавит в карзину!');
    }
    // {
    //   console.log(prev);
    //   const id = prev.length !== 0 ? prev[prev.length - 1].id || 0 : 0;
    //   return [...prev, { ...cartItemAdd, id: id + 1 }];
    // }

    // setCartItems((prev) => [...prev, { cartItemAdd,  prev[prev.length-1].}]);
  };

  const onAddToFavorite = async (favoritedItemAdd) => {
    try {
      if (favoriteItems.find((item) => Number(item.id) === Number(favoritedItemAdd.id))) {
        setFavoriteItems((prev) => prev.filter((item) => item.id !== favoritedItemAdd.id));
        axios.delete(
          `https://66ae1047b18f3614e3b6a785.mockapi.io/favorited/${favoritedItemAdd.id}`
        );
        console.log('delete', favoritedItemAdd);
      } else {
        const { data } = await axios.post(
          'https://66ae1047b18f3614e3b6a785.mockapi.io/favorited',
          favoritedItemAdd
        );
        console.log('add', favoritedItemAdd, data);
        setFavoriteItems((prev) => [...prev, data]);
      }
    } catch (error) {
      alert('Не удалось добавить в избранное!');
    }
  };

  const onRemoveFromCart = (id) => {
    axios.delete(`https://66ae1047b18f3614e3b6a785.mockapi.io/cart/${id}`);
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const onChangeSearchInput = (event) => {
    setSearchValue(event.target.value);
  };

  const isAddToCart = (id) => {
    // console.log('isADDED to cart', id);
    return cartItems.some((item) => Number(item.id) === Number(id));
  };
  const isAddToFavorites = (id) => favoriteItems.some((item) => Number(item.id) === Number(id));

  return (
    <AppContext.Provider
      value={{
        items,
        favoriteItems,
        cartItems,
        isAddToCart,
        isAddToFavorites,
        setCartOpened,
        setCartItems,
      }}
    >
      <div className="wrapper">
        {cartOpened && (
          <Drawer
            items={cartItems}
            onRemove={(item) => onRemoveFromCart(item)}
            clickCloseCart={openCloseCart}
          />
        )}
        <Header clickOpenCart={openCloseCart} />
        <Routes>
          <Route
            path="/"
            element={
              <Home
                searchValue={searchValue}
                setSearchValue={setSearchValue}
                onChangeSearchInput={onChangeSearchInput}
                onAddToCart={onAddToCart}
                onAddToFavorite={onAddToFavorite}
                isLoading={isLoading}
              />
            }
            exact
          />
          <Route
            path="/favorites"
            element={<Favorites onAddToCart={onAddToCart} onAddToFavorite={onAddToFavorite} />}
            exact
          />
        </Routes>
      </div>
    </AppContext.Provider>
  );
}

export default App;
