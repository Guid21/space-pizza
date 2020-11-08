import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { Store } from '../../../store';

const TotalPrice = () => {
  const {
    cart: {
      data: { totalPrice },
    },
    currency: {
      data: { selectedCurrency },
    },
  } = useSelector((state: Store) => state);

  const currency = useMemo(() => selectedCurrency.toUpperCase(), [
    selectedCurrency,
  ]);

  const subtotal = useMemo(() => totalPrice[selectedCurrency].toFixed(2), [
    totalPrice,
    selectedCurrency,
  ]);

  const vat = useMemo(
    () => ((totalPrice[selectedCurrency] / 100) * 30).toFixed(2),
    [totalPrice, selectedCurrency]
  );

  const delivery = 5;

  return (
    <section className="flex flex-col items-end my-2">
      <div className="text-xl font-semibold">
        <span>Subtotal:</span>{' '}
        <span className="text-right text-orange-500">
          {subtotal} {currency}
        </span>
      </div>
      <div className="text-sm font-semibold text-gray-600">
        <span>VAT:</span>{' '}
        <span className="text-right">
          {vat} {currency}
        </span>
      </div>
      <div className="text-sm font-semibold text-gray-600">
        <span>Delivery:</span>{' '}
        <span className="text-right">
          {delivery.toFixed(2)} {currency}
        </span>
      </div>
      <div className="my-2 text-2xl font-semibold">
        <span className="text-black">Total:</span>{' '}
        <span className="text-right text-orange-500">
          {(+subtotal + +vat + +delivery).toFixed(2)} {currency}
        </span>
      </div>
    </section>
  );
};

export default TotalPrice;
