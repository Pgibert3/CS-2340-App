import React, {Component} from 'react';
import {
    View,
    Text,
    StyleSheet,
} from 'react-native';

/**
 * A component that wraps item data
 */
export default class ItemListItem extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>{this.props.title}</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container : {
        flexDirection : 'row',
    },
    title : {
        flexGrow : 1,
        fontSize : 26,
    },
});
