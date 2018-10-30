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
} from './plib/PLib';
import BooleanTree from './plib/BooleanTree';


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
            filterData : this.formatToNestedBoolean({Location : ["CLT", "ATL", "RCH"], Category : ["A", "B", "C"]}, true),
            showFilterList : false,
            selectedFilters : [],
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

    toggleFilterList() {
        this.setState((prevState, props) => ({
            showFilterList : !prevState.showFilterList,
        }));
    }

    syncFilterData(selectedFilters) {
        this.setState({
            selectedFilters : selectedFilters,
        });
    }

    toggleItemList() {
        this.setState((prevState, props) => ({
            showItemList : !prevState.showItemList,
        }));
    }

    search() {
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
    container : {
        flexBasis : "100%",
    },
});
