import React, {Component} from 'react';
import {
    View,
    TextInput,
    StyleSheet,
    TouchableHighlight,
    FlatList,
    Text,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import PropTypes from 'prop-types';


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

        };

        this.styles = StyleSheet.create({
            container : {
                flex : 1,
            }
        });
    }

    render() {
        return (
            <View style={this.styles.container}>
                <Toolbar
                    filterData={[
                        {
                            id : 'Location',
                            subFilters : [
                                {id : 'NC', subFilters : [], enabled : false,},
                                {id : 'VA', subFilters : [], enabled : false,},
                                {id : 'GA', subFilters : [], enabled : false,}
                            ],
                            enabled : false,
                        },
                        {
                            id : 'Category',
                            subFilters : [
                                {id : 'Clothes', subFilters : [], enabled : false,},
                                {id : 'Toys', subFilters : [], enabled : false,},
                                {id : 'Furniture', subFilters : [], enabled : false,}
                            ],
                            enabled : false,
                        },
                    ]}
                />
            </View>
        );
    }
}

/**
 * The main toolbar for searching items and accessing the menu
 */
class Toolbar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            filterData : this.props.filterData,
            enabledFilters : [],
            showFilterDialog : false,
            searchFieldInput : "",
            items : [],
        };

        this.onFilterPress = this.onFilterPress.bind(this);
        this.onChangeText = this.onChangeText.bind(this);
        this.searchItems = this.searchItems.bind(this);

        this.styles = StyleSheet.create({
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
            searchTextInput : {
                flexGrow : 1,
            },
            menuIcon : {
                marginLeft: 15,
                marginRight: 10,
            },
            filterIcon : {
                marginLeft: 10,
                marginRight: 15,
            },
        });
    }

    render() {
        return (
            <View >
                <View style={this.styles.container}>
                    <IconButton
                        name="bars"
                        size={25}
                        style={this.styles.menuIcon}
                    />
                    <TextInput
                        placeholder="Search"
                        style={this.styles.searchTextInput}
                        onSubmitEditing={this.searchItems}
                        onChangeText={this.onChangeText}
                    />
                    <IconButton
                        name="filter"
                        size={25}
                        style={this.styles.filterIcon}
                        onPress={this.onFilterPress}
                    />
                </View>
                {
                    (this.state.showFilterDialog)
                            ? <FilterDialog
                                headerTitle="Filters"
                                filterData={this.state.filterData}
                                updateFilterData={this.updateFilterData}

                            />
                            : <View />
                }
            </View>
        );
    }

    /**
     * toggles the filter dialog visibility when ...
     * the filter icon of the toolbar is clicked
     */
    onFilterPress() {
        let filters = this.getEnabledFilters(this.state.filterData);
        this.setState((prevState, props) => ({
            showFilterDialog : !prevState.showFilterDialog,
            enabledFilters : filters,
        }));
    }

    /**
     * Recursively returns the enabled root filters from the filters param into this.state.filters
     */
    getEnabledFilters(scope) {
        let rootFilters = [];
        //for each filter, recursivly traverse to a root filter
        scope.forEach((item) => {
            if (item.subFilters.length > 0) {
                rootFilters = rootFilters.concat(this.getEnabledFilters(item.subFilters));
            } else if (item.enabled) {
                //append the root filter to rootFilters
                rootFilters = rootFilters.concat([{id : item.id}]);
            }
        });
        return rootFilters;
    }

    /**
     * Updates the input
     */
    onChangeText(input) {
        this.setState({
            searchFieldInput : input,
        });
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
    /** Required data for generating filter structure */
    filterData : PropTypes.array.isRequired,
}

Toolbar.defaultProps = {

}


/**
 * A navigation dialog that filters data passed into its state
 */
class FilterDialog extends Component {
    constructor(props) {
        super(props);

        this.styles = StyleSheet.create({
            container : {
                flexDirection : 'column',
                marginHorizontal : 40,
                marginTop : -10,
                borderWidth : 1,
                backgroundColor : '#FFFFFF',
            },
            header : {
                paddingTop : 10,
            },
            headerTitle : {
                fontSize : 24,
            },
            flatList : {
                height : 40,
            },
            seperator : {
                height : 1,
                width : '100%',
                backgroundColor : '#000000',
            }
        });

        this.state = {
            filterData : this.props.filterData,
            activeFilters : [],
        };

        this.renderSeperator = this.renderSeperator.bind(this); //<- why does this need to be binded and not the other render method?
        this.onFilterItemPress = this.onFilterItemPress.bind(this);
        this.onFilterItemArrowPress = this.onFilterItemArrowPress.bind(this);
    }

