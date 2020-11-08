import React, { useCallback, useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import firebase from 'firebase';
import moment from 'moment';

import { CartData } from '../../../../store/cart/cart.reducer';

export interface IHistory {
  cart: CartData;
  address: string;
  city: string;
  country: string;
  currency: 'usd' | 'eur';
  date: string;
  email: string;
  name: string;
  paymentMethod: string;
  state: string;
}

const List = () => {
  const [history, setHistory] = useState<IHistory[]>();
  const [user] = useAuthState(firebase.auth());

  const getData = useCallback(async () => {
    const { docs } = await firebase.firestore().collection(user.uid).get();
    const history = docs.map((doc) => doc.data());
    setHistory(history as IHistory[]);
  }, [user]);

  useEffect(() => {
    if (user) {
      getData();
    }
  }, [user, getData]);

  return (
    <div className="divide-y divide-gray-200">
      {history?.map(({ date, cart: { items, totalPrice }, currency }) => (
        <article className="py-2 space-y-2" key={date}>
          #{moment(date).format('DD.MM.YYYY HH.MM.SS')}
          <ul className="pt-2">
            {items.map(({ qty, item: { name, prices, id } }) => (
              <li key={id}>
                <div className="flex flex-row space-x-1">
                  <span>{qty}</span>
                  <span className="font-mono">x</span>
                  <span className="flex-grow">{name}</span>
                  <span>
                    {(prices[currency] * qty).toFixed(2)}{' '}
                    {currency.toUpperCase()}
                  </span>
                </div>
              </li>
            ))}
          </ul>
          <div className="flex flex-row justify-between font-bold">
            <span>Total:</span>
            <span className="text-right">
              {totalPrice[currency].toFixed(2)} {currency.toUpperCase()}
            </span>
          </div>
        </article>
      ))}
    </div>
  );
};

export default List;
