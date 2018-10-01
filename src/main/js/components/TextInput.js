import React, {Component} from 'react';
import {TextInput as NativeTextInput} from 'react-native';
import PropTypes from 'prop-types';
import {BASE_STYLES} from '../styles';
/**
 * Basic TextInput Component
 *
 * @return Returns a react-native TextInput with styling
 */
export default class TextInput extends Component {
    constructor() {
        super();
    }

    render() {
        return(
            <NativeTextInput
                onChangeText={this.props.onChangeText}
                secureTextEntry={this.props.secureTextEntry}
                style={this.props.style}
            />
        );
    }
}

TextInput.defaultProps = {
    secureTextEntry: false,
};
