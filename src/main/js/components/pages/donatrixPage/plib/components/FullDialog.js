import React, {Component} from 'react';
import {
    View,
    StyleSheet,
} from 'react-native';

/**
 * A View wrapper that displays ontop of the UI, covering most of the screen
 *
 * NOTE: There is a bug that causes the dialog to only appear half way as the
 * keyboard fold down
 */
export default class FullDialog extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.dialog} >
                    {this.props.children}
                </View>
                <View style={styles.blur} />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container : {
        alignItems : 'center',
        justifyContent : 'center',
        zIndex : 100,
        position: 'absolute',
        width : "100%",
        height : "100%",
    },
    dialog : {
        backgroundColor : "#FFFFFF",
        borderWidth : 1,
        zIndex : 200,
        position: 'absolute',
        width : "85%",
        height : "85%",
    },
    blur : {
        ...this.dialog,
        backgroundColor : "#000000",
        opacity : .4,
        width : "100%",
        height : "100%"
    },

});
