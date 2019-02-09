import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import { List, ListItem, Left, Body, Right } from 'native-base';

import { Header } from './Components'
import { getBalance, getETHPrice, getLogs } from './action'

class App extends Component {
  componentDidMount() {
    getLogs()
  }
  render() {
    return (
      <View style={styles.container}>
        <Header />
        <List>
            <ListItem>
              <Left>
                <Text>ETH</Text>
              </Left>
              <Body>
                <Text>Kumar Pratik</Text>
                <Text note>Doing what you like will always keep you happy . .</Text>
              </Body>
              <Right>
                <Text note>3:43 pm</Text>
              </Right>
            </ListItem>
          </List>
      </View>
    );
  }
}

export default App

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
