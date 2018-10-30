import React, {Component} from 'react';
import {
    View,
    StyleSheet,
} from 'react-native';
import {
    Toolbar,
} from './plib/PLib';
import BooleanTree from './plib/BooleanTree';


/**
 * Main page of the donatrix
 */
export default class DonatrixPage extends Component {
    static navigationOptions = {
        title: 'Donatrix',
    };

    constructor(props) {
        super(props);

        let data = {
                Location : ["Atlanta", "Raleigh", "Richmond"],
                Category : ["Toys", "Clothing", "Appliances"],
            }

        this.tree = new BooleanTree(this.formatData(data, true));

        //let filters = this.tree.getLeavesByBool("all", true);
        //console.log(filers);
    }

    render() {
        return (
            <View style={styles.container}>
                <Toolbar />
            </View>
        );
    }

    formatData(data, defaultBool) {
        //Hard coded for now
        function _createDefaultNode(id, value, defaultBool) {
            return {id : id, value : value, bool : defaultBool, children : []}
        }

        let locationChildren = data["Location"].map((f) => (
            _createDefaultNode(f.toLowerCase(), f, defaultBool)
        ));

        let categoryChildren = data["Category"].map((f) => (
            _createDefaultNode(f.toLowerCase(), f, defaultBool)
        ));

       return {id : "all", value: "Filters", bool : defaultBool, children : [
                       {id : "location", value : "Location", bool : defaultBool, children : locationChildren},
                       {id : "category", value : "Category", bool : defaultBool, children : categoryChildren}
               ]};
    }
}

const styles = StyleSheet.create({
    container : {
        justifyContent :  'center',
        marginTop : 30,
    },
});
