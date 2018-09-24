import React, {Component} from 'react';
import {TextInput as NativeTextInput} from 'react-native';
import PropTypes from 'prop-types';

/**
 * Basic TextInput Component
 *
 * @return Returns a react-native TextInput with styling
 */
export default class TextInput extends Component {
    constructor() {
        super();
    }

    //What is this?? - Paul -----------
    // componentWillReceiveProps(nextProps) {
    //     if (nextProps.submitted) {
    //         this.propagateValue();
    //     }
    // }
    //
    // propagateValue() {
    //     this.props.updateInputs(this.state.text, 'username');
    // }

    //-------------------------------------

    render() {
        return(
            <NativeTextInput onChangeText={this.props.onChangeText} secureTextEntry={this.props.secureTextEntry} />
        );
    }
}