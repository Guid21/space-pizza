import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { CartActions } from '../../../../../store/cart/cart.actions';
import { setCart } from '../../../../../store/cart/cart.effect';
import Counter from '../../../Counter';
import { Cart } from '../../../../../store/cart/cart.reducer';
import { Store } from '../../../../../store';

interface IProduct extends Cart {
  imgShow?: boolean;
}

const Product = ({ item, qty, imgShow }: IProduct) => {
  const { img, description, name, prices, id } = item;
  const dispatch = useDispatch();

  const [count, setCount] = useState(qty);

  const hadlerRemove = useCallback(
    () => dispatch({ type: CartActions.RemoveCart, payload: id }),
    [id, dispatch]
  );

  const {
    currency: {
      data: { selectedCurrency },
    },
  } = useSelector((state: Store) => state);

  useEffect(() => {
    if (count < qty) {
      dispatch(setCart({ type: 'decrement', payload: item }));
    } else if (count > qty) {
      dispatch(setCart({ type: 'increment', payload: item }));
    }
    // eslint-disable-next-line
  }, [count]);

  return (
    <article className="p-2 my-2">
      <div className="flex flex-row items-center justify-between space-x-4">
        {imgShow && (
          <figure className="flex justify-center flex-shrink-0 w-20 h-20">
            <img src={img} alt={description} />
          </figure>
        )}
        <div className="flex flex-col flex-grow my-2">
          <h2 className="font-bold text-md">{name}</h2>
        </div>
        <Counter count={qty} onChange={setCount} />
        <div className="w-24 font-bold text-right">
          {(prices[selectedCurrency] * qty).toFixed(2)}{' '}
          {selectedCurrency.toUpperCase()}
        </div>
        <button
          className="p-1 rounded-lg focus:outline-none focus:shadow-outline"
          onClick={hadlerRemove}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            width="24px"
            height="24px"
            className="w-4 h-4"
          >
            <path
              fillRule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clipRule="evenodd"
            ></path>
          </svg>
        </button>
      </div>
    </article>
  );
};

export default Product;
