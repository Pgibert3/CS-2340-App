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
 * @param uid {string} unique id of the Header
 * @param title {string} Title of the filter
 * @param enabled {bool} Initial value of the checkbox if applicable
 * @param isChildHeader {bool} Whether or not the header is for the lower level
 *                      fitlers. Will render a back arrow if true, otherwise a
 *                      select all checkbox
 * @param onActionItemPress {func} Callback for left most item press
 * @param titleStyle {object} Additional filter title styling
 */
export default class FilterListHeader extends Component {
    constructor(props) {
        super(props);

        this.state = {
            /** If true, the filter is considered to be selected */
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
    * Called when the arrow/checkbox is pressed
    */
    onActionItemPress() {
        this.props.onActionItemPress(this.props.uid);
    }
}

FilterListHeader.propTypes = {
    /** unique id of the Header */
    uid : PropTypes.string.isRequired,
    /** title of the filter */
    title : PropTypes.string,
    /** The default value of a filter's enabled state */
    enabled : PropTypes.bool,
    /**
     * Whether or not the header is for the lower level fitlers
     * Will render a back arrow if true, otherwise a select all checkbox
     * */
    isChildHeader : PropTypes.bool,
    /** Callback for checkbox/arrow press */
    onActionItemPress : PropTypes.func,
    /** Additional filter title styling */
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
    /*8 styling of the outermost View */
    container : {
        flexDirection : 'row',
    },
    /** styling of the filter title */
    title : {
        flexGrow : 1,
    },
});
