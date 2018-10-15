import React, {Component} from 'react';
import {View} from 'react-native';
import Button from '../../Button';
//import RNAndroidBridge from '../../../utils/AndroidBridge';

export default class LocationsDashboardPage extends Component {

    static navigationOptions = {
        title: 'LocationsDashboard',
    };

    contructor(props) {
        super(props);

        this.state = {
            locations: [],
            locationDetails: '',
        };
    }

    render() {
        return(
            <View>
                {this.state.locations.map((location) => this.createLocationTab(location))}
            </View>
        );
    }

    /**
     * Handler for when a location is pressed
     *
     * @param locationID a unique String identifying the location pressed
     */
    onLocationPress(locationID) {
        if (loactionDetails === '') {
            this.setState((prevState, props) => {
                let details = prevState.locations.locationID.details;
                return({
                    locations: [],
                    locationDetails: details,
                });
            });
        else {
            this.setState({
                locations: this.fetchLocations(),
                locationDetails: '',
            });
        }

        }
    }

    /**
     * Fetch loations data from database and update state
     */
    fetchLocations() {
        location_data = []; //load with location data
        this.setState({locations: location_data});
    }

    /**
     * Convert location data into a Location Component
     *
     * @param locationData location data
     * @return Location component
     */
    generateLocationTab(locationData) {
        //TODO: Parse data and return Location component
        return <Location this.title/>
    }

    /**
     * Method for converting location details into a ...
     * String to be displayed
     *
     * @param locationData
     * @return a String containing the details of a location
     */
    generateLocationDetails(locationData) {
        //TODO: Parse data and return a String
        details = '';
        return details;
    }
}

/**
 * Location display tab
 *
 * @prop title -- name of location
 * @prop onPress -- action to take place on press in addition to default actions
 */
class LocationTab extends Component{
    constructor(props) {
        super(props)
    }

    render() {
        return(
            <Button title={this.props.title}, onPress={this.onPress} />
        );
    }

    /**
     * This wraps the onPress() passed via props. Designed this way ...
     * if we want to add additional functionality to the onPress() method
     */
    onPress() {
        this.props.onPress()
    }
}
