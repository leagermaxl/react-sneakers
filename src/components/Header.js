import { Link } from 'react-router-dom';

import { useCart } from './Hooks/useCart';

function Header(props) {
  const { totalPrice } = useCart();

  return (
    <header>
      <Link to={'react-sneakers/'} exact>
        {' '}
        <div className="header-left">
          <img width={40} height={40} src="img/logo.png" alt="logo" />
          <div className="header-info">
            <h3>React Sneakers</h3>
            <p>Магазин лучших кроссовок</p>
          </div>
        </div>
      </Link>
      <ul className="header-right">
        <li className="btnHeader" onClick={props.clickOpenCart}>
          <img width={18} height={18} src="img/cart.svg" alt="cart" />
          <span>{totalPrice} руб.</span>
        </li>
        <Link to={'react-sneakers/favorites'} className="link">
          <li className="btnHeader">
            <img width={18} height={18} src="img/favorite.svg" alt="favorite" />
            <span>Закладки</span>
          </li>
        </Link>
        <Link to={'react-sneakers/orders'} className="link">
          <li>
            <img width={18} height={18} src="img/user.svg" alt="user" />
            <span>Профиль</span>
          </li>
        </Link>
      </ul>
    </header>
  );
}

export default Header;
