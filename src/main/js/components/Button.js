import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  Animated,
  Easing,
  TouchableWithoutFeedback
} from 'react-native';

export default class Button extends Component {
    this.scale = new Animated.Value(0);

    const buttonScale = scaleValue.interpolate({
        inputRange: [0, 0.5, 1],
        outputRange: [0, 1.1, 1]
    });

    render() {
        return (
            <TouchableWithoutFeedback onPress={this.props.onPress}
            <Animated.View style={[]}>
        );
    }
    scale() {
        this.scale.setValue(0);
        Animated.timing(
            this.scale,
            {
                toValue: 1,
                duration: 300,
                easing: Easing.easeOutBack
            }
        ).start();
    }

    onPress() {
        scale();
        props.onPress();
    }

    getContent() {
        return <Text style=styles.title>{props.title}</Text>
    }

    const styles = StyleSheet.create({
        title: {
            alignItems: 'center'
        },
        button: {
            alignItems: 'center',
            justifyContext: 'center',
            padding: 20,
            borderWidth: 1,
            borderColor: "FFFFFFF",
            margin: 20
        }
    })
}
