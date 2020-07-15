import 'react-native-gesture-handler';
import React, { useEffect } from 'react'
import {
  SafeAreaView,
  View,
  Text,
  StatusBar
} from 'react-native'
import { Reducer } from './store/Reducers/index';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import SplashScreen from 'react-native-splash-screen'
import Drawer from './src/Drawer';


export const store = createStore(Reducer, compose(applyMiddleware(thunk)));


const App = () => {

 

  return (
    <SafeAreaView style={{ flex: 1, }}>
      <StatusBar backgroundColor="white" barStyle="dark-content" />
      <Provider store={store}>
        <Drawer />
      </Provider>
    </SafeAreaView>
  )
}

export default App
