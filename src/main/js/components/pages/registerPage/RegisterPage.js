import React, {Component} from 'react';
import {View} from 'react-native';
import Text from '../../Text';
import Button from '../../Button';
import FormTextInput from '../../FormTextInput';
import {VIEW_STYLES, TEXT_STYLES} from '../../../styles';

/**
 * Register Page prompts the user with fields to register a new account
 */
export default class RegisterPage extends Component {

    static navigationOptions = {
        title: 'Register',
    };

    constructor(props) {
        super(props);

        this.state = {
            fnameInput: '',
            lnameInput: '',
            emailInput: '',
            passwordInput: '',
            confirmPasswordInput: '',
        }

        this.onFieldUpdate = this.onFieldUpdate.bind(this); //needed with arrow op?
    }

    render() {
        return (
            <View style={VIEW_STYLES.defaultColumn}>
                <Text text="Registration Page" style={TEXT_STYLES.header1}/>

                {/* Form inputs */}
                <FormTextInput
                    title="First Name"
                    onChangeText={(t) => this.onFieldUpdate(t, "fname")}
                />
                <FormTextInput
                    title="Last Name"
                    onChangeText={(t) => this.onFieldUpdate(t, "lname")}
                />
                <FormTextInput
                    title="Email"
                    onChangeText={(t) => this.onFieldUpdate(t, "email")}
                />
                <FormTextInput
                    title="Password"
                    onChangeText={(t) => this.onFieldUpdate(t, "pass")}
                />
                <FormTextInput
                    title="Confirm Password"
                    onChangeText={(t) => this.onFieldUpdate(t, "confPass")}
                />

                {/* buttons */}
                <View style={VIEW_STYLES.defaultRow}>
                    <Button
                        title='register'
                        onPress={this.onSubmit}
                    />
                    <Button
                        title='cancel'
                        onPress={() => this.props.navigation.navigate('Welcome')}
                    />
                </View>
            </View>
        );
    }

    onFieldUpdate(t, field) {
        switch (field) {
            case 'fname':
                this.setState({fnameInput: t});
                break;
            case 'lname':
                this.setState({lnameInput: t});
                break;
            case 'email':
                this.setState({emailInput: t});
                break;
            case 'pass':
                this.setState({passwordInput: t});
                break;
            case 'confPass':
                this.setState({confirmPasswordInput: t});
                break;
            default:
                break;
        }
    }

    onSubmit() {
        const params = {
              fname: this.state.fnameInput,
              lname: this.state.lnameInput,
              email: this.state.emailInput,
              password: this.state.passwordInput,
              confPassword: this.state.confirmPasswordInput,
        };
        /*
            > This runs when the register button is clicked
            > This method needs to call a java method like so:
            const results = javaMethod(params);
            > Where results is an object of the following form:
            results = {
                isValidFname: (boolean),
                isValidLname: (boolean),
                isValidEmail: (boolean),
                matchingPasswords: (boolean)
            }
            > The value of results is purly for UI. The backend has already
            considered whether or not params is valid on its own and updated
            the database accoridngly
        */
        const results = javaMethod(params); //replace with valid method
        let valid = true;

        if (!results.isValidFname) {
            valid = false;
            //Do Something
        }
        if (!results.isValidLname) {
            valid = false;
            //Do Something
        }
        if (!results.isValidEmail) {
            valid = false;
            //Do Something
        }
        if (!results.mathchingPasswords) {
            valid = false;
            //Do Something
        }
        if (valid) {
            //Do Something
            this.props.navigation.navigate('Login') //Go to login page
        }

    }
}
