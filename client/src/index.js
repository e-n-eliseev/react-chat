import React from 'react';
import { render } from 'react-dom';
// styles
import 'bootstrap/dist/css/bootstrap.min.css';
import 'emoji-mart/css/emoji-mart.css';
// component
import { App } from './App';

const root = document.getElementById('root');
render(
  <>
    <App />
  </>,
  root
)
