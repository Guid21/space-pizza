import { PizzaActions } from './pizza.actions';

export interface Pizza {
  id: number;
  img: string;
  name: string;
  description: string;
  prices: {
    eur: number;
    usd: number;
  };
}

type Data = {
  items: Pizza[];
  total: number;
};

export type PizzaState = {
  data: Data;
  isLoading: boolean;
  isError: boolean;
};

const initialState: PizzaState = {
  data: {
    items: [],
    total: 0,
  },
  isLoading: false,
  isError: false,
};

export type PizzaAction = {
  type: PizzaActions;
  payload?: Data;
};

export default function pizzaReducer(
  state = initialState,
  { type, payload }: PizzaAction
): PizzaState {
  switch (type) {
    case PizzaActions.GetPizza:
      return {
        ...state,
        isError: false,
        isLoading: true,
      };
    case PizzaActions.GetPizzaError:
      return {
        ...state,
        isError: true,
        isLoading: false,
      };
    case PizzaActions.GetPizzaSuccess:
      return {
        ...state,
        isError: true,
        isLoading: true,
        data: payload!,
      };
    default:
      return state;
  }
}
