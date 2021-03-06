import React, { useEffect } from 'react';
import {
    View,
    StyleSheet,
    Text,
    ScrollView,
    FlatList,
    SectionList,
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
                <Text>{data.name} - {data.currency} - {data.price}</Text>
            </View>
        )
    }


    let { priceList } = props.coinData
    console.log(priceList)
    return (
        <ScrollView contentContainerStyle={styles.container}>
                
                <SectionList
                    sections={priceList}
                    renderItem={({item, index, section}) => renderItems(item,index)}
                    keyExtractor={(item, index) => item + index}
                />
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
       width: '100%',
       flex: 1,
       padding: 20,
       borderBottomWidth: 1,
       borderBottomColor: 'rgba(255,255,255,0.5)',
       marginVertical: 5,
       alignItems: 'center'
   }
});
