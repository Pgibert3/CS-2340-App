import React, {Component} from 'react';
import {Alert, ScrollView, View} from 'react-native';
import Button from '../../Button';
import RNAndroidBridge from '../../../utils/AndroidBridge';
import Text from '../../Text';
import FormTextInput from "../../FormTextInput";

export default class LocationsDashboardPage extends Component {

    static navigationOptions = {
        title: 'LocationsDashboard',
    };

    /**
     * Convert location data into a Location Component
     *
     * @param locations location data
     * @return Array components
     */
    generateLocationTabs(locations) {
        const tabs = [];
        const createTab = index => {
            return <LocationTab key={Number.parseInt(index)} title={locations[index].name} onPress={() => this.onLocationPress(index)} />;
        };
        for (let i = 0; i < locations.length; i += 1) {
            tabs.push(createTab(i));
        }
        return tabs;
    }

    static generateLocationDetails(location) {
        const details = [];
        const createDetail = prop => {
            return (
              <Text key={prop} text={location[prop]} />
            );
        };
        for (const prop in location) {
            if (location.hasOwnProperty(prop)) {
                details.push(createDetail(prop));
            }
        }

        return details;
    }

    constructor(props) {
        super(props);

        this.state = {
            locations: {},
            locationDetails: [],
            locationTabs: [],
            currentLocation: {},
            allItems: [],
            locationItems: [],
            viewDetails: false,
            viewItems: false,
            addItem: false,
            sdesc: '',
            fdesc: '',
            value: 0,
            cat: ''
        };

        this.generateLocationTabs = this.generateLocationTabs.bind(this);
        this.onLocationPress = this.onLocationPress.bind(this);
        this.showItems = this.showItems.bind(this);
        this.temp = this.temp.bind(this);
        this.onFieldUpdate = this.onFieldUpdate.bind(this);
    }

    componentDidMount() {
        RNAndroidBridge.getLocations()
            .then(arr => {
                const tabs = this.generateLocationTabs(arr);
                this.setState({locations: arr, locationTabs: tabs});
            })
            .catch(err => {
                Alert.alert("Error", JSON.stringify(err));
            });

        RNAndroidBridge.getItems()
            .then(arr => {
                this.setState({allItems: arr});
            })
            .catch(err => {
                Alert.alert("Error", JSON.stringify(err));
            })
    }

    onLocationPress(index) {
        const location = this.state.locations[index];
        const locationDetails = LocationsDashboardPage.generateLocationDetails(location);
        this.setState({viewDetails: true, locationDetails, currentLocation: location});
    }

    static generateItems(items) {
        const texts = [];
        const createText = index => {
            return <Text key={index} text={items[index].sDescription} />;
        };
        for (let i = 0; i < items.length; i += 1) {
            texts.push(createText(i));
        }
        return texts;
    }

    showItems() {
        const {allItems, currentLocation} = this.state;
        let items = [];
        for (let i = 0; i < allItems.length; i += 1) {
            if (allItems[i].location === currentLocation.name) {
                items.push(allItems[i]);
            }
        }
        items = LocationsDashboardPage.generateItems(items);
        this.setState({viewDetails: false, viewItems: true, locationItems: items});
    }

    temp() {
        const {allItems, sdesc, fdesc, value, cat, currentLocation} = this.state;
        allItems.push({location: currentLocation.name, sDescription: sdesc, fdesc, value, cat});
        this.setState({addItem: false, allItems});
        this.showItems();
    }

    onFieldUpdate(t, field) {
        const state = {};
        state[field] = t;
        this.setState(state);
    }

    render() {
        const {viewDetails, locationDetails, locationTabs, viewItems, locationItems, addItem, sdesc, fdesc, value, cat} = this.state;
        return(
            <View>
                {viewDetails ? (
                    <View>
                        {locationDetails}
                        <Button title="View Items" onPress={this.showItems} />
                        <Button title="Back" onPress={() => this.setState({viewDetails: false})} />
                    </View>
                ) : viewItems ? (
                    addItem ? (
                        <View>
                            <FormTextInput
                                title="Short Description"
                                onChangeText={(t) => this.onFieldUpdate(t, "sdesc")}
                            />
                            <FormTextInput
                                title="Full Description"
                                onChangeText={(t) => this.onFieldUpdate(t, "fdesc")}
                            />
                            <FormTextInput
                                title="Value"
                                onChangeText={(t) => this.onFieldUpdate(Number.parseInt(t, 10), "value")}
                            />
                            <FormTextInput
                                title="Category"
                                onChangeText={(t) => this.onFieldUpdate(t, "cat")}
                            />
                            <Button title="Add" onPress={this.temp} />
                        </View>
                        ) : (
                        <View>
                            <Button title="Add Item" onPress={() => this.setState({addItem: true})} />
                            <Button title="Back" onPress={() => this.setState({viewItems: false, viewDetails: true})} />
                            {locationItems}
                        </View>)
                    ) : (
                    <View>
                        <Button title="Back" onPress={() => this.props.navigation.navigate('Donatrix')} />
                        {locationTabs}
                    </View>
                )}
            </View>
        );
    }
}

/**
 * Location display tab
 *
 * @prop title -- name of location
 * @prop onPress -- action to take place on press in addition to default actions
 */
class LocationTab extends Component {
    constructor(props) {
        super(props);

        this.onPress = this.onPress.bind(this);
    }

    /**
     * This wraps the onPress() passed via props. Designed this way ...
     * if we want to add additional functionality to the onPress() method
     */
    onPress() {
        this.props.onPress();
    }

    render() {
        return(
            <Button title={this.props.title} onPress={this.onPress} />
        );
    }
}
