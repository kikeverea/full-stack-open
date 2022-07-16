import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App initData={[
      {
        name: 'Arto Hellas',
        phone: '040-123456'
      },
      {
        name: 'Ada Lovelace',
        phone: '39-44-5323523'
      },
      {
        name: 'Patrick Rothfuss',
        phone: '555 555 555'
      },
      {
        name: 'Christopher Paolini',
        phone: '123 456 789'
      }
    ]}/>
  </React.StrictMode>
);

