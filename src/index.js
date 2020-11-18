/*!
  check apakah user sudah pernah login atau belum
*/
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import "assets/plugins/nucleo/css/nucleo.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "assets/scss/argon-dashboard-react.scss";
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import ThunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';

import AdminLayout from "layouts/Admin.js";
import AuthLayout from "layouts/Auth.js";
import { JWT_KEY } from "./redux/constantsvar";

/* --- import reducers ---*/
import { Login } from './redux/reducers/user';
import { List_user } from './redux/reducers/user_data';

/* define redux store and utility */
const logger = createLogger();
const rootReducers = combineReducers({ Login , List_user });
const store = createStore(rootReducers, applyMiddleware(ThunkMiddleware, logger)); // -> for development with redux debug
// const store = createStore(rootReducers, applyMiddleware(ThunkMiddleware)); // -> for production
const jwt = require('jsonwebtoken');

const checkLoggedin = () => {
  if(localStorage.getItem('user_session')) {
    let verify = jwt.decode(localStorage.getItem('user_session'), JWT_KEY);
    if(verify.auth) {
      return (
        <>
          <Route path="/admin" render={props => <AdminLayout {...props} />} />
          <Route path="/auth" render={props => <AuthLayout {...props} />} />
          <Redirect from="/" to="/admin/index" />
        </>
      );
    } else {
      return (
        <>
          <Route path="/auth" render={props => <AuthLayout {...props} />} />
          <Redirect from="/" to="/auth/login" />
        </>
      );
    }
  } else {
    return (
      <>
        <Route path="/auth" render={props => <AuthLayout {...props} />} />
        <Redirect from="/" to="/auth/login" />
      </>
    );
  }
}

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Switch>
        {/* <Route path="/admin" render={props => <AdminLayout {...props} />} />
        <Route path="/auth" render={props => <AuthLayout {...props} />} />
        <Redirect from="/" to="/auth/login" /> */}
        {checkLoggedin()}
      </Switch>
    </BrowserRouter>
  </Provider>
  ,
  document.getElementById("root")
);

// /auth/login -> (login page)
// /admin/index -> (admin page)