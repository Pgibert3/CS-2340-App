import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
    View,
    StyleSheet,
    FlatList,
} from 'react-native';
import ItemListItem from "./ItemListItem";
import ItemListHeader from "./ItemListHeader";

/**
 * A react native FlatList wrapper for displaying searched for items in a list
 *
 * @param items {object[]} default items to render in the list. Takes the form:
 *                         [{id : <item id>, title : <item title>}, ...]
 */
export default class ItemList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            /**
             * An array of items to display in the list`
             * Takes the form: [{id : <item id>, title : <item title>}, ...]
             */
            items : this.props.items,
        };
    }

    render() {
        return (
            <View style={styles.container}>
                <ItemListHeader
                    title="Items"
                    onBackArrowPress={this.props.onBackArrowPress}
                />
                <FlatList
                    style={styles.flatList}
                    extraData={this.state}
                    data={this.state.items}
                    renderItem={({item}) => this.renderItem(item)}
                    ItemSeparatorComponent={() => this.renderSeperator()}
                    keyExtractor={(item) => item.id}
                />
            </ View>
        );
    }

    /**
     * renders an ItemListItem for a given element of this.state.items. Called
     * repeatedly by the main FlatList
     *
     * @param item {object} the item data to render into an ItemListItem
     *
     * @return an ItemListItem
     */
    renderItem(item) {
        return (
            <ItemListItem
                uid={item.id}
                title={item.title}
            />
        );
    }

    /**
     * renders a line sperator between ItemListItems
     *
     * @return a line seperator
     */
    renderSeperator() {
        return (
            <View style={styles.seperator} />
        );
    }
}

ItemList.propTypes = {
    /** default items to render in the list */
    items : PropTypes.array.isRequired,
}

const styles = StyleSheet.create({
    /** Styling for the outermost View */
    container : {

    },
    /** Styling of the seperator between items in the list */
    seperator : {
        height : 1,
        width : '100%',
        backgroundColor : '#000000',
    },
});
