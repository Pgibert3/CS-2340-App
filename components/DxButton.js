'use strict';

import React, {Component} from 'react';
import {Text, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';
/**
 * Generic Button
 * @param text (Required) Text to be displayed in the button
 * @param pressed (Required) Boolean that is true if button has been pressed
 * @param onPress (Optional) A callback to be run when the button is pressed
 *
 * @return react-native Text component with specified styling
 */
const DxButton = ({text, pressed, onPress}) => {
    return (
        <Text
            style={styles.[pressed ? "pressed" : "unpressed"]}
            onPress={onPress}
        >
        {text}
        </Text>
    );
}

DxButton.propTypes = {
    text: PropTypes.string.isRequired,
    pressed: PropTypes.bool.isRequired,
    onPress: PropTypes.func,
}

const styles = StyleSheet.create({
    unpressed : {
        fontSize: 32,
        fontWeight: "700",
        color: "#2222AA",
        textAlign: 'center',
    },
    pressed : {
        fontSize: 32,
        fontWeight: "900",
        color: "#222222",
        textAlign: 'center',
    },
});

export default DxButton;
