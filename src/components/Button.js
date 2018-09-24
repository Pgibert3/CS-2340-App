import React, {Component} from 'react';
import {Button as NativeButton} from 'react-native';
import PropTypes from 'prop-types';

/**
 * Basic Button Component
 * @param title Text to be displayued in button
 * @param onPress Callback function for when button is pressed
 *
 * @return Returns a react-native Button with styling
 */
export default class Button extends Component {
    render() {
        return(
            <NativeButton
                title={this.props.title}
                onPress={this.props.onPress}
            />
        );
    }
}

//Type checking
Button.propTypes = {
    title: PropTypes.string.isRequired,
    onPress: PropTypes.func,
}
