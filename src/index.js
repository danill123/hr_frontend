/*!
* Coded by Creative Tim
* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
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

/* --- import reducers ---*/
import { Login } from './redux/reducers/user';

/* define redux store and utility */
const logger = createLogger();
const rootReducers = combineReducers({ Login });
const store = createStore(rootReducers, applyMiddleware(ThunkMiddleware, logger))

// console.log(localStorage.getItem('user_session'))

const checkLoggedin = () => {

  if(localStorage.getItem('user_session')) {
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