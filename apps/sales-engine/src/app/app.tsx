import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { loadStores } from './features/stores.feature';
import './app.scss';



export const App = () => {             
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadStores());
  }, []);

  return (
    <div>hola</div>
  );
};

export default App;
