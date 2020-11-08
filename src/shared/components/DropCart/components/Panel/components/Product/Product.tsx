import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Cart } from '../../../../../../../store/cart/cart.reducer';
import { Store } from '../../../../../../../store';
import Counter from '../../../../../Counter';
import { setCart } from '../../../../../../../store/cart/cart.effect';
import { CartActions } from '../../../../../../../store/cart/cart.actions';

const Product = ({ item, qty }: Cart) => {
  const { id, img, name, description, prices } = item;

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
    <article className="p-2 my-2" key={id}>
      <div className="flex flex-row space-x-2">
        <figure className="flex justify-center flex-shrink-0 w-20 h-20">
          <img src={img} alt={description} />
        </figure>
        <div className="w-full">
          <div className="flex flex-row items-center justify-between my-2">
            <h2 className="font-bold">{name}</h2>{' '}
            <button
              className="p-1 rounded-lg focus:outline-none focus:shadow-outline"
              onClick={hadlerRemove}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                width="16px"
                height="16px"
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
          <div className="flex flex-row items-center justify-between">
            <Counter count={qty} onChange={setCount} />
            <div className="font-bold text-right">
              {(prices[selectedCurrency] * qty).toFixed(2)}{' '}
              {selectedCurrency.toUpperCase()}
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};

export default Product;
