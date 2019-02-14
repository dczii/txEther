import React, {Component} from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
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
      txnType: '',
      ethAddress: '',
      ethBalance: 0,
      currency: 'USD',
      rates: {},
      addressTxns: [],
      showModal: false,
      selectedTxn: {},
      sortBy: ''
    }

    this.onEnterAddress = this.onEnterAddress.bind(this)
    this.setExchangeRate = this.setExchangeRate.bind(this)
    this.getAddressLogs = this.getAddressLogs.bind(this)
    this.showLoading = this.showLoading.bind(this)
    this.onSelectTxn = this.onSelectTxn.bind(this)
    this.onChangeCurrency = this.onChangeCurrency.bind(this)
    this.onCloseModal = this.onCloseModal.bind(this)
    this.changeFilter = this.changeFilter.bind(this)
    this.applySort = this.applySort.bind(this)
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

  getAddressLogs = async (value, sort) => {
    let data = await getTxns(value, sort)
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

  changeFilter = (value) => {
    this.setState({ txnType: value })
  }
  
  applySort = async (data) => {
    this.showLoading(true)
    let newData = ''
    if (this.state.sortBy !== data) {
      newData = data
    }

    if (newData === 'date') {
      this.getAddressLogs(this.state.ethAddress, 'desc')
    } else {
      this.getAddressLogs(this.state.ethAddress)
    }
    this.setState({ sortBy: newData })
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
      showError,
      txnType,
      sortBy
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

        {!ethBalance && addressTxns ? null :
        <View style={styles.filterContainer}>
          <Text style={styles.filterText}>
            Filter:
          </Text>
          <TouchableOpacity style={styles.btnContainer} onPress={() => this.changeFilter('')}>
            <Text style={_.assign({}, styles.filterText, {fontWeight: txnType === '' ? 'bold' : 'normal'})}>
              All Txn
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btnContainer} onPress={() => this.changeFilter('in')}>
            <Text style={_.assign({}, styles.filterText, {fontWeight: txnType === 'in' ? 'bold' : 'normal'})}>
              Internal Txn
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btnContainer} onPress={() => this.changeFilter('out')}>
            <Text style={_.assign({}, styles.filterText, {fontWeight: txnType === 'out' ? 'bold' : 'normal'})}>
              Outgoing Txn
            </Text>
          </TouchableOpacity>
        </View>}

        {!ethBalance && addressTxns ? null :
        <View style={styles.filterContainer}>
          <Text style={styles.filterText}>
            Sort By:
          </Text>
          <TouchableOpacity style={styles.btnContainer} onPress={() => this.applySort('date')}>
            <Text style={_.assign({}, styles.filterText, {fontWeight: sortBy === 'date' ? 'bold' : 'normal'})}>
              Date
            </Text>
          </TouchableOpacity>
          {/* <TouchableOpacity style={styles.btnContainer} onPress={() => this.applySort('amount')}>
            <Text style={_.assign({}, styles.filterText, {fontWeight: sortBy === 'amount' ? 'bold' : 'normal'})}>
              Amount
            </Text>
          </TouchableOpacity> */}
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
            txnType={txnType}
            sortBy={sortBy}
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
  filterContainer: {
    flexDirection: 'row',
    backgroundColor: '#898989',
    paddingVertical: 5,
    paddingHorizontal: 10
  },
  spinner: {
    position: 'absolute',
    zIndex: 999999,
    flex: 1,
    justifyContent: 'center',
    height: '100%',
    width: '100%',
    backgroundColor: 'transparent'
  },
  btnContainer: {
    marginLeft: 5
  },
  filterText: {
    color: '#FFF'
  }
});
