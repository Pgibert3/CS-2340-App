import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
    StyleSheet,
    TouchableHighlight,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

/**
 * A generic clickable icon
 *
 * @param name {string} string identifier of the icon
 * @param size {number} size of the icon
 * @param onPress {func} callback called if icon is pressed
 */
export default class IconButton extends Component {
    constructor(props) {
        super(props);

        this.onPress = this.onPress.bind(this);
    }

    render() {
        return (
            <TouchableHighlight onPress={this.onPress}>
                <Icon
                    name={this.props.name}
                    size={this.props.size}
                />
            </TouchableHighlight>
        );
    }

    /**
     * Is called when the icon is pressed
     */
    onPress() {
        this.props.onPress();
    }
}

IconButton.propTypes = {
    /** string identifier of the icon */
    name : PropTypes.string.isRequired,
    /** size of the icon */
    size : PropTypes.number,
    /** callback called if icon is pressed */
    onPress : PropTypes.func,
}

IconButton.defaultProps = {
    size : 25,
    onPress : () => null,
}
