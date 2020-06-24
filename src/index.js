import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import './assets/css/bootstrap.css';
import './assets/css/manual.css';
import './assets/css/animate.css';
import './assets/css/css-fontello/fontello.css';
import './assets/css/css-fontello/fontello-codes.css';
import './assets/css/css-fontello/fontello-embedded.css';
import './assets/css/css-fontello/fontello-ie7.css';
import './assets/css/css-fontello/fontello-ie7-codes.css';
import { BrowserRouter } from 'react-router-dom';


ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <App></App>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
