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
