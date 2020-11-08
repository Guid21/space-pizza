import firebase from 'firebase';
import { Dispatch } from 'react';

import { PizzaActions } from './pizza.actions';
import { PizzaAction, Pizza } from './pizza.reducer';

export const getPizza = () => async (dispatch: Dispatch<PizzaAction>) => {
  dispatch({ type: PizzaActions.GetPizza });

  try {
    const { docs } = await firebase.firestore().collection('pizza').get();
    const pizza: Pizza[] = docs
      .map((doc) => doc.data())
      .sort((a, b) => (a.id > b.id ? 1 : -1)) as Pizza[];

    dispatch({
      type: PizzaActions.GetPizzaSuccess,
      payload: { items: pizza, total: pizza.length },
    });
  } catch (err) {
    dispatch({ type: PizzaActions.GetPizzaError });
  }
};
