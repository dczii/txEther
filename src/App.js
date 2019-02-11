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

import { Header, InputAddress, Logs, Modal } from './Components'
import { getExchangeRate, getEthBalance, getTxns } from './action'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: false,
      showError: false,
      ethAddress: '',
      ethBalance: 0,
      currency: 'USD',
      rates: {},
      addressTxns: [],
      showModal: false,
      selectedTxn: {}
    }

    this.onEnterAddress = this.onEnterAddress.bind(this)
    this.setExchangeRate = this.setExchangeRate.bind(this)
    this.getAddressLogs = this.getAddressLogs.bind(this)
    this.showLoading = this.showLoading.bind(this)
    this.onSelectTxn = this.onSelectTxn.bind(this)
    this.onChangeCurrency = this.onChangeCurrency.bind(this)
    this.onCloseModal = this.onCloseModal.bind(this)
  }

  componentDidMount() {
    this.setExchangeRate()
  }

  setExchangeRate = async () => {
    this.showLoading(true)
    let data = await getExchangeRate()
    this.setState({
      rates: data
    }, () => this.showLoading(false))
  }

  onEnterAddress = async (value) => {
    this.showLoading(true)
    let ethBalance = await getEthBalance(value)

    if (_.includes(ethBalance, 'Error')) {
      this.setState({ showError: true }, () => this.getAddressLogs(value))
    } else {
      this.setState({
        showError: false,
        ethAddress: value,
        ethBalance: ethBalance
      }, () => this.getAddressLogs(value))
    }
  }

  getAddressLogs = async (value) => {
    let data = await getTxns(value)
    this.setState({
      addressTxns: data
    }, () => this.showLoading(false))
  }

  showLoading = (value) => {
    this.setState({ loading: value})
  }

  onSelectTxn = (value) => {
    this.setState({ showModal: true, selectedTxn: value })
  }

  onChangeCurrency = (value) => {
    this.setState({ currency: value})
  }

  onCloseModal = () => {
    this.setState({ showModal: !this.state.showModal })
  }

  render() {
    let {
      ethAddress,
      rates,
      currency,
      ethBalance,
      loading,
      addressTxns,
      selectedTxn,
      showModal,
      showError
    } = this.state

    return (
      <SafeAreaView style={styles.container}>


        <Header 
          ethBalance={ethBalance}
          rates={rates}
          currency={currency}
          onChangeCurrency={this.onChangeCurrency}
        />

        {loading && <View style={styles.spinner}>
          <Spinner 
            color="#0000ff"/>
        </View>}

        {!ethBalance && addressTxns ?
          <InputAddress 
            onContinue={(value) => this.onEnterAddress(value)}
            showError={showError}
          />
        :
          <Logs 
            ethAddress={ethAddress}
            ethData={addressTxns}
            onSelectTxn={data => this.onSelectTxn(data)}
          />
        }

        <Modal 
          visible={showModal}
          selectedTxn={selectedTxn}
          onCloseModal={this.onCloseModal}
          rates={rates}
          currency={currency}
        />
        
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
    backgroundColor: 'transparent'
  }

});
