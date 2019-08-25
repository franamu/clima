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
  Platform,
  TextInput,
  KeyboardAvoidingView,
  ImageBackground,
  ActivityIndicator
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import { fetchLocationId, fetchWeather} from './utils/api';
import getImageForWeather from './utils/getImageForWeather';
import SearchInput from './components/SearchInput';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            error: false,
            location: '',
            temperature: 0,
            weather: ''
        };
    }

    componentDidMount() {
        this.handleUpdateLocation('Córdoba');
    }
    handleUpdateLocation = city => {

        if(!city) return;

        this.setState({loading: true}, async () => {
            try {
                const locationId = await fetchLocationId(city);
                const { location, weather, temperature } = await fetchWeather(
                    locationId,
                );

            }
        });
    };

    render(){
        const { location } = this.state;
        return (
            <Fragment>
                <StatusBar backgroundColor="#212121" />
                <KeyboardAvoidingView
                    style={styles.container}
                    behavior= {(Platform.OS === 'ios') ? "padding" : null}
                >   
                    <ImageBackground
                        source={getImageForWeather('Clear')}
                        style={styles.imageContainer}
                        imageStyle={styles.image}
                    >
                        <View style={styles.detailsContainer}>
                            <Text style={[styles.largeText, styles.textStyle]}>
                                {location}
                            </Text>
                            <Text style={[styles.smallText, styles.textStyle]}>
                                Despejado
                            </Text>
                            <Text style={[styles.largeText, styles.textStyle]}>
                                8°
                            </Text>
                            <SearchInput
                                placeholder='Buscar tu ciudad'
                                onSubmit= {this.handleUpdateLocation}
                            />
                        </View>
                    </ImageBackground>
                </KeyboardAvoidingView>
            </Fragment>
        );
    }
}

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  container: {
    flex: 1,
    backgroundColor: '#212121',
  },
  textStyle: {
    textAlign: 'center',
    fontFamily:
        Platform.OS === 'ios' ? 'AvenirNext-Regular': 'Roboto',
    color: 'white'
  },
  largeText: {
    fontSize: 44
  },
  smallText: {
    fontSize: 18,
  },
  imageContainer: {
    flex: 1
  },
  images: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: 'cover'
  },
  detailsContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.2)',
    paddingHorizontal: 20
  }
});

export default App;
