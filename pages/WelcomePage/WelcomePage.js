import React, {Component} from 'react';
import Button from '../components/Button';
import {updatePage} from '../actions';

/**
 * WelcomePage is displayed as the apps home screen
 * with options to login or register
 *
 * @return Text component for title and
 * two Button components for login/register
 */
export default class WelcomePage extends Component {
    render() {
        <Button text="Test" onPressed={() => updatePage('LOGIN_PAGE')} />
    }

    //TODO: Subscribe this component to the App store
}
