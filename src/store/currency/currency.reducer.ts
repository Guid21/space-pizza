import { CurrencyActions } from './currency.actions';

type Currency = 'usd' | 'eur';

export type CurrencyState = {
  data: {
    selectedCurrency: Currency;
  };
  isLoading: boolean;
  isError: boolean;
};

export type CurrencyAction = {
  type: CurrencyActions;
  payload: Currency;
};

const currency: Currency =
  (localStorage.getItem('currency') as Currency) || null;

const initialState: CurrencyState = {
  data: {
    selectedCurrency: currency || 'usd',
  },
  isLoading: false,
  isError: false,
};

export default function currencyReducer(
  state = initialState,
  { type, payload }: CurrencyAction
): CurrencyState {
  switch (type) {
    case CurrencyActions.SetCurrency:
      localStorage.setItem('currency', payload);
      return {
        ...state,
        data: { ...state.data, selectedCurrency: payload },
      };
    default:
      return state;
  }
}
