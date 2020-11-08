import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

import currencyReducer, { CurrencyState } from './currency/currency.reducer';
import pizzaState, { PizzaState } from './pizza/pizza.reducer';
import cartState, { CartState } from './cart/cart.reducer';

export type Store = {
  currency: CurrencyState;
  pizza: PizzaState;
  cart: CartState;
};

const reducers = combineReducers({
  currency: currencyReducer,
  pizza: pizzaState,
  cart: cartState,
});

export const store = createStore(
  reducers,
  composeWithDevTools(applyMiddleware(thunk))
);
