import React, {Component} from 'react';
import {TextInput as NativeTextInput} from 'react-native';
import PropTypes from 'prop-types';

/**
 * Basic TextInput Component
 *
 * @return Returns a react-native TextInput with styling
 */
export default class TextInput extends Component {
    render() {
        return(
            <NativeTextInput />
        );
    }
}
