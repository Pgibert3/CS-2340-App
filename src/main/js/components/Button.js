import React, {Component} from 'react';
import {
  StyleSheet,
  Animated,
  Easing,
  TouchableWithoutFeedback,
} from 'react-native';
import Text from './Text';
import {BUTTON_STYLES} from '../styles';


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
    }

    render() {
        return (
            <TouchableWithoutFeedback onPress={this.onPress}>
                <Animated.View style={[
                    BUTTON_STYLES.button,
                    {
                        transform: [
                            {scale: this.buttonScale}
                        ],
                        opacity: this.buttonOpacity
                    }
                    ]}
                >
                <Text style={BUTTON_STYLES.title} text={this.props.title} />
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
