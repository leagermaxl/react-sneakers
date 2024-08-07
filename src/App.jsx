import React from "react";
import axios from "axios";
import Card from "./components/Card";
import Drawer from "./components/Drawer";
import Header from "./components/Header";

function App() {
  const openCloseCart = () => setCartOpened(!cartOpened);
  const [cartOpened, setCartOpened] = React.useState(false);
  const [items, setItems] = React.useState([]);
  const [cartItems, setCartItems] = React.useState([]);

  React.useEffect(() => {
    axios
      .get("https://66ae1047b18f3614e3b6a785.mockapi.io/items")
      .then((res) => setItems(res.data));

    axios
      .get("https://66ae1047b18f3614e3b6a785.mockapi.io/cart")
      .then((res) => setCartItems(res.data));
  }, []);

  const onAddToCart = (cartItemAdd) => {
    axios.post("https://66ae1047b18f3614e3b6a785.mockapi.io/cart", cartItemAdd);
    setCartItems((prev) => [...prev, cartItemAdd]);
  };

  const onRemoveFromCart = (id) => {
    axios.delete(`https://66ae1047b18f3614e3b6a785.mockapi.io/cart/${id}`);
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <div className="wrapper">
      {cartOpened && (
        <Drawer
          items={cartItems}
          onRemove={(item) => onRemoveFromCart(item)}
          clickCloseCart={openCloseCart}
        />
      )}
      <Header clickOpenCart={openCloseCart} />

      <div className="content">
        <div className="content-top">
          <h1>Все кроссовки</h1>
          <div className="search-block">
            <img src="/img/search.svg" alt="search" />
            <input placeholder="Поиск..." />
          </div>
        </div>
        <div className="sneakers">
          {items.map((obj, index) => (
            <Card
              key={index}
              title={obj.title}
              price={obj.price}
              urlImage={obj.urlImage}
              onPlus={onAddToCart}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
