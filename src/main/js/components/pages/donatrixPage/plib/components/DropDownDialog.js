import React, {Component} from 'react';
import {
    View,
    StyleSheet,
} from 'react-native';

/**
 * A View wrapper that displays ontop of the UI and drops down
 */
export default class DropDownDialog extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isVisible : this.props.isVisible,
        }
    }

    render() {
        if (this.state.isVisible) {
            return (
                <View style={styles.container}>
                    {this.props.children}
                </View>
            );
        } else {
            return <View />;
        }
    }
}

const styles = StyleSheet.create({
    /* Styling for the body of the dialog */
    container : {
        marginHorizontal : 40,
        marginTop : 0,
        borderWidth : 1,
        backgroundColor : '#FFFFFF',
        height : 100,
    },
});
