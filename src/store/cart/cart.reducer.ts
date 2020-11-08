import { Pizza } from '../pizza/pizza.reducer';
import { CartActions } from './cart.actions';

export interface Cart {
  item: Pizza;
  qty: number;
}

interface TotalPrice {
  eur: number;
  usd: number;
}

export interface CartData {
  items: Cart[];
  total: number;
  totalPrice: TotalPrice;
}

export type CartState = {
  data: CartData;
  isLoading: boolean;
  isError: boolean;
};

export type CartAction = {
  type: CartActions;
  payload: number | Cart;
};

const cart: CartData | null = JSON.parse(
  localStorage.getItem('cart') || 'null'
) as CartData | null;

const initialData = { items: [], total: 0, totalPrice: { eur: 0, usd: 0 } };

const initialState: CartState = {
  data: cart || initialData,
  isLoading: false,
  isError: false,
};

const getTotal = (items: Cart[]): Omit<CartData, 'items'> => {
  const usd = items.reduce((sum, product) => {
    return sum + +product.item.prices['usd'] * product.qty;
  }, 0);
  const eur = items.reduce((sum, product) => {
    return sum + +product.item.prices['eur'] * product.qty;
  }, 0);
  const total = items.reduce((total, product) => {
    return total + product.qty;
  }, 0);

  return { total, totalPrice: { usd, eur } };
};

export default function cartReducer(
  state: CartState = initialState,
  { type, payload }: CartAction
): CartState {
  let items: Cart[];
  let nesCart: CartData;

  switch (type) {
    case CartActions.AddCart:
      items = [...state.data.items, payload as Cart];
      nesCart = {
        ...state.data,
        items,
        ...getTotal(items),
      };
      localStorage.setItem('cart', JSON.stringify(nesCart));

      return {
        ...state,
        data: nesCart,
      };
    case CartActions.RemoveCart:
      items = state.data.items.filter(({ item: { id } }) => id !== payload);
      nesCart = {
        ...state.data,
        items,
        ...getTotal(items),
      };
      localStorage.setItem('cart', JSON.stringify(nesCart));

      return {
        ...state,
        data: nesCart,
      };
    case CartActions.IncrementCart:
      items = state.data.items.map(({ qty, item }) => ({
        qty: qty + ((payload as number) === item.id ? 1 : 0),
        item: { ...item },
      }));
      nesCart = {
        ...state.data,
        items,
        ...getTotal(items),
      };
      localStorage.setItem('cart', JSON.stringify(nesCart));

      return {
        ...state,
        data: nesCart,
      };
    case CartActions.DecrementCart:
      items = state.data.items.map(({ qty, item }) => ({
        qty: qty - ((payload as number) === item.id ? 1 : 0),
        item: { ...item },
      }));
      nesCart = {
        ...state.data,
        items,
        ...getTotal(items),
      };
      localStorage.setItem('cart', JSON.stringify(nesCart));

      return {
        ...state,
        data: nesCart,
      };
    case CartActions.ClearCart:
      localStorage.setItem('cart', JSON.stringify(initialData));

      return {
        ...state,
        data: initialData,
      };

    default:
      return state;
  }
}
