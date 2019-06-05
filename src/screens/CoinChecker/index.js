import React, { useEffect } from 'react';
import {
    View,
    StyleSheet,
    Text,
    ScrollView,
    FlatList,
    TouchableOpacity,
} from 'react-native';
import { connect } from 'react-redux';
import moment from 'moment'
import _ from 'lodash'

import { fetchCoinPrices } from '../../redux/action'

function CoinChecker(props) {
    useEffect(() => {
        props.fetchCoinPrices()
        return () => {}
    }, [])

    function renderItems(data,idx) {
        return(
            <View key={idx} style={styles.coinItemContainer}>
                <Text>{data.currency} - {data.price}</Text>
            </View>
        )
    }


    let { priceList } = props.coinData
    console.log(priceList)
    return (
        <ScrollView contentContainerStyle={styles.container}>
            {_.map(priceList, (item,idx) => {
                return renderItems(item,idx)
            })}
        </ScrollView>
    );
}

const mapStateToProps = store => {
    return {
        coinData: store.checkerReducer
    };
  };
  
const mapActionToProps = {
    fetchCoinPrices,
};
export default connect(mapStateToProps,mapActionToProps)(CoinChecker);

const styles = StyleSheet.create({
   container: {
       backgroundColor: '#e9ebee',
       flex: 1,
       alignItems: 'center',
       paddingVertical: 20,
   },
   coinItemContainer: {
       width: '60%',
       padding: 20,
       borderWidth: 1,
       borderColor: 'rgba(255,255,255,0.5)',
       borderRadius: 4,
       marginVertical: 5,
       alignItems: 'center'
   }
});
