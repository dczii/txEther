import React, { useState } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';

function inputAddress(props) {
  let [input, handleInput] = useState('')

  return (
    <View style={styles.container}>

      <TextInput
          style={styles.inputStyle}
          onChangeText={(text) => handleInput(text)}
          value={input}
          placeholder='Enter Address'
          placeholderTextColor='#d6d6d6'
      />

      {props.showError ? 
        <View style={styles.errorContainer}>
          <Text style={styles.textError}>Enter Valid Ethereum Address</Text>
        </View>
      : null}

      <TouchableOpacity style={styles.buttonContainer} onPress={() => props.onContinue(input)}>
        <Text style={styles.buttonText}>CONTINUE</Text>
      </TouchableOpacity>
    </View>
  );
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
    },
    errorContainer: {
      alignSelf: 'center',
      justifyContent: 'center',
      padding: 20,
      backgroundColor: '#ff0505',
      borderWidth: 2,
      borderColor: '#FFF',
      marginTop: 10,
      borderRadius: 5,
      width: '80%',
    },
    textError: {
      fontWeight: 'bold',
      color: '#FFF'
    }
});
