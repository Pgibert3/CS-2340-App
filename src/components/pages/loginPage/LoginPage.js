import React, {Component} from 'react';
import {View, Text} from 'react-native';
import Button from '../../Button';
import TextInput from '../../TextInput';


/**
 * Login Page displays username and password fields ...
 * and a cancel button
 */
export default class LoginPage extends Component {
    render() {
        return(
            <View>
                <Text>Login Page</Text>
                <Text>Username</Text>
                <TextInput />
                <Text>Password</Text>
                <TextInput />
                <Button
                    title='login'
                    onPress={() => {}}
                />
                <Button
                    title='cancel'
                    onPress={() => this.props.navigation.navigate('Welcome')}
                />
            </View>
        );
    }

    areValidateCredentials(username, password) {
        if (username === "user" && password === "password") {
            return true;
        }
    }
}
