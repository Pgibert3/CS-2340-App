import React, {Component} from 'react';
import {View} from 'react-native'
import PropTypes from 'prop-types';
import TextInput from './TextInput';
import Text from './Text';
import {VIEW_STYLES, FORM_TEXT_INPUT_STYLES} from '../styles';

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
                <Text
                    style={FORM_TEXT_INPUT_STYLES.title}
                    text={this.props.title}
                />
                <TextInput
                    onChangeText={this.props.onChangeText}
                    secureTextEntry={this.props.secureTextEntry}
                    style={FORM_TEXT_INPUT_STYLES.inputField}
                    underlineColorAndroid='green'
                />
            </View>
        );
    }
}

FormTextInput.defaultProps = {
    secureTextEntry: false
}
