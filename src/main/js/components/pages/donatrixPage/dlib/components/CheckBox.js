import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
    StyleSheet,
} from 'react-native';
import IconButton from './IconButton';

/**
 * An IconButton that toggles a checked icon when pressed
 */
export default class CheckBox extends Component {
    constructor(props) {
        super(props);

        this.state = {
            /* state of the checkbox (bool) */
            checked : this.props.checked,
        };

        /** string identifier of the icon displayed during the unchecked state */
        this._checkedIconName = "check-square";
        /** string identifier of the icon displayed during the unchecked state */
        this._uncheckedIconName = "square";

        this.onPress = this.onPress.bind(this);
    }

    render() {
        return(
            <IconButton
                name={(this.state.checked)
                        ? this._checkedIconName
                        : this._uncheckedIconName
                }
                size={this.props.size}
                onPress={this.onPress}
            />
        );
    }

    /**
     * Toggles the icon and calls the onPress prop
     */
    onPress() {
        this.setState((prevState, props) => ({
            checked : !prevState.checked,
        }));
        this.props.onPress();
    }
}

CheckBox.propTypes = {
    /** default state of the checkbox */
    checked : PropTypes.bool,
    /** size of the checkbox icon */
    size : PropTypes.number,
    /** callback called when checkbox is pressed */
    onPress : PropTypes.func,
}

CheckBox.defaultProps = {
    checked : false,
    size : 25,
    onPress : () => null,
}
