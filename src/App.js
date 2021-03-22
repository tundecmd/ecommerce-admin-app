import React, { useEffect, useState } from 'react'
import { Route, Switch } from 'react-router-dom';
import './App.css';
import Home from './containers/Home';
import Signin from './containers/Signin';
import Signup from './containers/Signup';
import PrivateRoute from './components/HOC/PrivateRoute';
import { isUserLoggedIn } from './actions';
import { useDispatch, useSelector } from 'react-redux';




function App() {
  const dispatch = useDispatch()
  const auth = useSelector(state => state.auth);
  
  useEffect(() => {
    if (!auth.authenticate) {
      dispatch(isUserLoggedIn())
    }    
  }, [])

  return (
    <div className="App">
      <Switch>
        <PrivateRoute exact path="/" component={ Home } />
        <Route path="/signup" component={ Signup } />
        <Route path="/signin" component={ Signin } />
      </Switch>
    </div>
  );
}

export default App;