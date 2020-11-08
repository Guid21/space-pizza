import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../../../../shared/components/Button';

import ListProduct from '../../../../shared/components/ListProduct';
import TotalPrice from '../../../../shared/components/TotalPrice';

const Panel = () => {
  return (
    <div className="container max-w-3xl mx-auto py-4">
      <ListProduct title={'Cart'} />
      <TotalPrice />
      <section className="flex flex-col justify-between md:flex-row-reverse">
        <Link to="/checkout" className="w-full my-2 md:ml-2">
          <Button type="primary" className="h-full" boold>
            Proceed
          </Button>
        </Link>
        <Link to="/" className="w-full my-2 md:mr-2">
          <Button black>Back to menu</Button>
        </Link>
      </section>
    </div>
  );
};

export default Panel;
