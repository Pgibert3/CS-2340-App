import React, { Component } from 'react';
import {Button as NativeButton, StyleSheet} from 'react-native';

export default class Button extends Component {

    render() {
        return (
            <NativeButton
                style={styles.button}
                title={this.props.title}
                onPress={this.props.onPress}
            />
        );
    }
}

const styles = StyleSheet.create({
    button: {
        alignItems: 'center',
        padding: 20,
        borderWidth: 1,
        borderColor: "#FFFFFF",
        margin: 20
    }
});
