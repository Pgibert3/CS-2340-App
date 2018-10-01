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
        /*TODO: Send values down to java methods
        and get a success flag and/or error messages*/
    }
}
