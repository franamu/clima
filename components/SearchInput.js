import React from 'react';
import {
	StyleSheet,
	View,
	TextInput
} from 'react-native';

import PropTypes from 'prop-types';

export default class SearchInput extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			text: ''
		}
	} 
	handleChangeText = text => {
		this.setState({text});
	}

	handleSubmitEditing = () => {
		const { onSubmit } = this.props;
		const { text } = this.state;

		if (!text) return;
		
		onSubmit(text);
		this.setState({text: ''});
	}
	render() {
		const { placeholder } = this.props;
    	const { text } = this.state;
		return (
			<View style={styles.container}>
				<TextInput
	                autoCorrect={false}
	                value={text}
	                placeholder= {placeholder}
	                placeholderTextColor = 'white'
	                style={styles.textInput}
	                clearButtonMode='always'
	                onChangeText={this.handleChangeText}
	                onSubmitEditing={this.handleSubmitEditing}
	            />
	        </View>
		)
	}
}

SearchInput.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
};

SearchInput.defaultProps = {
  placeholder: '',
};


const styles = StyleSheet.create({
	container: {
	    backgroundColor: '#fff',
	    alignItems: 'center',
	    justifyContent: 'center',
	    backgroundColor: '#212121',
	    height: 40,
	    width: 300,
	    marginTop: 20,
	    marginHorizontal: 20,
	    paddingHorizontal: 10,
	    alignSelf: 'center'
  },
  textInput: {
  	flex: 1,
  	color: 'white',
  }
});