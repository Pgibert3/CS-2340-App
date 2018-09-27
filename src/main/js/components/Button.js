import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  Animated,
  Easing,
  TouchableWithoutFeedback
} from 'react-native';

export default class Button extends Component {
    constructor(props) {
      super(props);
      this.scaleValue = new Animated.Value(0);

      this.buttonScale = this.scaleValue.interpolate({
          inputRange: [0, 0.5, 1],
          outputRange: [0, 1.1, 1]
      });

      this.styles = StyleSheet.create({
          button: {
              alignItems: 'center',
              padding: 40,
              borderWidth: 1,
              borderColor: '#FF00FF',
              margin: 20
          },
          title: {
              color: '#FF0000'
          }
      });
    }

    render() {
        const scale = this.scaleValue.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 2]
        });
        return (
            <TouchableWithoutFeedback onPress={this.onPress} >
                <Animated.View style={[
                    this.styles.button,
                    {
                        transform: [
                            {scale: this.buttonScale}
                        ]
                    }
                    ]}
                >
                <Text style={this.styles.title}>{this.props.title}</Text>
                </Animated.View>
            </TouchableWithoutFeedback>
        );
    }

    scale() {
        this.scaleValue.setValue(0);
        Animation.timing(
            this.scaleValue,
            {
                toValue: 1.5,
                duration: 300,
                easing: Easing.linear
            }
        ).start();
    }

    onPress() {
        this.scale();
        this.props.onPress();
    }
}
