import React, {Component} from 'react';
import {
    View,
    StyleSheet,
    FlatList,
} from 'react-native';
import ItemListItem from "./ItemListItem";
import ItemListHeader from "./ItemListHeader";

/**
 * A FlatList wrapper
 */
export default class ItemList extends Component {
    constructor(props) {
        super(props);

        this.state = {
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

    renderItem(item) {
        return (
            <ItemListItem
                uid={item.id}
                title={item.title}
            />
        );
    }

    renderSeperator() {
        return (
            <View style={styles.seperator} />
        );
    }
}

const styles = StyleSheet.create({
    /* Styling for the body of the dialog */
    container : {

    },
    seperator : {
        height : 1,
        width : '100%',
        backgroundColor : '#000000',
    },
});
