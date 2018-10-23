import React, {Component} from 'react';
import {
    View,
    TextInput,
    StyleSheet,
    TouchableHighlight,
    FlatList,
    Text,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'

/**
 * This is the Donatrix
 */
export default class DonatrixPage extends Component {
    static navigationOptions = {
        title: 'Donatrix',
    };

    constructor(props) {
        super(props);

        this.onFilterPress = this.onFilterPress.bind(this);

        this.state = {
            showingFilterDialog :  false,
        }
    }

    render() {
        let filterDialog = (
            <FilterDialog
                headerTitle="Filters"
                filterFieldTitleStyle={{fontSize : 22}}
                data={[{key : "Location"}, {key : "Category"}, {key : "Location"}, {key : "Category"}]}
            />
        );

        return (
            <View style={styles.container}>
                <View style={styles.toolBar}>
                    <IconButton
                        name="bars"
                        size={25}
                        style={styles.menuIcon}
                        onPress={this.onFilterPress}
                    />
                    <TextInput
                        placeholder="Search"
                        style={styles.searchTextInput}
                    />
                    <IconButton
                        name="filter"
                        size={25}
                        style={styles.filterIcon}
                        onPress={this.onFilterPress}
                    />
                </View>
                {(this.state.showingFilterDialog) ? filterDialog : <View />}
            </View>
        );
    }

    onFilterPress() {
        this.setState((prevState, props) => ({
            showingFilterDialog : !prevState.showingFilterDialog,
        }));
    }
}

const styles = StyleSheet.create({
    container : {
        flex : 1,
        flexDirection : 'column',
    },
    toolBar : {
        alignItems : 'center',
        flexDirection : 'row',
        borderWidth : .5,
        borderRadius : 10,
        backgroundColor : '#FFFFFF',
        marginHorizontal : 40,
        marginTop : 50,
        zIndex : 1
    },
    searchTextInput : {
        flexGrow : 2,
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

class IconButton extends Component {
    constructor(props) {
        super(props);

        this.styles = StyleSheet.create({
            iconButton : {
            },
        });

        this.onPress = this.onPress.bind(this);
    }

    render() {
        return (
            <TouchableHighlight onPress={this.onPress}>
                <Icon name={this.props.name} size={this.props.size} style={[this.styles.iconButton, this.props.style]}/>
            </TouchableHighlight>
        );
    }

    onPress() {
        this.props.onPress();
    }
}

class FilterDialog extends Component {
    constructor(props) {
        super(props);

        this.styles = StyleSheet.create({
            container : {
                marginHorizontal : 40,
                marginTop : -10,
                height : '20%',
                borderWidth : 1,
                backgroundColor : '#FFFFFF'
            },
            header : {
                paddingTop : 10,
            },
            headerTitle : {
                fontSize : 24,
            },
            filterField : {
                flexDirection : 'row',
            },
            filterFieldTitle : {

            },
            seperator : {
                height : 1,
                width : '100%',
                backgroundColor : '#000000',
            }
        });

        this.renderItem = this.renderItem.bind(this);
        this.renderSeperator = this.renderSeperator.bind(this);
    }

    render() {
        return(
            <View style={this.styles.container}>
                <View style={this.styles.header}>
                    <Text style={[this.styles.headerTitle, this.props.headerTitleStyle]}>{this.props.headerTitle}</Text>
                </View>
                <FlatList
                    data={this.props.data}
                    renderItem={({item}) => this.renderItem(item.key)}
                    ItemSeparatorComponent={this.renderSeperator}
                />
            </View>
        );
    }

    renderItem(key) {
        return (
            <View style={this.styles.filterField}>
                <Text style={[this.styles.filterFieldTitle, this.props.filterFieldTitleStyle]}>{key}</Text>
            </View>
        );
    }

    renderSeperator() {
        return (
            <View style={this.styles.seperator} />
        );
    }
}
