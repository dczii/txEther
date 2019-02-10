import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import _ from 'lodash'


import { formattedCurrency, formatEth } from '../Utils/dataUtils'

const unit = require('ethjs-unit');

class Header extends Component {
    componentDidUpdate() {
    }

    render() {
    let { ethBalance, rate, currency } = this.props
    let convertedEth = formatEth(ethBalance)
    let balance = convertedEth * _.get(rate, currency)
    return (
      <View style={styles.container}>
        <Text style={styles.title}>MY PORTFOLIO</Text>
        {_.isEmpty(ethBalance) ? 
            <Text style={styles.content}>Enter an Ethereum address to get started</Text>
        :
        <Text style={styles.content}>{formattedCurrency(balance)}</Text>
        }
      </View>
    );
  }
}

export default Header

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#000',
    paddingTop: 10,
    height: 100,
    alignItems: 'center'
  },
  title: {
    fontSize: 28,
    color: '#FFF',
    fontWeight: 'bold',
    marginBottom: 10
  },
  content: {
      fontSize: 16,
      color: '#FFF'
  }
});
