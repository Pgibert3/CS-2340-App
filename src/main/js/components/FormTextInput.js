import React, {Component} from 'react';
import {View, Text} from 'react-native'
import TextInput from 'TextInput';
import {VIEW_STYLES, FORM_TEXT_INPUT_STYLES} from '../styles';
import PropTypes from 'prop-types';

/**
 *  Form Input that wraps a TextInput Component
 *
 * @return Returns a TextInput with styling and a title
 */
export default class FormTextInput extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <View style={VIEW_STYLES.formElement}>
                <Text style={FORM_TEXT_INPUT_STYLES.title}>{this.props.title}</Text>
                <TextInput
                    onChangeText={this.props.onChangeText}
                    secureTextEntry={this.props.secureTextEntry}
                    style={FORM_TEXT_INPUT_STYLES.inputField}
                />
            </View>
        );
    }
}

FormTextInput.defaultProps = {
    secureTextEntry: false
}
