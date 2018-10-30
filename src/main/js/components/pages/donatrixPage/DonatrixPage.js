import React, {Component} from 'react';
import {
    View,
    StyleSheet,
} from 'react-native';
import {
    Toolbar,
    FullDialog,
    DropDownDialog,
    FilterList,
    ItemList,
} from './dlib/DLib';

/**
 * Main page of the donatrix
 */
export default class DonatrixPage extends Component {
    static navigationOptions = {
        title: 'Donatrix',
    };

    constructor(props) {
        super(props);

        this.state = {
            /**
             * the data structure describing all filters. Takes the form of a
             * BooleanTree:
             * [
             *  { id:<id>,
             *     value:<value>,
             *     bool:<bool>,
             *     children:[<nested nodes of the same structure>...]
             *   },
             * ... ]
             */
            filterData : this.formatToNestedBoolean({
                    Location : ["CLT", "ATL", "RCH"],
                    Category : ["A", "B", "C"]}
                    , true), //Hard coded data for now
            /**
             * The filters currently selected that will be applied when
             * searching for items
             */
            selectedFilters : [],
            /** When true will render the list of filters to select/deselect */
            showFilterList : false,
            /**
             * An array of the most recent return of an item search
             * Takes the form:
             * [
             *  {id:<item id>, value:<item value>},
             * ... ]
             */
            foundItems: [],
        };

        this.toggleFilterList = this.toggleFilterList.bind(this);
        this.syncFilterData = this.syncFilterData.bind(this);
        this.toggleItemList = this.toggleItemList.bind(this);
        this.search = this.search.bind(this);
    }

    render() {
        return (
            <View style={styles.container}>
                <Toolbar
                    onFilterPress={this.toggleFilterList}
                    onSubmitSearch={this.search}
                />
                {(this.state.showFilterList)
                    ? <DropDownDialog isVisible={this.state.showFilterList} >
                        <FilterList
                            filterData={this.state.filterData}
                            isVisible={this.state.showFilterList}
                            syncFilterData={this.syncFilterData}
                            onFilterPress={this.toggleFilterList}
                        />
                    </DropDownDialog>
                    : <View />}

                {(this.state.showItemList)
                    ? <FullDialog isVisible={this.state.showItemList} >
                       <ItemList
                           items={this.state.foundItems}
                           onBackArrowPress={this.toggleItemList}
                       />
                    </FullDialog>
                    : <View />}
            </View>
        );
    }

    /**
     * Toggles the view of the list of filters
     */
    toggleFilterList() {
        this.setState((prevState, props) => ({
            showFilterList : !prevState.showFilterList,
        }));
    }

    /**
     * Called whenever a filter is selected or deselected
     * Updates state with all currently selected filters
     *
     * @param selectedFilters {object[]} A BooleanTree structure of filter data
     */
    syncFilterData(selectedFilters) {
        this.setState({
            selectedFilters : selectedFilters,
        });
    }

    /**
     * Toggles the view of the list of filters
     */
    toggleItemList() {
        this.setState((prevState, props) => ({
            showItemList : !prevState.showItemList,
        }));
    }

    /**
     * Runs a search. Is called whenever the user submits text in the Toolbar
     */
    search() {
        //Currently hardcoded to return dummy data
        this.setState({
            foundItems : [
                {id : "i1", title : "IONE"},
                {id : "i2", title : "ITWO"},
                {id : "i3", title : "ITHREE"},
                {id : "i4", title : "IFOUR"},
            ]
        });

        this.toggleItemList();
    }

    /**
     * Formats data into BooleanTree Structure for use in FilterList
     *
     * @param data {object} the data to format. Takes the form:
     *                      {
     *                          Location : ["Location1", "Location2", ...],
     *                          Cataegory : ["Category1", "Category2", ...],
     *                      }
     *
     * @return data formatted according to BooleanTree structure. Defaults all
     *         nodes to true, and names the top level node "all" with value
     *         "Filters"
     */
    formatToNestedBoolean(data, defaultBool) {
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
               {
                   id : "location",
                   value : "Location",
                   bool : defaultBool,
                   children : locationChildren
               },
               {
                   id : "category",
                   value : "Category",
                   bool : defaultBool,
                   children : categoryChildren
               }
           ]
       }];
    }

    /**
     * Gets the childmost filters that are currently selected
     *
     * @param data {object[]} BooleanTree structured data to get selected
     *                        filters from
     *
     * @return the childmost selected filters
     *         i.e. filter.bool = true && filter.children.length == 0
     *         output takes the form:
     *         {
     *           Location : ["Location1", "Location2", ...],
     *           Cataegory : ["Category1", "Category2", ...],
     *         }
     */
    getSelectedFilters(data) {
        let formattedLocations = [];
        this.tree.getLeavesByBool("location", true).forEach((node) => {
            formattedLocations.push(node.id);
        });

        let formattedCategories = [];
        this.tree.getLeavesByBool("category", true).forEach((node) => {
            formattedCategories.push(node.id);
        });

        let formattedFilters = {
            Location : formattedLocations,
            Category : formattedCategories,
        };

        return formattedFilters;
    }
}

const styles = StyleSheet.create({
    /** Styling of the outermost View */
    container : {
    },
});
