import React from 'react';
import { Grommet } from 'grommet';
import { Provider } from 'react-redux';
import store from './config/store.config';
import './app.scss';

const theme = {
  global: {
    font: {
      family: 'Roboto',
      size: '18px',
      height: '20px'
    }
  }
}

export const App = () => {                                   
  return (
    <Grommet theme={theme}>
      <div>hola</div>
    </Grommet>
  );
};

export default App;
