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
 * @param uid {string} unique id of the ListItem
 * @param title {string} title of the filter
 * @param checked {bool} state of the checkbox
 * @param onCheckPress {func} Callback when the checkbox is pressed
 * @param onArrowPress {func} Callback for when the arrow is pressed
 * @param titleStyle {object} Additional filter title styling
 */
export default class FilterListItem extends Component {
    constructor(props) {
        super(props);

        this.state = {
            checked : this.props.checked,
        }

        this.onCheckPress = this.onCheckPress.bind(this);
        this.onArrowPress = this.onArrowPress.bind(this);
    }

    render() {
        return(
            <View style={styles.container}>
                <CheckBox
                    checked={this.state.checked}
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
    */
    onCheckPress() {
        this.props.onCheckPress(this.props.uid)
    }

    /**
     * Called when the arrow is pressed
     */
    onArrowPress() {
        this.props.onArrowPress(this.props.uid)
    }
}

FilterListItem.propTypes = {
    /** unique id of the ListItem */
    uid : PropTypes.string.isRequired,
    /** title of the filter */
    title : PropTypes.string,
    /** state of the checkbox */
    checked : PropTypes.bool,
    /** Callback for when the checkbox is pressed */
    onCheckPress : PropTypes.func,
    /** Callback for when the arrow is pressed */
    onArrowPress : PropTypes.func,
    /** Additional filter title styling */
    titleStyle : PropTypes.object,
 }

FilterListItem.defaultProps = {
    title : "",
    checked : false,
    onCheckPress : () => null,
    onArrowPress : () => null,
    titleStyle : {},
}

const styles = StyleSheet.create({
    /** styling of the outermost View */
    container : {
        flexDirection : 'row',
    },
    /** Styling for the title of the filter */
    title : {
        flexGrow : 1,
    },
});
