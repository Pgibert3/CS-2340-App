import React, {Component} from 'react';
import {
    View,
    FlatList,
    StyleSheet,
    Text,
} from 'react-native';
import FilterListItem from './FilterListItem';
import FilterListHeader from './FilterListHeader';
import IconButton from './IconButton';
import CheckBox from './CheckBox';
import BooleanTree from '../BooleanTree';

/**
 * Container for a list of FilterItems. Wraps a react native FlatList
 *
 * NOTE: Bug with scroll view extending beyond the boundries of the dialog
 */
export default class FilterList extends Component {
    constructor(props) {
        super(props);
        /** The backing data structure of the filters in the list */
        this.tree = new BooleanTree(this.props.filterData);

        this.state = {
            /**
             * The parent filter selected, ofwhich its children are the
             * filters currently being displayed
             */
            filters : this.tree.getNode("all"),
            }

        this.toggleFilter = this.toggleFilter.bind(this);
        this.expandFilter = this.expandFilter.bind(this);
        this.collapseFilter = this.collapseFilter.bind(this);
    }

    render() {
        if (this.props.isVisible) {
            return (
                <View style={styles.container}>
                    <FilterListHeader
                        uid={this.state.filters.id}
                        title={this.state.filters.value}
                        checked={this.state.filters.bool}
                        isChildHeader={this.tree
                                .getParent(this.state.filters.id) != null
                        }
                        onActionItemPress={(this.tree.getParent(
                                this.state.filters.id) == null)
                                        ? this.toggleSelectAllFilter
                                        : this.collapseFilter
                        }
                    />
                    <FlatList
                        style={styles.flatList}
                        data={this.state.filters.children}
                        renderItem={({item}) => this.renderItem(item)}
                        ItemSeparatorComponent={() => this.renderSeperator()}
                        keyExtractor={(item) => item.id}
                    />
                </View>
            );
        } else {
            return (
                <View></View>
            );
        }
    }

    /**
     * renders a filterListItem for a given child of this.state.filters. Called
     * repeatedly by the main FlatList
     *
     * @param {object} item (object) the node with the filterListItem data to render
     *
     * @return (FilterListItem) a FilterListItem
     */
    renderItem(item) {
        return (
            <FilterListItem
                uid={item.id}
                title={item.value}
                checked={item.bool}
                onCheckPress={this.toggleFilter}
                onArrowPress={this.expandFilter}
            />
        );
    }

    /**
     * renders a line sperator between FilterListItems
     *
     * @return a line seperator
     */
    renderSeperator() {
        return (
            <View style={styles.seperator} />
        );
    }

    /**
     * enables/disables a filter and calls a callback with the resulting filter
     * data passed in as a param. This permits parents to view the filter data
     *
     * @public
     * @param uid {string} the unique id of the filter that was toggled
     */
    toggleFilter(uid) {
        this.tree.toggleNodeBool(uid),
        this.syncFilterData()
    }

    /**
     * NOTE: Currently not implemented, due to unresolved issues with toggle not
     * being reflected in the UI of the checkboxes
     *
     * Toggles the top most filter enabled state
     *
     * @param uid {string} the unique id of the filter that was toggled
     */
    toggleSelectAllFilter(uid) {
        this.tree.toggleNodeBool(uid),
        this.setState({
            filters: this.tree.getNode(uid),
        })
        this.syncFilterData()
    }

    /**
     * Displays the children of a filter
     *
     * @public
     * @param uid {string} the unique id of the filter being expanded
     */
    expandFilter(uid) {
        this.setState((prevState, props) => ({
         filters: this.tree.getNode(uid),
        }));
    }

    /**
     * Collapses the list of child filters and navigated up a level pf filters
     *
     * NOTE: This method fails if the top most filter is collapsed
     *
     * @public
     * @param uid {string} the unique id of the filter selected before
     * collapsing
     */
    collapseFilter(uid) {
        this.setState((prevState, props) => ({
         filters: this.tree.getParent(prevState.filters.id),
        }));
    }

    /**
     * Used to send filter data up to a parent component
     */
    syncFilterData() {
        this.props.syncFilterData(this.tree.data);
    }
}

const styles = StyleSheet.create({
    /** Styling for the outermost view */
    container : {
        borderColor : '#FF0000',
        borderWidth : 2,
    },
    /** Formating of the list header */
    header : {
        flexDirection: 'row',
        height : "10%",
    },
    /** Formatting of the wrapped flatList */
    flatList : {
        height : "90%",
    },
    /** Styling of the seperator between items in the list */
    seperator : {
        height : 1,
        width : '100%',
        backgroundColor : '#000000',
    },
});
