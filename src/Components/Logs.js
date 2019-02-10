import React, {Component} from 'react';
import { ScrollView, StyleSheet, View, Text, Image } from 'react-native';
import { List, ListItem, Left, Body, Right } from 'native-base';
import moment from 'moment'
import _ from 'lodash'

import { formatEth } from '../Utils/dataUtils'

class Logs extends Component {
    render() {
        let { ethData, ethAddress, onSelectTxn } = this.props
        console.log(ethData)
        return (
            <ScrollView>
                <List>
                    {_.map(ethData, (data, idx) => {
                        let received = Number(ethAddress) === Number(data.from)
                        let date = new Date(Number(data.timeStamp)*1000)
                        return (
                            <ListItem 
                                avatar 
                                key={idx}
                                button={true}
                                onPress={() => onSelectTxn(data)}>
                                <Left style={styles.iconContainer}>
                                    <Image 
                                        style={{ width: 40, height: 40, resizeMode:'contain' }}
                                        source={require('../../assets/ethereum.png')} />
                                </Left>
                                <Body style={styles.borderStyle}>
                                    <Text style={styles.ethValueStyle}>
                                        {`${formatEth(Number(data.value))} ETH`}
                                    </Text>
                                    <Text style={styles.labelStyle}>
                                        {received ? 'RECEIVED FROM' : 'SENT TO'}
                                    </Text>
                                    <Text numberOfLines={1} style={styles.addressStyle}>
                                        {received ? data.to : data.from}
                                    </Text>

                                    <View style={styles.dateContainer}>
                                        <Text>{moment(date).fromNow()}</Text>
                                    </View>
                                </Body>
                            </ListItem>
                        )
                    })}
                </List>
            </ScrollView>
        );
    }
}

export default Logs

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#898989'
    },
    iconContainer: {
        justifyContent:'center',
        alignItems:'center',
        height: '100%',
    },
    borderStyle: {
        borderBottomWidth: 2,
        borderBottomColor: '#b5b5b5',
        justifyContent: 'center'
    },
    ethValueStyle: {
        fontSize: 16,
        fontWeight: 'bold'
    },
    labelStyle: {
        fontSize: 12,
        fontWeight: 'bold'
    },
    addressStyle: {
    },
    dateContainer: {
        position: 'absolute',
        top: 10,
        right: 10
    }
});
          