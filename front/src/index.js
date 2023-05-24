import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './App';
import store from './store';

const accessToken = localStorage.getItem('accessToken');
const refreshToken = localStorage.getItem('refreshToken');

if (accessToken && refreshToken) {
  store.dispatch({
    type: 'AUTH_REFRESH_SUCCESS',
    payload: {
      token: accessToken,
      refreshToken,
    },
  });
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
