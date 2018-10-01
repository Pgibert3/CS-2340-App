import React, {Component} from 'react';
import {View} from 'react-native';
import Button from '../../Button';
import Text from '../../Text';
import {VIEW_STYLES, TEXT_STYLES} from '../../../styles';

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
              <Text text='Welcome Page' style={TEXT_STYLES.header1} />
              <Button
                  title='login'
                  onPress={() => this.props.navigation.navigate('Login')}
              />
              <Button
                  title='register'
                  onPress={() => this.props.navigation.navigate('Register')}
              />
          </View>
        );
    }
}
