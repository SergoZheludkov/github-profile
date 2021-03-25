import React, { StrictMode } from 'react';
import { render } from 'react-dom';

import { App } from './App';
import { OctokitProvider } from "./contexts/OctokitProvider";
import { LocalStorageProvider } from "./contexts/LocalStorageProvider";

import 'regenerator-runtime';

import 'bootstrap/dist/css/bootstrap.css';
import './styles.less';

render(
  <StrictMode>
    <LocalStorageProvider>
      <OctokitProvider>
        <App />
      </OctokitProvider>
    </LocalStorageProvider>
  </StrictMode>,
  document.querySelector('#root'),
);
