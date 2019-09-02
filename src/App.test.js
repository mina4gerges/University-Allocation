import React from 'react';
import ReactDOM from 'react-dom';
// import App from './App';
import Full from './Container/Full'

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Full />, div);
  ReactDOM.unmountComponentAtNode(div);
});
