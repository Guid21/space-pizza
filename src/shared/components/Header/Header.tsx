import React from 'react';
import firebase from 'firebase';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useAuthState } from 'react-firebase-hooks/auth';

import Select from '../Select';
import Button from '../Button';
import Cart from '../DropCart';
import { Store } from '../../../store';
import { CurrencyActions } from '../../../store/currency/currency.actions';

const Header = () => {
  const dispatch = useDispatch();
  const [user] = useAuthState(firebase.auth());

  const {
    currency: {
      data: { selectedCurrency: currency },
    },
  } = useSelector((state: Store) => state);

  return (
    <nav className="fixed z-40 w-full bg-white border-b border-gray-300">
      <div className="container flex flex-row items-center justify-between h-16">
        <Link to="/" aria-current="page" className="flex-shrink-0 text-2xl">
          Space Pizza
        </Link>
        <div className="flex flex-row justify-center space-x-2">
          <Select
            onChange={(e) =>
              dispatch({
                type: CurrencyActions.SetCurrency,
                payload: e.target.value.toLowerCase(),
              })
            }
            value={currency.toUpperCase()}
            className="px-3 py-2 text-sm font-bold text-center text-orange-500 bg-white border border-orange-500 rounded-lg hover:text-orange-600 hover:border-orange-600 focus:outline-none focus:shadow-outline"
            noWrap
          >
            <option>EUR</option>
            <option>USD</option>
          </Select>
          {user ? (
            <Link to="/history">
              <Button>History</Button>
            </Link>
          ) : (
            <Link to="/auth">
              <Button>Login</Button>
            </Link>
          )}
          <Cart />
        </div>
      </div>
    </nav>
  );
};

export default Header;
