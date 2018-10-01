import React, { Component } from 'react';
import {Text as NativeText} from 'react-native';

export default class Text extends Component {
    constructor(props) {
        super(props);
    }

    render () {
        return(
            <NativeText style={this.props.style}>{this.props.text}</NativeText>
        );
    }
}
