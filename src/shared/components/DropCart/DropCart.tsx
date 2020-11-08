import React from 'react';
import { useSelector } from 'react-redux';
import cn from 'classnames';

import { Store } from '../../../store';
import EmptyCart from './components/Panel/components/EmptyCart';
import Button from '../Button';
import { useCastomSelector } from '../../hooks/helpers';
import Panel from './components/Panel';

const Cart = () => {
  const {
    cart: {
      data: { total },
    },
  } = useSelector((state: Store) => state);

  const {
    isActiv,
    refSelector,
    refHolder,
    handlerSelector,
    handlerHolder,
  } = useCastomSelector();

  return (
    <div className="relative">
      <Button
        className="relative"
        type="primary"
        refButton={refSelector}
        onClick={handlerSelector}
      >
        <span className="px-2">Cart </span>
        {total > 0 && (
          <span className="px-2 border-l border-white border-opacity-50">
            {total}
          </span>
        )}
      </Button>

      <div
        className={cn(
          { 'display-none': !isActiv },
          'p-4 overflow-hidden bg-white rounded shadow-lg w-84 absolute right-0'
        )}
        ref={refHolder}
      >
        {total === 0 ? (
          <EmptyCart
            title="Chooze your pizza"
            description="But for now, your cart is empty"
          />
        ) : (
          <Panel onClose={handlerHolder} />
        )}
      </div>
    </div>
  );
};

export default Cart;
