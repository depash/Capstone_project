import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import NavBar from './components/NavBar';
import ProtectedRoute from './components/auth/ProtectedRoute';
import { authenticate } from './store/session';
import HomePage from './components/HomePage';
import Order from './components/OrderPage';

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector(state => state.session.user);
  useEffect(() => {
    (async () => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }
  const body = document.getElementById('root')
  if (!user) {
    body.className = 'pizza'
  }
  else {
    body.className = 'noPizza'
  }
  return (
    <BrowserRouter>
      <NavBar />
      <Switch>
        <Route path='/' exact={true}>
          <LoginForm />
        </Route>
        <Route path='/sign-up'>
          <SignUpForm />
        </Route>
        <ProtectedRoute path='/home'>
          <HomePage />
        </ProtectedRoute>
        <ProtectedRoute path='/Checkout'>
          <Order />
        </ProtectedRoute>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
