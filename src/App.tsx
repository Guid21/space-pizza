import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { store } from './store';
import Cart from './scens/Cart';
import Login from './scens/Login';
import History from './scens/History';
import Catalog from './scens/Catalog';
import Register from './scens/Register';
import Header from './shared/components/Header';

import firebase from 'firebase';
import Checkout from './scens/Checkout';

// TODO hidden ENV
const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
};

firebase.initializeApp(firebaseConfig);
const App = () => {
  return (
    <Router>
      <Provider {...{ store }}>
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="relative flex-grow pt-16">
            <Switch>
              <Route path="/" exact>
                <Catalog />
              </Route>

              <Route path="/cart" exact>
                <Cart />
              </Route>

              <Route path="/auth" exact>
                <Login />
              </Route>

              <Route path="/history" exact>
                <History />
              </Route>

              <Route path="/checkout" exact>
                <Checkout />
              </Route>
            </Switch>
            <Route path="/auth/register" exact>
              <Register />
            </Route>
          </main>
        </div>
      </Provider>
    </Router>
  );
};

export default App;
