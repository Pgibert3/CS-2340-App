import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
    View,
    Text,
    StyleSheet,
} from 'react-native';

/**
 * A component that wraps item data. Is displayed in an ItemList
 *
 * @param title {string} title of the item
 */
export default class ItemListItem extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>{this.props.title}</Text>
            </View>
        );
    }
}

ItemListItem.propTypes = {
    /** title of the item */
    title : PropTypes.string,
}

ItemListItem.defaultProps = {
    title : "",
}

const styles = StyleSheet.create({
    /** Styling for the outermost view */
    container : {
        flexDirection : 'row',
    },
    /** Styling for the title of the item*/
    title : {
        flexGrow : 1,
        fontSize : 26,
    },
});
