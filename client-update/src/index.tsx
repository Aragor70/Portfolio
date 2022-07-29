import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import ReactDOM from 'react-dom';
import App from './App';
import './utils/i18n';

const root = document.getElementById('root');

ReactDOM.render(
  <React.StrictMode>
      <Router>
        <App />
      </Router>
  </React.StrictMode>, root
);