    render() {
        return (
            <View style={this.styles.container}>
                <View style={this.styles.header}>
                    <Text style={[
                            this.styles.headerTitle,
                            this.props.headerTitleStyle
                    ]}
                    >{this.props.headerTitle}</Text>
                </View>
                <View>
                    <FlatList
                            style={this.styles.flatList}
                            data={this.state.filterData}
                            renderItem={({item}) => this.renderFilterListItem(item)}
                            ItemSeparatorComponent={this.renderSeperator}
                            keyExtractor={(item, index) => item.id}
                    />
                </View>
            </View>
        );
    }

    /**
     * Renders a row of data into a filter to be listed in the dialog
     */
    renderFilterListItem(item) {
        return (
            <FilterListItem
                uid={item.id}
                title={item.id}
                checked={item.enabled}
                hideArrow={(item.subFilters.length < 1) ? true : false}
                onArrowPress={this.onFilterItemArrowPress}
                onCheckPress={this.onFilterItemPress}
            />
        );
    }

    /**
     * Renders a component that is passed inbetween ...
     * the elements of the list in the main dialog
     */
    renderSeperator() {
        return (
            <View style={this.styles.seperator} />
        );
    }

    /**
     * Recursivly traverses down a filter item's subFilters and ...
     * sets the value of enabled and updates this.state.filterData
     */
     setFilters(uid, enabled) {
         /**
          * Recursivly enables all subFilters of param data
          */
         function _enableSubFilters(data, enabled) {
             data.map((element) => {
                 element.enabled = enabled;
                 if (element.subFilters.length > 0) {
                     element.subFilters = _enableSubFilters(
                            element.subFilters,
                            enabled);
                 }
             });
             return data;
         }

         /**
          * sets enabled and applies _enableSubFilters to any ...
          * filter item matching param uid
          */
         function _getParent(data, uid, enabled) {
             data.map((element) => {
                 if (element.id === uid) {
                     element.enabled = enabled;
                     element.subFilters = _enableSubFilters(element.subFilters, enabled);
                 } else if (element.subFilters.length > 0) {
                     _getParent(element.subFilters, uid, enabled);
                 }
             });
             return data;
         }

         this.setState((prevState, props) => {
             let newData = _getParent(prevState.filterData, uid, enabled);
             return ({
                 filterData : newData,
             });
         });
     }

    /**
     * Returns the last filter item with a matching uid in scope
     */
    getFilterItem(uid, scope) {
        let match = null;
        for (item of scope) {
            if (item.id === uid) {
                match = item;
            } else if (item.subFilters.length > 0) {
                //recursivly traverse down subFilters and only replace match
                //if sub_match != null
                sub_match = this.getFilterItem(uid, item.subFilters);
                match = (sub_match == null) ? match : sub_match;
            }
        }
        return match;
    }

    /**
     * Toggles enabled on pressed filter and its sub filters
     * depending on the resulting value of enabled
     */
    onFilterItemPress(uid) {
        let item = this.getFilterItem(uid, this.state.filterData);
        this.setFilters(uid, !item.enabled); //Set enabled for filter item and subFilters
    }

    /**
     * Updates this.state.visibleFilters and ...
     * wraps this.props.onListItemArrowPress()
     */
     onFilterItemArrowPress(uid) {
         let item = this.getFilterItem(uid, this.state.filterData);
         this.setState((prevState, props) => ({
             filterData : item.subFilters,
         }));
         this.props.onFilterItemArrowPress(uid);
     }

}

FilterDialog.propTypes = {
    /** Optional text to display in the header */
    headerTitle : PropTypes.string,
    /** Required filter data for generating filter list items */
    filterData : PropTypes.array.isRequired,
    /** Optional callback called if checkbox is checked or unchecked */
    onFilterItemPress : PropTypes.func,
    /** Optional callback called if arrow is pressed */
    onFilterItemArrowPress : PropTypes.func,
    /** Optional styling for the header text */
    headerTitleStyle : PropTypes.object,
    /** Optional styling for the filter list item title */
    filterListItemTitleStyle : PropTypes.object,
}

FilterDialog.defaultProps = {
    headerTitle : "",
    onFilterItemPress : () => null, //!!Please review this technique for setting the default value of this prop
    onFilterItemArrowPress : () => null, //!!Please review this technique for setting the default value of this prop
    headerTitleStyle : {},
    filterListItemTitleStyle : {},
}


/**
 * A clickable icon
 */
class IconButton extends Component {
    constructor(props) {
        super(props);

        this.styles = StyleSheet.create({
            iconButton : {
            },
        });

        this.onPress = this.onPress.bind(this);
    }

    render() {
        return (
            <TouchableHighlight onPress={this.onPress}>
                <Icon
                        name={this.props.name}
                        size={this.props.size}
                        style={[this.styles.iconButton, this.props.style]}
                />
            </TouchableHighlight>
        );
    }

