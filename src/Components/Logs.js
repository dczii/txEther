import React, {Component} from 'react';
import { StyleSheet, Text, Image } from 'react-native';
import { List, ListItem, Left, Body, Right } from 'native-base';

class Logs extends Component {
render() {
    return (
            <List>
                <ListItem avatar >
                    <Left style={styles.borderStyle}>
                        <Image 
                            style={{ width: 25, height: 25, overflow: 'visible' }}
                            source={require('../../assets/ethereum.png')} />
                    </Left>
                    <Body style={styles.borderStyle}>
                        <Text>Kumar Pratik</Text>
                        <Text>Doing what you like will always keep you happy . .</Text>
                    </Body>
                    <Right style={styles.borderStyle}>
                        <Text>3:43 pm</Text>
                    </Right>
                </ListItem>
            </List>
    );
}
}

export default Logs

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#898989'
    },
    borderStyle: {
        borderColor: '#b5b5b5',
        justifyContent: 'center'
    }
});
          