import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import './index.css';
import App from './App';
import configureStore from './REDUX/Store/configStore'

const store = configureStore()

ReactDOM.render(
  <Provider store = { store } >
        <BrowserRouter>
                 <App />
        </BrowserRouter>
  </Provider> ,
  document.getElementById('root')
)