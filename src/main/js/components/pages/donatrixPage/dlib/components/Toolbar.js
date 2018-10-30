import React, {Component} from 'react';
import PropTypes from 'prop-types';
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
 * The main toolbar for searching items and accessing the Donatrix menu
 *
 * @param onfilterPress {func} callback for when the filter icon is pressed
 * @param onSubmitSearch {func} run when the inputted text is submitted
 */
export default class Toolbar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            /** Updated with the current contents of the search bar*/
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

    /**
     * Run when user inputs new text into the search bar,
     * storing the text in state
     *
     * @param input {string} the new text inputted
     */
    onChangeText(input) {
        this.setState({
            searchFieldInput : input,
        });
    }

    /**
     * Wraps the onSubmitSearch callback and is run whenever the user submits
     * text via tapping the check icon on the keyboard
     */
    onSubmitSearch() {
        this.props.onSubmitSearch()
    }
}

Toolbar.propTypes = {
    /** callback for when the filter icon is pressed */
    onFilterPress : PropTypes.func,
    /** run when the inputted text is submitted */
    onSubmitSearch : PropTypes.func,
}

Toolbar.defaultProps = {
    onFilterPress : () => null,
    onSubmitSearch : () => null,
}

const styles = StyleSheet.create({
    /** Styling for the outermost View */
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
    /** Formatting of the TextInput */
    textInput : {
        flexGrow : 1,
    },
});
