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
import AntDesign from "react-native-vector-icons/AntDesign"
import FontAwesome from "react-native-vector-icons/FontAwesome"
import Ionicons from "react-native-vector-icons/Ionicons"


export const store = createStore(Reducer, compose(applyMiddleware(thunk)));


const App = () => {

  useEffect(()=>{
    AntDesign.loadFont()
    FontAwesome.loadFont()
    Ionicons.loadFont()
  },[])
 

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
