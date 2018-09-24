import React, {Component} from 'react';
import {View, Text} from 'react-native';
import Button from '../../Button';
import TextInput from '../../TextInput';
import {submitLoginForm} from '../../../actions';

/**
 * Login Page displays username and password fields ...
 * and a cancel button
 */
export default class LoginPage extends Component {
    render() {
        if (this.props.loggedIn) {
            this.props.navigation.navigate('Welcome')
        }
        return(
            <View>
                <Text>Login Page</Text>
                <Text>Username</Text>
                <TextInput />
                <Text>Password</Text>
                <TextInput />
                <Button
                    title='login'
                    onPress={(onLoginPress}
                />
                <Button
                    title='cancel'
                    onPress={() => this.props.navigation.navigate('Welcome')}
                />
            </View>
        );
    }
}

const mapStateToProps = (state) => ({
    loggedIn: state.loggedIn
});

const mapDispatchToProps = (dispatch) => ({
    onLoginPress: (usernameInput, passwordInput) => (
        dispatch(submitLoginForm(usernameInput, passwordInput))
    )
});

connect(mapStateToProps, mapDispatchToProps)(LoginPage);
