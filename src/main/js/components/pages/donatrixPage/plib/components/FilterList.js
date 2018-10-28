import React, {Component} from 'react';
import {
    View,
    FlatList,
    StyleSheet,
} from 'react-native';
import FilterListItem from './FilterListItem'

/**
 * A FlatList wrapper that renders FilterItems
 *
 * @prop onFilterEnable -- callback called when a FilterListItem becomes checked (optional func; default null)
 */
export default class FilterList extends Component {
     constructor(props) {
        super(props);

        this.state = {
            /* the data structure of the FilterList */
            filters : {
                Location : [
                    {title : "L1", enabled: true},
                    {title : "L2", enabled: true},
                    {title : "L3", enabled: true},
                    {title : "L4", enabled: true},
                    {title : "L5", enabled: true},
                ],
                Category : [
                    {title : "C1", enabled: true},
                    {title : "C2", enabled: true},
                    {title : "C3", enabled: true},
                    {title : "C4", enabled: true},
                    {title : "C5", enabled: true},
                    {title : "C6", enabled: true},
                    {title : "C7", enabled: true},
                    {title : "C8", enabled: true},
                ],
            },
            /* The filters currently being displayed */
            visibleFilters : [{title: "Location"}, {title: "Category"}],
            /* The header of the filters being displayed
            * "None" if headers are currently being displayed
            */
            selectedHeader : "None",
        }

        this.showFilters = this.showFilters.bind(this);
        this.showFilterHeaders = this.showFilterHeaders.bind(this);
        this.renderListItem = this.renderListItem.bind(this);
     }

     render() {
        return(
            <FlatList
                style={styles.flatList}
                data={this.state.visibleFilters}
                renderItem={({filter}) => this.renderListItem(filter)}
                ItemSeparatorComponent={() => this.renderSeperator()}
                keyExtractor={(filter) => filter.title}
            />
        );
     }

     /**
      * renders a filterListItem
      *
      * @param title (string) the title of the filterListItem to render
      *
      * @return (FilterListItem) a FilterListItem
      */
      // onCheckPress={this.toggleFilter(
      //         this.state.selectedHeader,
      //         title
      //     )}
     renderListItem(title) {
        alert(title);
        return (
          <FilterListItem
                title={title}
                checked={true}
                hideArrow={this.state.selectedHeader != "None"}
                onArrowPress={(this.state.selectedHeader != "None")
                        ? () => null
                        : this.showFilters
                    }
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

      /**
       * Displays the filters of a filter header
       *
       * @param filterHeader (string) the title of a filter header
       */
      showFilters(filterHeader) {
          //TODO: Handle Exception
          if (this.state.selectedHeader === "None") {
              this.setState({
                  visibleFilters : this._getFilters(filterHeader),
                  selectedHeader : filterHeader,
              });
          }
      }

      /**
       * Displays the filter headers
       * TODO: Throw exception if headers are curently being shown
       */
      showFilterHeaders() {
          if (this.state.selectedHeader != "None") {
              this.setState({
                  visibleFilters : this._getFilterHeaders(),
                  selectedHeader : "None",
              });
          }
      }

     /**
      * formats an array of strings to be passed into FlatList's dat prop
      *
      * @param locationFilters (string[]) an array of locations
      * @param CategoryFilters (string[]) an array of categories
      * @param enabledDefault (bool) default value of the filters's enabled state
      *
      * @return (object) array of filters merged into and object
      */
     _formatData(locationFilters, categoryFilters, enabledDefault) {
         let data = {
             Location : [],
             Category : [],
         }

         //merge in locationFilters
         //TODO: adapt for n amount of filterHeaders
         for (filter of locationFilters) {
             data.Location.push({
                    title : filter,
                    enabled : enabledDefault,
                });
         }

         //merge in categoryFilters
         for (filter of locationFilters) {
             data.Category.push({
                    title : filter,
                    enabled : enabledDefault,
                });
         }

         return data;
     }

     /**
      * Gets the filter headers
      *
      * @return (string[]) filter headers
      */
     _getFilterHeaders() {
         /*
         * Currently hard coded because Location and Category are the only
         * filter headers
         */
         return ["Location, Category"];
     }

     /**
      * Gets the enabled filters of a header
      *
      * @param filterHeader header to get enabled filters of
      *
      * @return (string[]) enabled filters of a header
      */
     _getEnabledFilters(filterHeader) {
         let result = [];
         let filters = this.state.filters[filterHeader];
         for (f of filters) {
             if (f.enabled) {
                 result.push(f.title);
             }
         }
         return result;
     }

     /**
      * Gets all filters of a header
      *
      * @param filterHeader (string) header to get filters of
      *
      * @return (string[]) all filters of a header
      */
     _getFilters(filterHeader) {
         let result = [];
         let header = this.state.filters[filterHeader];
         for (f of header) {
             result.push(f.title);
         }
         return result;
     }

     /**
      * Toggles a filter's enabled value
      *
      * @param headerName (string) name of the filter's header
      * @param filterName (string) name of the filter
      *
      * TODO: consider exception where headerName or filterName does not exist
      */
     toggleFilter(filterHeader, filterTitle) {
        let newFilters = this.state.filters;
        for (f of newFilters[filterHeader]) {
            if (f.title === filterTitle) {
                f.enabled = !f.enabled;
            }
        }
        this.setState({
            filters : newFilters,
        });
     }
}

const styles = StyleSheet.create({
    flatList : {
        flexDirection : 'column',
        marginHorizontal : 40,
        marginTop : 0,
        borderWidth : 1,
        backgroundColor : '#FFFFFF',
    },
    seperator : {
        height : 1,
        width : '100%',
        backgroundColor : '#000000',
    }
});
