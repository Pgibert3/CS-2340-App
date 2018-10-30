import React, {Component} from 'react';
import {
    View,
    StyleSheet,
    TextInput,
    Text,
} from 'react-native';
import FilterList from './FilterList';
import IconButton from './IconButton';
import FullDialog from './FullDialog';
import DropDownDialog from './DropDownDialog';
import ItemList from "./ItemList";


/**
 * The main toolbar for searching items and accessing the menu
 */
export default class Toolbar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            searchFieldInput : "",
        },

        this.onChangeText = this.onChangeText.bind(this);
        this.onSubmitSearch = this.onSubmitSearch.bind(this);
    }

    render() {
        return (
            <View style={styles.container}>
                <IconButton
                    name="bars"
                />
                <TextInput
                    style={styles.textInput}
                    placeholder="Search"
                    onSubmitEditing={this.onSubmitSearch}
                    onChangeText={this.onChangeText}
                />
                <IconButton
                    name="filter"
                    onPress={this.props.onFilterPress}
                />
            </View>
        );
    }

    // onSearchSubmit() {
    //     let result = this.props.onSearchSubmit(
    //             this.state.searchFieldInput,
    //             this.state.selectedFilters
    //         );
    //
    //     this.setState({
    //         foundItems : [{id : "item1", title : "item1"}, {id : "item2", title : "item2"}],
    //         showItemList : true,
    //     });
    // }

    /**
     * Updates the input
     */
    onChangeText(input) {
        this.setState({
            searchFieldInput : input,
        });
    }

    onSubmitSearch() {
        this.props.onSubmitSearch()
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
