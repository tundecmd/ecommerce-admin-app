import React, { useEffect, useState } from 'react'
import { Route, Switch } from 'react-router-dom';
import './App.css';
import Home from './containers/Home';
import Signin from './containers/Signin';
import Signup from './containers/Signup';
import PrivateRoute from './components/HOC/PrivateRoute';
import { isUserLoggedIn } from './actions';
import { useDispatch, useSelector } from 'react-redux';
import Products from './containers/Products';
import Orders from './containers/Orders';
import Category from './containers/Category';
import Page from './containers/NewPage/index'
import { getInitialData } from './actions/initialData.action';


function App() {
  const dispatch = useDispatch()
  const auth = useSelector(state => state.auth);
  
  useEffect(() => {
    if (!auth.authenticate) {
      dispatch(isUserLoggedIn())
    }    
    if (auth.authenticate) {
      dispatch(getInitialData())
    }
    
  }, [auth.authenticate])

  return (
    <div className="App">
      <Switch>
        <PrivateRoute exact path="/" component={ Home } />
        <PrivateRoute path="/page" component={ Page } />
        <PrivateRoute path="/category" component={ Category } />
        <PrivateRoute path="/products" component={ Products } />
        <PrivateRoute path="/orders" component={ Orders } />


        <Route path="/signup" component={ Signup } />
        <Route path="/signin" component={ Signin } />
      </Switch>
    </div>
  );
}

export default App;