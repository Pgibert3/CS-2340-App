import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  Animated,
  Easing,
  TouchableWithoutFeedback
} from 'react-native';
import {COLORS} from '../styles';

export default class Button extends Component {
    constructor(props) {
      super(props);
      this.animatedValue = new Animated.Value(0);
      this.onPress = this.onPress.bind(this);

      this.buttonScale = this.animatedValue.interpolate({
          inputRange: [0, 0.5, 1],
          outputRange: [1, .95, 1]
      });

      this.buttonOpacity = this.animatedValue.interpolate({
          inputRange: [0, 0.5, 1],
          outputRange: [1, .5, 1]
      });

      this.styles = StyleSheet.create({
          button: {
              alignItems: 'center',
              padding: 10,
              margin: 10,
              backgroundColor: COLORS.PRIMARY_BLUE,
              elevation: 0,
          },
          title: {
              color: COLORS.PALE_WHITE
          }
      });

    }

    render() {
        return (
            <TouchableWithoutFeedback onPress={this.onPress} >
                <Animated.View style={[
                    this.styles.button,
                    {
                        transform: [
                            {scale: this.buttonScale}
                        ],
                        opacity: this.buttonOpacity
                    }
                    ]}
                >
                <Text style={this.styles.title}>{this.props.title}</Text>
                </Animated.View>
            </TouchableWithoutFeedback>
        );
    }

    scale() {
        this.animatedValue.setValue(0);
        Animated.timing(
            this.animatedValue,
            {
                toValue: 1,
                duration: 100,
                easing: Easing.linear
            }
        ).start();
    }

    onPress() {
        this.scale();
        this.props.onPress();
    }
}
