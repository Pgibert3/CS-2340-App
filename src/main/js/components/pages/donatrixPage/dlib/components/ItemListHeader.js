import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
    View,
    Text,
    StyleSheet,
    IconButton,
} from 'react-native';

/**
 * A header for an ItemList
 *
 * @param title {string} the title displayed in the header
 * @param onBackArrowPress {func} callback for when the back arrow is pressed
 */
export default class ItemListItem extends Component {
    constructor(props) {
        super(props);

        this.onBackArrowPress = this.onBackArrowPress.bind(this);
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>{this.props.title}</Text>
            </View>
        );
    }

    /**
     * Callback called when the back arrow is pressed
     */
    onBackArrowPress() {
        this.props.onBackArrowPress();
    }
}

ItemListItem.propTypes = {
    /** the title displayed in the header */
    title : PropTypes.string,
    /** callback for when the back arrow is pressed */
    onBackArrowPress : PropTypes.func,
}

ItemListItem.defaultProps = {
    title : "",
    onBackArrowPress : () => null,
}

const styles = StyleSheet.create({
    /** Styling of the outermost View */
    container : {
        flexDirection : 'row',
    },
    /** Styling of the title */
    title : {
    },
});
