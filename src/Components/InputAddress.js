import React, {Component} from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';

class inputAddress extends Component {
    constructor(props) {
        super(props)
        this.state = {
            input: ''
        }
    }
    
  render() {
    return (
      <View style={styles.container}>

        <TextInput
            style={styles.inputStyle}
            onChangeText={(text) => this.setState({ input: text })}
            value={this.state.input}
            placeholder='Enter Address'
            placeholderTextColor='#d6d6d6'
        />
        
        <TouchableOpacity style={styles.buttonContainer} onPress={() => this.props.onContinue(this.state.input)}>
          <Text style={styles.buttonText}>CONTINUE</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default inputAddress

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#828282',
        paddingVertical: 10,
        alignItems: 'center'
    },
    buttonContainer: {
      alignItems: 'center',
      marginTop: 30,
      width: '50%',
    },
    buttonText: {
      color: '#FFF',
      fontSize: 20
    },
    inputStyle: {
        width: '100%',
        fontSize: 16,
        color: '#FFF',
        paddingVertical: 10,
        paddingHorizontal: 20,
        backgroundColor: '#8c8c8c',
        borderTopColor: '#a0a0a0',
        borderTopWidth: 1,
        borderBottomColor: '#a0a0a0',
        borderBottomWidth: 2,
    }
});
