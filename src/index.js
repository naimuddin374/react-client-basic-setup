import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { Provider } from 'react-redux';
import store from './store';


import './assets/sass/style.scss';
import '@fortawesome/fontawesome-free/js/all.min.js'
import { SET_USER } from './store/actions/types';


try {
  let credential = localStorage.getItem('credential') || null

  if (credential) {
    credential = JSON.parse(credential)
    store.dispatch({
      type: SET_USER,
      payload: {
        token: credential.token,
        user: credential.user
      }
    })
  }
} catch (e) {
  console.log(e)
}



if (process.env.NODE_ENV !== 'development') {
  ReactDOM.render(
    <React.StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
    </React.StrictMode>,
    document.getElementById('root')
  );
} else {
  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById('root')
  );
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
