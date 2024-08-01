function App() {
  return (
    <div className="wrapper">
      <div style={{ display: "none" }} className="overlay">
        <div className="drawer">
          <h2>
            Корзина <img className="btn-remove" src="img/btn-remove.svg" alt="remove" />
          </h2>
          <div className="items">
            <div className="cart-item">
              <img width={70} height={70} src="img/sneakers/1.jpg" alt="sneaker" />
              <div className="cart-info">
                <p>Мужские Кроссовки Nike Air Max 270</p>
                <b>12 999 руб.</b>
              </div>
              <img className="btn-remove" src="img/btn-remove.svg" alt="remove" />
            </div>

            <div className="cart-item">
              <img width={70} height={70} src="img/sneakers/1.jpg" alt="sneaker" />
              <div className="cart-info">
                <p>Мужские Кроссовки Nike Air Max 270</p>
                <b>12 999 руб.</b>
              </div>
              <img className="btn-remove" src="img/btn-remove.svg" alt="remove" />
            </div>
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
      </div>

      <header>
        <div className="header-left">
          <img width={40} height={40} src="/img/logo.png" alt="logo" />
          <div className="header-info">
            <h3>React Sneakers</h3>
            <p>Магазин лучших кроссовок</p>
          </div>
        </div>
        <ul className="header-right">
          <li>
            <img width={18} height={18} src="/img/cart.svg" alt="cart" />
            <span>1205 руб.</span>
          </li>
          <li>
            <img width={18} height={18} src="/img/favorite.svg" alt="favorite" />
            <span>Закладки</span>
          </li>
          <li>
            <img width={18} height={18} src="/img/user.svg" alt="user" />
            <span>Профиль</span>
          </li>
        </ul>
      </header>

      <div className="content">
        <div className="content-top">
          <h1>Все кроссовки</h1>
          <div className="search-block">
            <img src="/img/search.svg" alt="search" />
            <input placeholder="Поиск..." />
          </div>
        </div>

        <div className="sneakers">
          <div className="card">
            <div className="favorite">
              <img src="img/heart-unliked.svg" alt="unliked" />
            </div>
            <img width={133} height={112} src="img/sneakers/1.jpg" alt="sneaker" />
            <h5>Мужские Кроссовки Nike Blazer Mid Suede</h5>
            <div className="card-bottom">
              <div className="card-info">
                <span>Цена:</span>
                <b>12 999руб.</b>
              </div>
              <button className="button">
                <img width={11} height={11} src="img/plus.svg" alt="Plus" />
              </button>
            </div>
          </div>

          <div className="card">
            <img width={133} height={112} src="img/sneakers/2.jpg" alt="sneaker" />
            <h5>Мужские Кроссовки Nike Blazer Mid Suede</h5>
            <div className="card-bottom">
              <div className="card-info">
                <span>Цена:</span>
                <b>12 999руб.</b>
              </div>
              <button className="button">
                <img width={11} height={11} src="img/plus.svg" alt="Plus" />
              </button>
            </div>
          </div>

          <div className="card">
            <img width={133} height={112} src="img/sneakers/3.jpg" alt="sneaker" />
            <h5>Мужские Кроссовки Nike Blazer Mid Suede</h5>
            <div className="card-bottom">
              <div className="card-info">
                <span>Цена:</span>
                <b>12 999руб.</b>
              </div>
              <button className="button">
                <img width={11} height={11} src="img/plus.svg" alt="Plus" />
              </button>
            </div>
          </div>

          <div className="card">
            <img width={133} height={112} src="img/sneakers/4.jpg" alt="sneaker" />
            <h5>Мужские Кроссовки Nike Blazer Mid Suede</h5>
            <div className="card-bottom">
              <div className="card-info">
                <span>Цена:</span>
                <b>12 999руб.</b>
              </div>
              <button className="button">
                <img width={11} height={11} src="img/plus.svg" alt="Plus" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
