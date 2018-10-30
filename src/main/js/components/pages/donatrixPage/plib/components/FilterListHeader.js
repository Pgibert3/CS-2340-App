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
 * A header for a FilterList that does not scroll. Can render a checkbox or
 * back arrow based on the the prop isChildHeader
 *
 * @prop uid -- unique id of the Header (required string)
 * @prop title -- Title of the filter (optional string; default: "")
 * @prop enabled -- Initial value of the checkbox if applicable. (optional bool; default: true)
 * @prop isChildHeader -- Whether or not the header is for the lower level fitlers. Will render a back arrow if true, otherwise a select all checkbox (option bool; default: false)
 * @prop onActionItemPress -- Callback for left most item press (optional func; default: null)
 * @prop titleStyle -- Additional filter title styling (optional object; default: {})
 */
export default class FilterListHeader extends Component {
    constructor(props) {
        super(props);

        this.state = {
            /* state of the check box */
            enabled : this.props.enabled,
        }

        this.onActionItemPress = this.onActionItemPress.bind(this);
    }

    render() {
        return(
            <View style={styles.container}>
                {(this.props.isChildHeader)
                        ? <IconButton
                                name="arrow-left"
                                onPress={this.onActionItemPress}
                            />
                        : <View />
                }
                <Text style={[styles.title, this.props.titleStyle]}>
                        {this.props.title}
                </Text>
            </View>
        );
    }

    /**
    * Called when the rendered item on the left is pressed
    */
    onActionItemPress() {
        this.props.onActionItemPress(this.props.uid);
    }
}

FilterListHeader.propTypes = {
    /* unique id of the Header (required string) */
    uid : PropTypes.string.isRequired,
    /* title of the filter (optional string; default: "") */
    title : PropTypes.string,
    /* Initial value of the checkbox. (optional bool; default: true) */
    enabled : PropTypes.bool,
    /* Whether or not the header is for the lower level fitlers. Will render a back arrow if true, otherwise a select all checkbox (option bool; default: false) */
    isChildHeader : PropTypes.bool,
    /* Callback for left most item press (optional func; default: null) */
    onActionItemPress : PropTypes.func,
    /* Additional filter title styling (optional object; default: {}) */
    titleStyle : PropTypes.object,
}

FilterListHeader.defaultProps = {
    title : "",
    enabled : false,
    isChildHeader: false,
    onActionItemPress : () => null,
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
