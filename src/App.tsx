import React from 'react';

import { Provider } from 'react-redux';
import configureStore from './store/store';
import Main from './components/inicio';
import './App.scss';

const App = () => {
  const store = configureStore();
  return (
    <Provider store={store}>
      <Main />
    </Provider>
  );
};

export default App;
