import React from 'react';
import { AsyncStorage, View, StatusBar, SafeAreaView } from 'react-native';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { persistReducer } from 'redux-persist';
import { createAppContainer } from 'react-navigation';
import createSagaMiddleware from 'redux-saga';

import reducers from './src/redux/reducer'
import rootSaga from './src/redux/saga/rootSaga'

import Drawer from './src/navigator';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  blacklist: []
}

const persistedRecuder = persistReducer(persistConfig, reducers);
const sagaMiddleware = createSagaMiddleware();
const store = createStore(persistedRecuder, applyMiddleware(sagaMiddleware));
const AppContainer = createAppContainer(Drawer);

export default function App(props) {
  return (
      <Provider store ={store}>
        <SafeAreaView />
        <StatusBar
          backgroundColor='white'
          barStyle='light-content'
        />
        <AppContainer />
      </Provider>
    );
}

sagaMiddleware.run(rootSaga);