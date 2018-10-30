import React, {Component} from 'react';
import {
    View,
    StyleSheet,
    TextInput,
    Text,
} from 'react-native';
import FilterList from './FilterList';
import IconButton from './IconButton';


/**
 * The main toolbar for searching items and accessing the menu
 */
export default class Toolbar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showFilterList : false,
            searchFieldInput : "",
            filterData : {
                    Location : ["Atlanta", "Raleigh", "Richmond"],
                    Category : ["Toys", "Clothing", "Appliances"],
                },
            selectedFilters : {
                    Location : [],
                    Category : [],
            }
        },

        this.onFilterPress = this.onFilterPress.bind(this);
        this.onChangeText = this.onChangeText.bind(this);
        this.syncFilters = this.syncFilters.bind(this);
        this.searchItems = this.searchItems.bind(this);
    }

    render() {
        return (
            <View >
                <View style={styles.container}>
                    <IconButton
                        name="bars"
                    />
                    <TextInput
                        style={styles.textInput}
                        placeholder="Search"
                        onSubmitEditing={this.searchItems}
                        onChangeText={this.onChangeText}
                    />
                    <IconButton
                        name="filter"
                        onPress={this.onFilterPress}
                    />
                </View>
                    <FilterList
                        filterData={this.state.filterData}
                        isVisible={this.state.showFilterList}
                        syncFilters={this.syncFilters}
                    />
            </View>
        );
    }

    onFilterPress() {
        this.setState((prevState, props) => ({
            showFilterList : !prevState.showFilterList,
        }));
    }

    /**
     * Updates the input
     */
    onChangeText(input) {
        this.setState({
            searchFieldInput : input,
        });
    }

    syncFilters(selectedFilters) {
        this.setState({
            selectedFilters : selectedFilters,
        });
        console.log(this.state.selectedFilters);
    }

    /**
     * Querys the back end for items with filters
     */
     searchItems() {
         /*TODO: Implement by updating this.state.items

         This method has access to the following data:
            this.state.searchFieldInput -- the text contained in the input field
            this.state.enabledFilters -- and array of the currently selected filter objects

        A note on filter objects:
            filter objects take the following form:

                {
                    id : [String],
                    subFilters : [array],
                    enabled : [bool],
                }

            When implementing this method, only the id attribute is relevant.
            The id attribute is a String of information about an item that
            can be used to filter it. For example, an item might have the tags,
            toy, red, Atlanta, in which case the id's of its filter objects will
            be "toy", "red", and "Atlanta".

        This component also has an items state, which is just an empty array to
        at mounting time. Use this.setState() to add the results to
        this.state.items via this method
         */

         //For debugging purposes
         console.log("searching... " + this.state.searchFieldInput
                + "\nfilters: " + this.state.enabledFilters.map((filter) => filter.id));
     }
}

Toolbar.propTypes = {

}

Toolbar.defaultProps = {

}

const styles = StyleSheet.create({
    container : {
        alignItems : 'center',
        flexDirection : 'row',
        borderWidth : .5,
        borderRadius : 10,
        backgroundColor : '#FFFFFF',
        marginHorizontal : 40,
        marginTop : 50,
        zIndex : 1,
    },
    textInput : {
        flexGrow : 1,
    },
});
