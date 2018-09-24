import React, {Component} from 'react';
import {View, Text} from 'react-native';
import Button from '../../Button';

/**
 * This is the Donatrix
 */
export default class WelcomePage extends Component {
    static navigationOptions = {
        title: 'Welcome'
    };

    render() {
        return (
          <View>
              <Text>Welcome to the Donatrix</Text>
              <Button
                  title='Log out'
                  onPress={() => this.props.navigation.navigate('Welcome')}
              />
          </View>
        );
    }
}

const mapStateToProps = (state) => ({
    username: state.username,
    password: state.password
});

const mapDispatchToProps = (dispatch) => ({
    onSubmit: dispatch()
});
