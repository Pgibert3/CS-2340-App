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
 * A FlatList wrapper that renders FilterItems
 */
export default class FilterList extends Component {
    constructor(props) {
        super(props);
        /* backing data structure of the FilterList */
        this.tree = new BooleanTree(
            this.formatData(this.props.filterData, true)
            );

        this.state = {
            /* the data of the tree */
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
                            enabled={this.state.filters.bool}
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
                            extraData={this.state}
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
     * renders a filterListItem
     *
     * @param item (object) the node with the filterListItem data to render
     *
     * @return (FilterListItem) a FilterListItem
     */
    renderItem(item) {
        return (
            <FilterListItem
                uid={item.id}
                title={item.value}
                enabled={item.bool}
                onCheckPress={this.toggleFilter}
                onArrowPress={this.expandFilter}
            />
        );
    }

    /**
     * renders a line sperator between FilterLsitItems
     *
     * @return (View) a line
     */
    renderSeperator() {
        return (
            <View style={styles.seperator} />
        );
    }

    toggleFilter(uid) {
        this.tree.toggleNodeBool(uid),
        this.syncSelectedFilters()
    }

    toggleSelectAllFilter(uid) {
        console.log(this.tree.toggleNodeBool(uid));
        this.tree.toggleNodeBool(uid),
        this.setState({
            filters: this.tree.getNode(uid),
        })
        this.syncSelectedFilters()
    }

     expandFilter(uid) {
         this.setState((prevState, props) => ({
             filters: this.tree.getNode(uid),
         }));
     }

     collapseFilter(uid) {
         this.setState((prevState, props) => ({
             filters: this.tree.getParent(prevState.filters.id),
         }));
     }

     formatData(data, defaultBool) {
         //Hard coded for now
         function _createDefaultNode(id, value, defaultBool) {
             return {id : id, value : value, bool : defaultBool, children : []}
         }

         let locationChildren = data["Location"].map((f) => (
             _createDefaultNode(f.toLowerCase(), f, defaultBool)
         ));

         let categoryChildren = data["Category"].map((f) => (
             _createDefaultNode(f.toLowerCase(), f, defaultBool)
         ));

        return [{id : "all", value: "Filters", bool : defaultBool, children : [
                        {id : "location", value : "Location", bool : defaultBool, children : locationChildren},
                        {id : "category", value : "Category", bool : defaultBool, children : categoryChildren}
                ]}];
     }

     syncSelectedFilters() {
         console.log(this.tree.getLeavesByBool("location", true));
         let selectedLocations = [];
         this.tree.getLeavesByBool("location", true).forEach((node) => {
             selectedLocations.push(node.id);
         });

         let selectedCategories = [];
         this.tree.getLeavesByBool("category", true).forEach((node) => {
             selectedCategories.push(node.id);
         });

         let selectedFilters = {
                 Location : selectedLocations,
                 Category : selectedCategories,
             };
         this.props.syncFilters(selectedFilters);
     }
}

const styles = StyleSheet.create({
    container : {
        marginHorizontal : 40,
        marginTop : 0,
        borderWidth : 1,
        backgroundColor : '#FFFFFF',
    },
    header : {
        flexDirection: 'row',
    },
    flatList : {
        height : 100,
    },
    seperator : {
        height : 1,
        width : '100%',
        backgroundColor : '#000000',
    },
});
