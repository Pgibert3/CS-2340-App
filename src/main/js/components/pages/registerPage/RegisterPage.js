import React, {Component} from 'react';
import {View, Picker, Alert, ScrollView} from 'react-native';
import Text from '../../Text';
import Button from '../../Button';
import FormTextInput from '../../FormTextInput';
import {VIEW_STYLES, TEXT_STYLES} from '../../../styles';
import RNAndroidBridge from '../../../utils/AndroidBridge';
import UserType from '../../../utils/UserType';

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
            fname: '',
            lname: '',
            email: '',
            pass: '',
            confPass: '',
            userType: 'USER',
            locations: [],
            location: 0
        };

        this.onFieldUpdate = this.onFieldUpdate.bind(this); //needed with arrow op?
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidMount() {
        RNAndroidBridge.getLocations()
            .then(arr => {
                this.setState({locations: arr});
            })
            .catch(err => {
                Alert.alert("Error", JSON.stringify(err));
            });
    }

    render() {
        const createPickerItems = location => {
            return <Picker.Item key={location.key} label={location.name} value={location.key} />;
        };
        const items = [];
        for (let i = 0; i < this.state.locations.length; i += 1) {
            items.push(createPickerItems(this.state.locations[i]));
        }

        return (
            <View style={VIEW_STYLES.defaultColumn}>
                <ScrollView style={{width: '100%'}}>
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
                <Picker
                    selectedValue={this.state.userType}
                    style={{ height: 50, width: 200 }}
                    onValueChange={userType => this.setState({userType})}>
                    <Picker.Item label="Admin" value={UserType.ADMIN} />
                    <Picker.Item label="Location Employee" value={UserType.LOCATION_EMPLOYEE} />
                    <Picker.Item label="Manager" value={UserType.MANAGER} />
                    <Picker.Item label="User" value={UserType.USER} />
                </Picker>
                {this.state.userType === UserType.LOCATION_EMPLOYEE ? (
                    <Picker
                        selectedValue={this.state.location}
                        style={{ height: 50, width: 200 }}
                        onValueChange={location => this.setState({location})}>
                        {items}
                    </Picker>
                ) : <Text/>}

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
                </ScrollView>
            </View>
        );
    }

    onFieldUpdate(t, field) {
        const state = {};
        state[field] = t;
        this.setState(state);
    }

    onSubmit() {
        const {
            fname,
            lname,
            email,
            pass,
            confPass,
            userType,
            location
        } = this.state;

        RNAndroidBridge.registerUser(email, pass, `${fname} ${lname}`, false, userType, location)
        .then(response => {
            if (response === 'SUCCESS') {
                Alert.alert("Success", "Registration Successful", [{text: 'Login', onPress: () => {this.props.navigation.navigate('Login');}}]);
            } else {
                Alert.alert("Error", response);
            }
        })
        .catch(error => {
            Alert.alert("Error", error);
        });
    }
}
