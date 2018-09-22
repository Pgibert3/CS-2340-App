'use strict';

import React, {Component} from 'react';
import {View, Text, Button} from 'react-native';
import DxButton from '../DxButton';

/**
 * Welcome Page displays a title and option to login or register
 */
export default class WelcomePage extends Component<{}> {
    render() {
        return (
            <DxButton text="test"/>
        );
    }
}

const mapStateToProps = state => {
    return {
        
    }
}
