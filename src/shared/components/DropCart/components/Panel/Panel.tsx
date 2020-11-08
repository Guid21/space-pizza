import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Store } from '../../../../../store';
import Button from '../../../Button';
import Product from './components/Product';

interface IPanel {
  onClose: () => void;
}

const Panel = ({ onClose }: IPanel) => {
  const {
    cart: {
      data: { items: cart, totalPrice },
    },
    currency: {
      data: { selectedCurrency },
    },
  } = useSelector((state: Store) => state);

  return (
    <div>
      <div className="divide-y divide-gray-200">
        {cart.map((product) => (
          <Product {...product} key={product.item.id} />
        ))}
      </div>
      <div className="flex flex-row justify-between p-2 my-2 font-bold">
        <div>Subtotal:</div>{' '}
        <div className="text-right">
          {totalPrice[selectedCurrency].toFixed(2)}{' '}
          {selectedCurrency.toUpperCase()}
        </div>
      </div>
      <Link to="/cart" onClick={onClose}>
        <Button className="font-bold" type="primary">
          Proceed
        </Button>
      </Link>
    </div>
  );
};

export default Panel;
