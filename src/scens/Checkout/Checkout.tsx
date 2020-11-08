import React from 'react';
import { useSelector } from 'react-redux';

import Empty from '../../shared/components/EmptyCart';
import { Store } from '../../store';
import Panel from './components/Panel';

const Checkout = () => {
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

export default Checkout;