    /**
     * Runs the method passed into this.props.onPress when ...
     * the icon is pressed
     */
    onPress() {
        this.props.onPress();
    }
}

IconButton.propTypes = {
    /** Required string identifier of the icon */
    name : PropTypes.string.isRequired,
    /** Optional size of the icon. Defaults to 25 */
    size : PropTypes.number,
    /** Optional callback called if icon is pressed */
    onPress : PropTypes.func,
    /** Optional additional styling */
    style : PropTypes.object,
}

IconButton.defaultProps = {
    size : 25,
    onPress : () => null,  //!!Please review this technique for setting the default value of this prop
    style : {},
}


/**
 * A clickable checkbox
 */
class CheckBox extends Component {
    constructor(props) {
        super(props);

        this.state = {
            checked : this.props.checked,
        };

        // this.styles = StyleSheet.create({
        //
        // });

        /** string identifier of the icon displayed during the unchecked state */
        this._checkedIconName = "check-square";
        /** string identifier of the icon displayed during the unchecked state */
        this._uncheckedIconName = "square";

        this.onPress = this.onPress.bind(this);
    }

    render() {
        return(
            <IconButton
                    name={(this.state.checked)
                            ? this._checkedIconName
                            : this._uncheckedIconName
                    }
                    size={this.props.size}
                    onPress={this.onPress}
            />
        );
    }

    /**
     * Toggles the check icons and this.state.checked, ...
     * next afterwards runs a callback passed to this.props.onPress, ...
     * finally checks the resulting state of checked
     */
    onPress() {
        //Toggle state
        this.setState((prevState, props) => ({
            checked : !prevState.checked,
        }));
        //Call this.props.onPress callback
        this.props.onPress(this.props.id);
    }
}

CheckBox.propTypes = {
    /** Optional starting value of this.state.checked. Defaults to false */
    checked : PropTypes.bool,
    /** Optional size of button. Defaults to 25 */
    size : PropTypes.number,
    /** Optional callback called whenever the check box is pressed */
    onPress : PropTypes.func,
}

CheckBox.defaultProps = {
    checked : false,
    size : 25,
    onPress : () => null,
}

/**
 * A list item with a left and right icon
 */
 class FilterListItem extends Component {
     constructor(props) {
         super(props);

         this.state = {
             checked : this.props.checked,
             hideArrow : this.props.hideArrow,
         }

         this.styles = StyleSheet.create({
             container : {
                 flexDirection : 'row',
             },
             title : {
                 flexGrow : 1,
             },
             checkbox : {

             },
             arrow : {

             },
         });

         this.onCheckPress = this.onCheckPress.bind(this);
         this.onArrowPress = this.onArrowPress.bind(this);
     }

     render() {
         return(
             <View style={this.styles.container}>
                 <CheckBox
                         checked={this.props.checked}
                         onPress={this.onCheckPress}
                 />
                 <Text style={[
                             this.styles.title,
                             this.props.titleStyle
                 ]}
                 >{this.props.title}</Text>
                 {(this.state.hideArrow) ? null :
                     <IconButton
                             name="arrow-right"
                             onPress={this.onArrowPress}
                             style={this.styles.arrow}
                     />
                 }
             </View>
         );
     }

     /**
      * Is called when the checkbox is pressed and ...
      * wraps this.props.onCheckPress. ...
      * Also appropraitly calls this.onCheck() or this.onUncheck()
      */
      onCheckPress() {
          this.setState((prevState, props) => ({
              checked : !prevState.checked,
          }));
          this.props.onCheckPress(this.props.uid);
      }

      /**
       * Is called when the arrow is pressed and ...
       * wraps this.props.onArrowPress
       */
       onArrowPress() {
           this.props.onArrowPress(this.props.uid);
       }

       /**
        * Is called when the title is pressed and ...
        * wraps this.props.onTitlePress
        */
        onTitlePress() {
            this.props.onTitlePress(this.props.uid);
        }
 }

FilterListItem.propTypes = {
     /** Required unique string instance identifier */
     uid : PropTypes.string.isRequired,
     /** Optional text displayed in the list item */
     title : PropTypes.string,
     /** Optional starting value of checkbox. Defaults to false */
     checked : PropTypes.bool,
     /** Optional. Hide arrow if true. Defaults to false */
     hideArrow : PropTypes.bool,
     /** Optional callback called if the checkbox is pressed */
     onCheckPress : PropTypes.func,
     /** Optional callback called if the arrow is pressed */
     onArrowPress : PropTypes.func,
     /** Optional styles for title */
     titleStyle : PropTypes.object,
 }

FilterListItem.defaultProps = {
     title : "",
     checked : false,
     hideArrow : false,
     onCheckPress : () => null,
     onArrowPress : () => null,
     onTitlePress : () => null,
     titleStyle : {},
 }
