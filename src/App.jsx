import React from 'react';
import axios from 'axios';
import { Route, Routes } from 'react-router-dom';

import Drawer from './Components/Drawer';
import Header from './Components/Header';
import Home from './Pages/Home';
import Favorites from './Pages/Favorites';
import Orders from './Components/Orders';

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
    try {
      (async () => {
        const responseItems = await axios.get('https://751e092a9f248e19.mokky.dev/items');
        const responseCartItems = await axios.get('https://751e092a9f248e19.mokky.dev/cart');
        const responseFavoriteItems = await axios.get(
          'https://751e092a9f248e19.mokky.dev/favorited'
        );
        setIsLoading(false);

        setItems(responseItems.data);
        setCartItems(responseCartItems.data);
        setFavoriteItems(responseFavoriteItems.data);
      })();
    } catch (error) {
      alert('Не удалось загрузить страницу!');
      console.error(error);
    }
  }, []);

  const onAddToCart = async (cartItemAdd) => {
    try {
      const findItem = cartItems.find((item) => item.parentId === cartItemAdd.id);
      if (findItem) {
        axios.delete(`https://751e092a9f248e19.mokky.dev/cart/${findItem.id}`);
        setCartItems((prev) => prev.filter((item) => item.parentId !== cartItemAdd.id));
      } else {
        setCartItems((prev) => [...prev, cartItemAdd]);
        const { data } = await axios.post('https://751e092a9f248e19.mokky.dev/cart', cartItemAdd);
        setCartItems((prev) =>
          prev.map((item) => {
            if (item.parentId === data.parentId) {
              return { ...item, id: data.id };
            }
            return item;
          })
        );
      }
    } catch (error) {
      alert('Не удалось добавит в карзину!');
      console.error(error);
    }
  };

  const onAddToFavorite = async (favoritedItemAdd) => {
    try {
      const findItem = favoriteItems.find(
        (item) => Number(item.parentId) === Number(favoritedItemAdd.id)
      );
      if (findItem) {
        setFavoriteItems((prev) => prev.filter((item) => item.parentId !== favoritedItemAdd.id));
        axios.delete(`https://751e092a9f248e19.mokky.dev/favorited/${findItem.id}`);
      } else {
        setFavoriteItems((prev) => [...prev, favoritedItemAdd]);
        const { data } = await axios.post(
          'https://751e092a9f248e19.mokky.dev/favorited',
          favoritedItemAdd
        );
        setFavoriteItems((prev) =>
          prev.map((item) => {
            if (item.parentId === data.parentId) {
              return { ...item, id: data.id };
            }
            return item;
          })
        );
      }
    } catch (error) {
      alert('Не удалось добавить в избранное!');
      console.error(error);
    }
  };

  const onRemoveFromCart = (id) => {
    axios.delete(`https://751e092a9f248e19.mokky.dev/cart/${id}`);
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const onChangeSearchInput = (event) => {
    setSearchValue(event.target.value);
  };

  const isAddToCart = (id) => {
    return cartItems.some((item) => Number(item.parentId) === Number(id));
  };

  const isAddToFavorites = (id) =>
    favoriteItems.some((item) => Number(item.parentId) === Number(id));

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
        <Drawer
          items={cartItems}
          onRemove={(item) => onRemoveFromCart(item)}
          clickCloseCart={openCloseCart}
          opened={cartOpened}
        />
        <Header clickOpenCart={openCloseCart} />
        <Routes>
          <Route
            path="react-sneakers/"
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
            path="react-sneakers/favorites"
            element={<Favorites onAddToCart={onAddToCart} onAddToFavorite={onAddToFavorite} />}
            exact
          />
          <Route path="react-sneakers/orders" element={<Orders />} exact />
        </Routes>
      </div>
    </AppContext.Provider>
  );
}

export default App;
