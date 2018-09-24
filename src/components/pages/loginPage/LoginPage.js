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
    constructor() {
        super();

        this.setState({
            submitted: false
        });
    }

    updateInputs(value, field) {
        const text = {};
        this.setState(text[field] = value);
    }

    onLoginPress() {
        this.setState({
            submitted: true
        });

    }

    render() {
        if (this.props.loggedIn) {
            this.props.navigation.navigate('Welcome')
        }
        const submitted = this.state.submitted;

        return(
            <View>
                <Text>Login Page</Text>
                <Text>Username</Text>
                <TextInput updateInputs={this.updateInputs()} submitted={submitted}  />
                <Text>Password</Text>
                <TextInput updateInputs={this.updateInputs()} submitted={submitted} secure={true} />
                <Button
                    title='login'
                    onPress={this.onLoginPress}
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
