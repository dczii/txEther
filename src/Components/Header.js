import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';

class App extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>HEADER</Text>
      </View>
    );
  }
}

export default App

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#000',
    height: 100
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    color: "#FFF"
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
