import React from "react";
import {
  createStackNavigator
} from "react-navigation";
import { Image } from 'react-native';
import Home from "./screens/Home";

import { Dimensions } from "react-native";
const dimension = Dimensions.get("window");

const Drawer = createStackNavigator(
    {
      Home: {
        screen: Home,
      }
    }, {
      initialRouteName: "Home",
      headerMode: 'none'
    }
  );
  
  export default Drawer;