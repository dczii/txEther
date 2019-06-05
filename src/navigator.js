import React from "react";
import {
  createStackNavigator
} from "react-navigation";
import { Image } from 'react-native';
import Home from "./screens/Home/Home";
import Etherium from "./screens/Etherium";
import CoinChecker from './screens/CoinChecker'

import { Dimensions } from "react-native";
const dimension = Dimensions.get("window");

const Drawer = createStackNavigator(
    {
      Home: {
        screen: Home,
      }, 
      Etherium: {
        screen: Etherium
      },
      CoinChecker: {
        screen: CoinChecker
      }
    }, {
      initialRouteName: 'CoinChecker',
      headerMode: 'none'
    }
  );
  
  export default Drawer;