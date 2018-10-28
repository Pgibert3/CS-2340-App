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
        title: 'DonatrixDEP',
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
