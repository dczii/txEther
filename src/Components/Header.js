import React, { useState } from 'react';
import {TouchableOpacity, StyleSheet, Text, View} from 'react-native';
import { Icon } from 'native-base';
import { Picker } from 'react-native-woodpicker'
import _ from 'lodash'

import { formattedCurrency, formatEth } from '../Utils/dataUtils'

const unit = require('ethjs-unit');

function Header(props) {
  let [pickedData, handlePickedData] = useState(null)

  function handlePicker(data) {
    props.onChangeCurrency(data.value)
  };

  let { ethBalance, rates, currency, onChangeCurrency } = props
    let convertedEth = formatEth(ethBalance)
    let balance = convertedEth * _.get(rates, currency)

    // Set currencySelection for Picker
    let currencySelection = []
    _.mapKeys(props.rates, (value, key) => currencySelection.push({'label': key, 'value': key}))

  return (
    <View style={styles.container}>
      <Text style={styles.title}>MY PORTFOLIO</Text>
      {_.isEmpty(ethBalance) ? 
          <Text style={styles.content}>Enter an Ethereum address to get started</Text>
      :
        <TouchableOpacity style={styles.currencyContainer}>
          <Picker
            onItemChange={() => handlePicker()}
            items={currencySelection}
            title="Select Local Currency"
            placeholder={formattedCurrency(balance, currency)}
            placeholderStyle={styles.content}
            item={pickedData}
            isNullable
          />
          <Icon type='FontAwesome' name='caret-down' style={{ fontSize: 20, color: '#FFF' }} />
        </TouchableOpacity>
      }
    </View>
  );
}

export default Header

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#000',
    paddingTop: 10,
    height: 100,
    alignItems: 'center'
  },
  currencyContainer: {
    flexDirection: 'row',
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
      color: '#FFF',
      marginRight: 10
  }
});
