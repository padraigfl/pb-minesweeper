import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

const wrapper = document.getElementById('courseBuilder');
wrapper
  ? ReactDOM.render(
      <App
        menuOptions={[
          {
            title: 'file',
            options: [{ title: 'Settings' }, { title: 'Close' }]
          }
        ]}
      />,
      wrapper
    )
  : false;
