import React, {Component} from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { connect } from 'react-redux';
import { NavigationActions, DrawerActions } from 'react-navigation';
import _ from 'lodash'

function Home(props) {

  function _navigateToScreen(route) {
    const navigateAction = NavigationActions.navigate({
        routeName: route
      });
      props.navigation.dispatch(navigateAction);
      props.navigation.dispatch(DrawerActions.closeDrawer())
  }

  function renderBtn(text,link) {
    return <TouchableOpacity onPress={() => _navigateToScreen(link)} style={styles.btn}>
      <Text>{text}</Text>
    </TouchableOpacity>
  }
  return(
    <View style={styles.container}>
      {renderBtn('Coin Checker', 'CoinChecker')}
      {renderBtn('Etherium', 'Etherium')}
    </View>
  )
}

const mapStateToProps = store => {
  return {
  };
};

const mapActionToProps = {
};
export default connect(mapStateToProps,mapActionToProps)(Home);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
    alignItems: 'center',
    justifyContent: 'center'
  },
  btn: {
    padding: 20,
    borderWidth: 1,
    borderRadius: 4,
    width: '60%',
    alignItems: 'center',
    marginVertical: 10
  }
});
