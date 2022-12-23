import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles/index.css';
import { Provider } from 'react-redux';
import ReduxStore from './features/ReduxStore';

ReactDOM.createRoot(document.getElementById('root'))
  .render(
  <React.StrictMode>
      <Provider store={ReduxStore}>
          <App />
      </Provider>
  </React.StrictMode>
);
