import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getPizza } from '../../../store/pizza/pizza.effect';
import { Pizza as IPizza } from '../../../store/pizza/pizza.reducer';
import Button from '../../../shared/components/Button';
import { Store } from '../../../store';
import { setCart } from '../../../store/cart/cart.effect';

const Pizza = () => {
  const dispatch = useDispatch();
  const {
    currency: {
      data: { selectedCurrency: currency },
    },
    pizza: {
      data: { items: pizza },
    },
  } = useSelector((state: Store) => state);

  useEffect(() => {
    dispatch(getPizza());
  }, [dispatch]);

  const handlerIncrementProtuct = (payload: IPizza) =>
    dispatch(setCart({ type: 'increment', payload }));

  return (
    <div className="container py-4">
      <section className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {pizza.map((item) => {
          const { img, name, description, prices } = item;
          return (
            <article className="mb-8" key={name}>
              <main>
                <figure className="relative mb-2 duration-500 transform group-hover:translate-y-2">
                  <div className="aspect-ratio-square" />
                  <img
                    src={img}
                    alt={description}
                    className="absolute top-0 left-0 w-full h-full object-fit"
                  ></img>
                </figure>
                <h2 className="my-2 text-xl font-bold">{name}</h2>
                <p className="my-2 text-sm text-gray-600">{description}</p>
              </main>
              <footer className="flex flex-row justify-between mt-4 text-sm">
                <div className="py-2">
                  From {`${prices[currency]} ${currency.toUpperCase()}`}
                </div>
                <div className="w-1/2">
                  <Button onClick={() => handlerIncrementProtuct(item)}>
                    Choose
                  </Button>
                </div>
              </footer>
            </article>
          );
        })}
      </section>
    </div>
  );
};

export default Pizza;
