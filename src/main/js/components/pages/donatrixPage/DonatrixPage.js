import React, {Component} from 'react';
import {View} from 'react-native';
import Button from '../../Button';
import Text from '../../Text';

/**
 * This is the Donatrix
 */
export default class DonatrixPage extends Component {
    static navigationOptions = {
        title: 'Donatrix'
    };

    render() {
        return (
          <View>
              <Text text='Welcome to the Donatrix' />
              <Button title='Location Dashboard' onPress={() => this.props.navigation.navigate('Location')} />
              <Button
                  title='Log out'
                  onPress={() => this.props.navigation.navigate('Welcome')}
              />
          </View>
        );
    }
}
