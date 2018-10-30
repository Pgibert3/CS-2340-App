import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
    View,
    StyleSheet,
} from 'react-native';

/**
 * A window that drops down and floats ontop of the UI
 */
export default class DropDownDialog extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={styles.container}>
                {this.props.children}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    /** Styling of the outermost view */
    container : {
        marginHorizontal : 40,
        marginTop : 0,
        borderWidth : 1,
        backgroundColor : '#FFFFFF',
        height : 60,
    },
});
