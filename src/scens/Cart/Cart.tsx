import React from 'react';
import { useSelector } from 'react-redux';

import Empty from '../../shared/components/EmptyCart';
import Panel from './components/Panel';
import { Store } from '../../store';

const Cart = () => {
  const {
    cart: {
      data: { total },
    },
  } = useSelector((state: Store) => state);

  if (total === 0) {
    return <Empty />;
  }
  return <Panel />;
};

export default Cart;
