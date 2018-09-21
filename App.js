import React, {Component} from 'react';
import {Text} from 'react-native';
import WelcomePage from './components/Pages/WelcomePage';
import {buttonPressed} from './actions';

// const App = createStackNavigator({
//     Home: {screen: WelcomePage},
// });

export default class App extends Component<{}> {
    render() {
        return (
            <WelcomePage />
        );
    }
}

mapStateToProps = state => ({

})
