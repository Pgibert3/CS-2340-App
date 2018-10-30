import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
    View,
    Text,
    StyleSheet,
} from 'react-native';
import CheckBox from './CheckBox';

/**
 * A list item that displays a checkbox on the left in
 * addition to a title left aligned. NOTE that the title prop of a FilterItem
 * serves as its unique id
 *
 * @prop title -- title and unique id of the filter (required string)
 * @prop enabled -- Initial value of the checkbox. (optional bool; default: true)
 * @prop onCheckPress -- Callback for checkbox press (optional func; default: null)
 * @prop onArrowPress -- Callback for arrow press (optional func; default: null)
 * @prop titleStyle -- Additional filter title styling (optional object; default: {})
 */
export default class FilterListItem extends Component {
     constructor(props) {
         super(props);

         this.state = {
             /* state of the checkbox (bool) */
             enabled : this.props.enabled,
         }

         this.onCheckPress = this.onCheckPress.bind(this);
     }

    render() {
        return(
            <View style={styles.container}>
                <CheckBox
                        checked={this.props.enabled}
                        onCheckPress={this.onCheckPress}
                    />

                <Text style={[
                        styles.title,
                        this.props.titleStyle
                        ]}
                    >{this.props.title}</Text>
            </View>
        );
    }

    /**
    * Called when the checkbox is pressed
    * Toggles enabled state and calls passed in onCheckPress
    */
    onCheckPress() {
        this.setState((prevState, props) => ({
                enabled : !prevState.enabled,
            }));
        this.props.onCheckPress(this.props.title);
    }

    /**
    * Called when arrow is pressed
    * Calls passed in onArrowPress
    */
    onArrowPress() {
        this.props.onArrowPress(this.props.title);
    }
 }

FilterListItem.propTypes = {
    /* title and unique id of the filter (required string) */
    title : PropTypes.string.isRequired,
    /* Initial value of the checkbox. (optional bool; default: true) */
    enabled : PropTypes.bool,
    /** Callback for checkbox press (optional func; default: null) */
    onCheckPress : PropTypes.func,
    /* Additional filter title styling (optional object; default: {}) */
    titleStyle : PropTypes.object,
 }

FilterListItem.defaultProps = {
     enabled : false,
     onCheckPress : () => null,
     onTitlePress : () => null,
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
