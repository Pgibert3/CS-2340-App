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
