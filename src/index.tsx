import React, { StrictMode } from 'react';
import { render } from 'react-dom';

import { App } from './App';
import { OctokitProvider } from "./contexts/OctokitProvider";

import 'regenerator-runtime';

import 'bootstrap/dist/css/bootstrap.css';
import './styles.less';

render(
  <StrictMode>
    <OctokitProvider>
      {/*<UserProvider>*/}
        <App />
      {/*</UserProvider>*/}
    </OctokitProvider>
  </StrictMode>,
  document.querySelector('#root'),
);
