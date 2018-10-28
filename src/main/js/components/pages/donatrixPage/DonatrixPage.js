import React, {Component} from 'react';
import {
    View,
} from 'react-native';
import {
    FilterList,
} from "./plib/PLib"


/**
 * Main page of the donatrix
 */
export default class DonatrixPage extends Component {
    static navigationOptions = {
        title: 'Donatrix',
    };

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View>
                <FilterList />
            </View>
        );
    }
}
