import React from 'react';

interface IEmptyCart {
  title: string;
  description: string;
}

const EmptyCart = ({ title, description }: IEmptyCart) => {
  return (
    <div className="flex flex-col items-center justify-center">
      <span className="p-4 text-6xl text-center">🍕</span>
      <p className="py-2 font-semibold">{title}</p>
      <p className="py-2 text-sm">{description}</p>
    </div>
  );
};

export default EmptyCart;
