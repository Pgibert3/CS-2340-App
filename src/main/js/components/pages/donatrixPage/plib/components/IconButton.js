import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
    StyleSheet,
    TouchableHighlight,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

/**
 * A clickable icon
 *
 * @prop name -- string identifier of the icon (required string)
 * @prop size -- size of the icon (optional number; default: 25)
 * @prop onPress -- callback called if icon is pressed (optional func; default: null)
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
     * Is called when icon is pressed
     */
    onPress() {
        this.props.onPress();
    }
}

IconButton.propTypes = {
    /* string identifier of the icon (required string) */
    name : PropTypes.string.isRequired,
    /* size of the icon (optional number; default: 25) */
    size : PropTypes.number,
    /* callback called if icon is pressed (optional func; default: null) */
    onPress : PropTypes.func,
}

IconButton.defaultProps = {
    size : 25,
    onPress : () => null,
}

const styles = StyleSheet.create({
    /* Styling for the icon */
    iconButton : {
        //Currently not implemented
    },
});
