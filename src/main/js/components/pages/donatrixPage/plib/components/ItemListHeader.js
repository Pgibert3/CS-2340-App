import React, {Component} from 'react';
import {
    View,
    Text,
    StyleSheet,
    IconButton,
} from 'react-native';

/**
 * A header for an item list
 */
export default class ItemListItem extends Component {
    constructor(props) {
        super(props);

        this.onBackArrowPress = this.onBackArrowPress.bind(this);
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>{this.props.title}</Text>
            </View>
        );
    }

    onBackArrowPress() {
        this.props.onBackArrowPress();
    }
}

const styles = StyleSheet.create({
    container : {
        flexDirection : 'row',
    },
    title : {
    },
});
