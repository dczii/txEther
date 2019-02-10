import React, {Component} from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  SafeAreaView,
} from 'react-native';
import { Spinner } from 'native-base';
import _ from 'lodash'

import { Header, InputAddress, Logs } from './Components'
import { getExchangeRate, getEthBalance, getTxns } from './action'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: false,
      ethAddress: '',
      ethBalance: 0,
      currency: 'USD',
      rate: {},
      addressTxns: []
    }

    this.onEnterAddress = this.onEnterAddress.bind(this)
    this.setExchangeRate = this.setExchangeRate.bind(this)
    this.getAddressLogs = this.getAddressLogs.bind(this)
    this.showLoading = this.showLoading.bind(this)
  }
  componentDidMount() {
    this.setExchangeRate()
  }

  setExchangeRate = async () => {
    this.showLoading(true)
    let data = await getExchangeRate()
    console.log(data)
    this.setState({
      rate: data
    }, () => this.showLoading(false))
  }

  onEnterAddress = async (value) => {
    this.showLoading(true)
    let ethBalance = await getEthBalance(value)
    this.setState({
      ethAddress: value,
      ethBalance: ethBalance
    }, () => this.getAddressLogs(value))
  }

  getAddressLogs = async (value) => {
    let data = await getTxns(value)
    this.setState({
      addressTxns: data
    }, () => this.showLoading(false))
  }

  showLoading = value => {
    this.setState({ loading: value})
  }

  render() {
    let {
      ethAddress,
      rate,
      currency,
      ethBalance,
      loading,
      addressTxns
    } = this.state

    return (
      <SafeAreaView style={styles.container}>


        <Header 
          ethBalance={ethBalance}
          rate={rate}
          currency={currency}
        />

        {loading && <View style={styles.spinner}>
          <Spinner 
            color="#0000ff"/>
        </View>}

        {!ethBalance && addressTxns ?
          <InputAddress 
            onContinue={(value) => this.onEnterAddress('0x72ACB15929D0290a433fbdD9C50AD3A53bdA8544')}
          />
        :
          <Logs 
            ethData={addressTxns}
          />
        }
        
      </SafeAreaView>
    );
  }
}

export default App

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#F5FCFF',
  },
  spinner: {
    position: 'absolute',
    zIndex: 999999,
    flex: 1,
    justifyContent: 'center',
    height: '100%',
    width: '100%',
    backgroundColor: 'rgba(255,255,255,0.1)'
  }

});
