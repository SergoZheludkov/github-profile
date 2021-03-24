import React, { StrictMode } from 'react';
import { render } from 'react-dom';

import { App } from './App';

import 'bootstrap/dist/css/bootstrap.css';
import './styles.less';

render(
  <StrictMode>
    <App />
  </StrictMode>,
  document.querySelector('#root'),
);
