import React from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Modal as RNModal
} from 'react-native';
import { Icon } from 'native-base';
import moment from 'moment'
import _ from 'lodash'

import { formatEth, formattedCurrency } from '../Utils/dataUtils'

function Modal(props) {
  const {
    visible,
    onCloseModal,
    selectedTxn,
    rates,
    currency
  } = props
  let date = new Date(Number(selectedTxn.timeStamp)*1000)

  let convertedEth = formatEth(Number(selectedTxn.value || 0))
  let txnValue = convertedEth * _.get(rates, currency)

  return (
    <RNModal
      visible={visible}
      animationType='slide'
      transparent >
      <View style={styles.container}>
          <TouchableOpacity 
              style={{ position: 'absolute', right: 20, top: 20, zIndex: 9999 }}
              onPress={() => onCloseModal()}>
              <Icon 
                  type='FontAwesome' 
                  name='close'
                  style={{ fontSize: 25, color: '#000' }}
                  />
          </TouchableOpacity>

          <View style={styles.dataContainer}>
              <Text style={styles.textTitle}>Transaction Hash:</Text>
              <Text style={styles.textContent}>{selectedTxn.hash}</Text>

              <Text style={styles.textTitle}>Block Number:</Text>
              <Text style={styles.textContent}>{selectedTxn.blockNumber}</Text>
              
              <Text style={styles.textTitle}>Time Stamp:</Text>
              <Text style={styles.textContent}>{`${moment(date).fromNow()} (${moment(date).format('MMM DD YYYY h:mm')})`}</Text>

              <Text style={styles.textTitle}>From:</Text>
              <Text style={styles.textContent}>{selectedTxn.from}</Text>

              <Text style={styles.textTitle}>To:</Text>
              <Text style={styles.textContent}>{selectedTxn.to}</Text>

              <Text style={styles.textTitle}>Value:</Text>
              <Text style={styles.currencyStyle}>{`${convertedEth} Ether (${formattedCurrency(txnValue, currency)})`}</Text>
          </View>
      </View>
    </RNModal>
  );
}

export default Modal

const styles = StyleSheet.create({
    container: {
        marginTop: '30%',
        height: '70%',
        width: '80%',
        borderRadius: 4,
        borderColor: '#6b6b6b',
        backgroundColor: '#8e8e8e',
        alignSelf: 'center'
    },
    dataContainer: {
        paddingVertical: '10%',
        paddingHorizontal: '5%'
    },
    textTitle: {
        fontSize: 16,
        fontWeight: 'bold'
    },
    textContent: {
        marginBottom: 10
    },
    currencyStyle: {
        fontSize: 18,
        fontWeight: 'bold'
    }
});
