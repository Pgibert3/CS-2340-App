import React, {Component} from 'react';
import {View, Text} from 'react-native';
import Button from '../../Button';
import {VIEW_STYLES} from '../../../styles';
/**
 * Welcome Page is the first screen the user sees when opening the app ...
 * with an option to login or register
 */
export default class WelcomePage extends Component {
    static navigationOptions = {
        title: 'Welcome'
    };

    render() {
        return (
          <View style={VIEW_STYLES.defaultColumn}>
              <Text>Welcome Page</Text>
              <Button
                  title="login"
                  onPress={() => this.props.navigation.navigate('Login')}
              />
              <Button
                  title="register"
                  onPress={() => this.props.navigation.navigate('Welcome')}
              />
          </View>
        );
    }
}
