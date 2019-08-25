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
        this.handleUpdateLocation('Los Angeles');
    }
    handleUpdateLocation = city => {

        if(!city) return;

        this.setState({loading: true}, async () => {
            try {
                const locationId = await fetchLocationId(city);
                const { location, weather, temperature } = await fetchWeather(
                    locationId,
                );
                this.setState({
                    loading: false,
                    error: false,
                    location,
                    temperature,
                    weather 
                });
            } catch (e) {
                this.setState({
                    loading: false,
                    error: true
                });
            }
        });
    };

    render(){
        const {
            loading,
            error,
            location,
            weather,
            temperature,
         } = this.state;
        return (
            <Fragment>
                <StatusBar barStyle='light-content' />
                <KeyboardAvoidingView
                    style={styles.container}
                    behavior= {(Platform.OS === 'ios') ? "padding" : null}
                >   
                    <ImageBackground
                        source={getImageForWeather(weather)}
                        style={styles.imageContainer}
                        imageStyle={styles.image}
                    >
                        <View style={styles.detailsContainer}>
                            <ActivityIndicator
                                animating={loading}
                                color="white"
                                size="large"
                            />
                            {!loading && (
                                <View>
                                    {error && (
                                        <Text style={[styles.largeText, styles.textStyle]}>
                                            No pudimos cargar el clima, intenta con otra ciudad.
                                        </Text>
                                    )}

                                    {!error && (
                                        <View>
                                            <Text style={[styles.largeText, styles.textStyle]}>
                                                {location}
                                            </Text> 
                                            <Text style={[styles.smallText, styles.textStyle]}>
                                                {weather}
                                            </Text>
                                            <Text style={[styles.largeText, styles.textStyle]}>
                                                {`${Math.round(temperature)}°`}
                                            </Text>
                                        </View>
                                    )}

                                    <SearchInput
                                        placeholder='Buscar tu ciudad'
                                        onSubmit= {this.handleUpdateLocation}
                                    />
                                </View>
                            )}
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
