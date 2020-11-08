import { Dispatch } from 'react';

import { store } from '..';
import { CartAction } from './cart.reducer';
import { CartActions } from './cart.actions';
import { Pizza } from '../pizza/pizza.reducer';

interface ISetCart {
  type: 'increment' | 'decrement';
  payload: Pizza;
}

export const setCart = ({ type, payload }: ISetCart) => async (
  dispatch: Dispatch<CartAction>
) => {
  const state = store.getState();
  const product = state.cart.data.items.find(
    ({ item: { id } }) => id === payload.id
  );

  if (type === 'increment') {
    if (product) {
      dispatch({ type: CartActions.IncrementCart, payload: payload.id });
    } else {
      dispatch({
        type: CartActions.AddCart,
        payload: { item: payload, qty: 1 },
      });
    }
  } else if (type === 'decrement') {
    if (product && product.qty > 1) {
      dispatch({ type: CartActions.DecrementCart, payload: payload.id });
    } else if (product && product.qty === 1) {
      dispatch({
        type: CartActions.RemoveCart,
        payload: payload.id,
      });
    }
  }
};
