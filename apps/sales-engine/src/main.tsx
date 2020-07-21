import React from 'react';
import ReactDOM from 'react-dom';
import { Grommet } from 'grommet';
import { Provider } from 'react-redux';
import store from './app/config/store.config';

import App from './app/app';

const theme = {
    global: {
        font: {
            family: 'Roboto',
            size: '18px',
            height: '20px'
        }
    }
}

ReactDOM.render(
    <Provider store={store} >
      <Grommet theme={theme}>
        <App />
      </Grommet>
    </Provider>,
    document.getElementById('root')
);
