import React, {Component} from 'react';
import {
    View,
    StyleSheet, Alert,
} from 'react-native';
import {
    Toolbar,
    FullDialog,
    DropDownDialog,
    FilterList,
    ItemList,
} from './dlib/DLib';
import RNAndroidBridge from "../../../utils/AndroidBridge";
import ItemCategory from "../../../utils/ItemCategory";

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
            filterData : this.formatToBooleanStructure({
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

    componentDidMount() {
        this.loadFilterData()
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
     *
     * @param title {string} the title of an item to search for
     */
    search(title) {
        let filters = this.state.selectedFilters;
        //filters = {
        //    Locations : ["L1", "L2", ...], Categories : ["C1", "C2", ...],
        // };

        let foundItems = {};

        //TODO: Implement the following comment:
        /*
         *      if (title === "") {
         *           title = <any string>;
         *      }
         *
         *       let foundItems = getMatchingItemsFromBackend(title, filters);
         *
         *    see this.state.foundItems to see the needed format of the
         *    foundItems object to return from getMatchingItemsFromBackend
         */
         //DONE

         this.setState({
             foundItems : foundItems
         });

        this.toggleItemList();
    }

    /**
     * Fetches all possible filters from the backend and formats the data into
     * BooleanTree structure
     */
     loadFilterData() {
         let filtersFromBackend = {};
         let locations = [];
         const categories = Object.values(ItemCategory);

        RNAndroidBridge.getLocations()
            .then(arr => {
                locations = arr.map(loc => loc.name);
                filtersFromBackend = {
                    Location : locations,
                    Category : categories
                };
                this.setState({
                    filterData: this.formatToBooleanStructure(filtersFromBackend),
                })
            })
            .catch(err => {
                Alert.alert("Error", JSON.stringify(err));
            });
     }

    /**
     * Formats data into BooleanTree Structure for use in FilterList
     *
     * @param data {object} the data to format. Takes the form:
     *                      {
     *                          Location : ["Location1", "Location2", ...],
     *                          Category : ["Category1", "Category2", ...],
     *                      }
     *
     * @return data formatted according to BooleanTree structure. Defaults all
     *         nodes to true, and names the top level node "all" with value
     *         "Filters"
     */
    formatToBooleanStructure(data, defaultBool) {
        //Hard coded for now
        function _createDefaultNode(id, value, defaultBool) {
            return {id : id, value : value, bool : defaultBool, children : []}
        }
        alert(JSON.stringify(data['Location']));

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
}

const styles = StyleSheet.create({
    /** Styling of the outermost View */
    container : {
    },
});
