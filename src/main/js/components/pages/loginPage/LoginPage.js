import React, {Component} from 'react';
import {View} from 'react-native';
import Text from '../../Text';
import Button from '../../Button';
import FormTextInput from '../../FormTextInput';
import {BASE_STYLES, VIEW_STYLES, TEXT_STYLES} from '../../../styles';
import RNAndroidBridge from '../../../utils/AndroidBridge';

/**
 * Login Page displays username and password fields ...
 * and a cancel button
 */
export default class LoginPage extends Component {

    static navigationOptions = {
        title: 'Register',
    }

    constructor(props) {
        super(props);

        this.state = {
            usernameInput: '',
            passwordInput: '',
        }

        this.onFieldUpdate = this.onFieldUpdate.bind(this); //needed with arrow op?
        this.onSubmit = this.onSubmit.bind(this);

        this.USERNAME = 'user';
        this.PASSWORD = 'pass';
    }

    render() {
        return(
            <View style={VIEW_STYLES.defaultColumn}>

                <Text text='Login Page' style={TEXT_STYLES.header1} />

                {/* Username Field */}
                <FormTextInput
                    title='username'
                    onChangeText={(t) => this.onFieldUpdate(t, "user")}
                />

                {/* Password Field */}
                <FormTextInput
                    title='password'
                    onChangeText={(t) => this.onFieldUpdate(t, "pass")}
                    secureTextEntry={true}
                />

                {/* buttons */}
                <View style={VIEW_STYLES.defaultRow}>
                    <Button
                        title='login'
                        onPress={this.onSubmit}
                    />
                    <Button
                        title='cancel'
                        onPress={() => this.props.navigation.navigate('Welcome')}
                    />
                </View>

                {/* Error Message */}
                <Text style={{color: 'red'}}>{this.state.error}</Text>
            </View>
        );
    }

    onFieldUpdate(t, field) {
        switch (field) {
            case 'user':
                this.setState({usernameInput: t});
                break;
            case 'pass':
                this.setState({passwordInput: t});
                break;
            default:
                break;
        }
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
