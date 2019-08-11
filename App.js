/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Fragment} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Platform
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

const App = () => {
  return (
    <Fragment>
      <StatusBar />
        <View style={styles.container}>
            <Text style={[styles.largeText, styles.textStyle]}>
            Córdoba
            </Text>
            <Text style={[styles.smallText, styles.textStyle]}>
                Despejado
            </Text>
            <Text style={[styles.largeText, styles.textStyle]}>
                24°
            </Text>
        </View>
    </Fragment>
    hola
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  textStyle: {
    textAlign: 'center',
    fontFamily:
        Platform.OS === 'ios' ? 'AvenirNext-Regular': 'Roboto',
  },
  largeText: {
    fontSize: 44
  },
  smallText: {
    fontSize: 18,
  }

});

export default App;
