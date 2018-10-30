import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
    View,
    Text,
    StyleSheet,
} from 'react-native';
import IconButton from './IconButton';
import CheckBox from './CheckBox';

/**
 * A list item that displays a checkbox on the left and arrow on the right in
 * addition to a left aligned title.
 *
 * @prop uid -- unique id of the ListItem (required string)
 * @prop title -- Title of the filter (optional string; default: "")
 * @prop enabled -- Initial value of the checkbox. (optional bool; default: true)
 * @prop onCheckPress -- Callback for checkbox press (optional func; default: null)
 * @prop onArrowPress -- Callback for arrow press (optional func; default: null)
 * @prop titleStyle -- Additional filter title styling (optional object; default: {})
 */
export default class FilterListItem extends Component {
    constructor(props) {
        super(props);

        this.state = {
            enabled : this.props.enabled,
        }

        this.onCheckPress = this.onCheckPress.bind(this);
        this.onArrowPress = this.onArrowPress.bind(this);
    }

    render() {
        return(
            <View style={styles.container}>
                <CheckBox
                        checked={this.state.enabled}
                        onPress={this.onCheckPress}
                />

                <Text style={[
                        styles.title,
                        this.props.titleStyle
                    ]}
                >{this.props.title}</Text>

                <IconButton
                        name="arrow-right"
                        onPress={this.onArrowPress}
                />
            </View>
        );
    }

    /**
    * Called when the checkbox is pressed
    * Calls passed-in onArrowPress with uid
    */
    onCheckPress() {
        this.props.onCheckPress(this.props.uid)
    }

    /**
     * Called when arrow is pressed
     * Calls passed-in onArrowPress with uid
     */
    onArrowPress() {
        this.props.onArrowPress(this.props.uid)
    }
}

FilterListItem.propTypes = {
    /* unique id of the ListItem (required string) */
    uid : PropTypes.string.isRequired,
    /* title of the filter (optional string; default: "") */
    title : PropTypes.string,
    /* Initial value of the checkbox. (optional bool; default: true) */
    enabled : PropTypes.bool,
    /* Callback for checkbox press (optional func; default: null) */
    onCheckPress : PropTypes.func,
    /* Callback for arrow press (optional func; default: null) */
    onArrowPress : PropTypes.func,
    /* Additional filter title styling (optional object; default: {}) */
    titleStyle : PropTypes.object,
 }

FilterListItem.defaultProps = {
    title : "",
    enabled : false,
    onCheckPress : () => null,
    onArrowPress : () => null,
    titleStyle : {},
}

const styles = StyleSheet.create({
    /* styling of the parent View */
    container : {
        flexDirection : 'row',
    },
    /* styling of the filter title */
    title : {
        flexGrow : 1,
    },
});
