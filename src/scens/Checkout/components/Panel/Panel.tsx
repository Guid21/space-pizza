import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import firebase from 'firebase';

import Form from './components/Form';
import Button from '../../../../shared/components/Button';
import TotalPrice from '../../../../shared/components/TotalPrice';
import ListProduct from '../../../../shared/components/ListProduct';

const Panel = () => {
  const [user] = useAuthState(firebase.auth());

  const ligIn = useMemo(
    () =>
      !user ? (
        <section className="my-12">
          <Link to="/auth">
            <Button type="primary" boold>
              Have an account? Log in!
            </Button>
          </Link>
        </section>
      ) : null,
    [user]
  );

  return (
    <div className="container max-w-3xl mx-auto py-4">
      <ListProduct title={'Checkout'} imgShow={false} />
      {ligIn}
      <Form>
        <TotalPrice />
      </Form>
    </div>
  );
};

export default Panel;
