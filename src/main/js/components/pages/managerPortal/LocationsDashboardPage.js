import React, {Component} from 'react';
import {Alert, Picker, ScrollView, View} from 'react-native';
import Button from '../../Button';
import RNAndroidBridge from '../../../utils/AndroidBridge';
import Text from '../../Text';
import FormTextInput from "../../FormTextInput";
import UserType from '../../../utils/UserType';
import ItemCategory from '../../../utils/ItemCategory';

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
            cat: ItemCategory.CLOTHING,
            user: {}
        };

        this.generateLocationTabs = this.generateLocationTabs.bind(this);
        this.onLocationPress = this.onLocationPress.bind(this);
        this.showItems = this.showItems.bind(this);
        this.addItem = this.addItem.bind(this);
        this.onFieldUpdate = this.onFieldUpdate.bind(this);
        this.getItems = this.getItems.bind(this);
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

        this.getItems();

        RNAndroidBridge.getCurrentUser()
            .then(user => {
                this.setState({user});
            })
            .catch(err => {
                Alert.alert("Error", JSON.stringify(err));
            });
    }

    getItems() {
        return new Promise((resolve, reject) => {
            RNAndroidBridge.getItems()
                .then(arr => {
                    this.setState({allItems: arr});
                    resolve();
                })
                .catch(err => {
                    Alert.alert("Error", JSON.stringify(err));
                    reject(err);
                });
        });
    }

    onLocationPress(index) {
        const location = this.state.locations[index];
        const locationDetails = LocationsDashboardPage.generateLocationDetails(location);
        this.setState({viewDetails: true, locationDetails, currentLocation: location});
    }

    static generateItems(items) {
        const texts = [];
        const alertDetails = index => {
            const item = items[index];
            Alert.alert(item.sDescription, `${item.fDescription}\n${item.category}\n$${Number(item.value).toFixed(2)}`, [{text: 'OK'}]);
        };
        const createText = index => {
            return <Button key={index} title={items[index].sDescription} onPress={() => alertDetails(index)} />;
        };
        for (let i = 0; i < items.length; i += 1) {
            texts.push(createText(i));
        }
        return texts;
    }

    showItems() {
        this.getItems()
            .then(() => {
                const {allItems, currentLocation} = this.state;
                let items = [];
                for (let i = 0; i < allItems.length; i += 1) {
                    if (allItems[i].location === currentLocation.name) {
                        items.push(allItems[i]);
                    }
                }
                items = LocationsDashboardPage.generateItems(items);
                this.setState({viewDetails: false, viewItems: true, locationItems: items});
            });
    }

    addItem() {
        const {sdesc, fdesc, value, cat} = this.state;
        RNAndroidBridge.addItem(sdesc, fdesc, value, cat)
            .then(() => {
                this.setState({addItem: false});
                this.showItems();
            })
            .catch(err => {
                Alert.alert("Error", JSON.stringify(err));
                reject(err);
            });
    }

    onFieldUpdate(t, field) {
        const state = {};
        state[field] = t;
        this.setState(state);
    }

    render() {
        const {viewDetails, locationDetails, locationTabs, viewItems, locationItems, addItem, user, currentLocation} = this.state;
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
                            <Picker
                                selectedValue={this.state.cat}
                                style={{ height: 50, width: 200 }}
                                onValueChange={cat => this.setState({cat})}>
                                <Picker.Item label="Clothing" value={ItemCategory.CLOTHING} />
                                <Picker.Item label="Hat" value={ItemCategory.HAT} />
                                <Picker.Item label="Kitchen" value={ItemCategory.KITCHEN} />
                                <Picker.Item label="Electronics" value={ItemCategory.ELECTRONICS} />
                                <Picker.Item label="Household" value={ItemCategory.HOUSEHOLD} />
                                <Picker.Item label="Other" value={ItemCategory.OTHER} />
                            </Picker>
                            <Button title="Add" onPress={this.addItem} />
                            <Button title="Cancel" onPress={() => this.setState({addItem: false})} />
                        </View>
                        ) : (
                        <View>
                            {user && user.userType === UserType.LOCATION_EMPLOYEE && user.locationKey === currentLocation.key ? (
                                <Button title="Add Item" onPress={() => this.setState({addItem: true})} />
                            ) : <Text/>}
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
