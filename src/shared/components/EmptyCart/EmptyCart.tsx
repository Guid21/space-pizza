import React from 'react';
import { Link } from 'react-router-dom';

import DropEmptyCart from '../DropCart/components/Panel/components/EmptyCart';
import Button from '../Button';

const EmptyCart = () => {
  return (
    <div className="container max-w-3xl mx-auto py-4">
      <div className="flex flex-col items-center justify-center my-12">
        <DropEmptyCart
          title="Your cart is empty"
          description="Choose some pizza, we will wait"
        />
        <Link to="/">
          <Button black wFull={false} className="md:mr-2 my-2">
            Back to menu
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default EmptyCart;
