import React from 'react';
import { useSelector } from 'react-redux';

import Product from './components/Product';
import { Store } from '../../../store';

interface IListProduct {
  title: string;
  imgShow?: boolean;
}

const ListProduct = ({ title, imgShow = true }: IListProduct) => {
  const {
    cart: {
      data: { items: cart },
    },
  } = useSelector((state: Store) => state);

  return (
    <>
      <section className="my-12">
        <h1 className="my-12 text-4xl">{title}</h1>
        <div className="divide-y divide-gray-200">
          {cart.map((product) => (
            <Product {...product} imgShow={imgShow} key={product.item.id} />
          ))}
        </div>
      </section>
    </>
  );
};

export default ListProduct;
