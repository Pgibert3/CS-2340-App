import React, {Component} from 'react';
import {Alert, View} from 'react-native';
import Button from '../../Button';
import RNAndroidBridge from '../../../utils/AndroidBridge';
import Text from '../../Text';

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
        alert(location.name);
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
            viewDetails: false
        };

        this.generateLocationTabs = this.generateLocationTabs.bind(this);
        this.onLocationPress = this.onLocationPress.bind(this);
    }

    componentDidMount() {
        RNAndroidBridge.getLocations()
            .then(arr => {
                const tabs = this.generateLocationTabs(arr);
                this.setState({locations: arr, locationTabs: tabs});
            })
            .catch(err => {
                Alert.alert("Error", JSON.stringify(err));
            })
    }

    onLocationPress(index) {
        const location = this.state.locations[index];
        const locationDetails = LocationsDashboardPage.generateLocationDetails(location);
        this.setState({viewDetails: true, locationDetails});
    }

    render() {
        const {viewDetails, locationDetails, locationTabs} = this.state;
        return(
            <View>
                {viewDetails ? (
                    <View>
                        {locationDetails}
                        <Button title="Back" onPress={() => this.setState({viewDetails: false})} />
                    </View>
                ) : locationTabs}
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
