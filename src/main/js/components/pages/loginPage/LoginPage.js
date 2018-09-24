import React, {Component} from 'react';
import {View, Text} from 'react-native';
import Button from '../../Button';
import TextInput from '../../TextInput';
import {submitLoginForm} from '../../../actions/index';

/**
 * Login Page displays username and password fields ...
 * and a cancel button
 */
export default class LoginPage extends Component {
    constructor() {
        super();

        this.state = {
            usernameInput: '',
            passwordInput: ''
        };

        this.onUsernameInputChange = this.onUsernameInputChange.bind(this);
        this.onPasswordInputChange = this.onPasswordInputChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.USERNAME = 'neo';
        this.PASSWORD = 'password';
    }

    render() {
        return(
            <View>
                <Text>Login Page</Text>

                {/* Username Field */}
                <Text>Username</Text>
                <TextInput onChangeText={this.onUsernameInputChange} />

                {/* Password Field */}
                <Text>Password</Text>
                <TextInput onChangeText={this.onPasswordInputChange} secureTextEntry={true}/>

                <Button
                    title='login'
                    onPress={this.onSubmit}
                />
                <Button
                    title='cancel'
                    onPress={() => this.props.navigation.navigate('Welcome')}
                />

                {/* Error Message */}
                <Text style={{color: 'red'}}>{this.state.error}</Text>
            </View>
        );
    }

    onUsernameInputChange(t) {
        this.setState({
            usernameInput: t
        });
    }

    onPasswordInputChange(t) {
        this.setState({
            passwordInput: t
        });
    }

    onSubmit() {
        if (this.state.usernameInput === this.USERNAME
                && this.state.passwordInput === this.PASSWORD) {
            this.props.navigation.navigate('Donatrix');
        } else {
            this.setState({error: 'Invalid username or password'});
        }
    }
}
