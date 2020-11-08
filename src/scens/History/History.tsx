import firebase from 'firebase';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import List from './components/List';

const History = () => {
  const history = useHistory();

  // TODO Put it in the left hook
  const [user] = useAuthState(firebase.auth());

  if (!user) {
    history.push('/');
  }

  return (
    <div className="container max-w-3xl mx-auto py-4">
      <section className="my-12">
        <div className="my-12">
          <h1 className="text-4xl">History</h1>
          <button
            className="text-orange-500"
            onClick={async () => {
              await firebase.auth().signOut();
              history.push('/');
            }}
          >
            Logout
          </button>
        </div>{' '}
        <List />
      </section>
    </div>
  );
};

export default History;
