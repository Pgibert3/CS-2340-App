'use strict';

import React from 'react';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import {View, Text} from 'react-native';
import {connect} from 'react-redux';
import {createStackNavigator} from 'react-navigation';
import rootReducer from './src/reducers';
import WelcomePage from './src/components/pages/welcomePage/WelcomePage';
import LoginPage from './src/components/pages/loginPage/LoginPage';

const store = createStore(rootReducer);

const RootStack = createStackNavigator(
    {
        Welcome: WelcomePage,
        Login: LoginPage
    },
    {
        initialRouteName: 'Welcome',
        headerMode: 'none'
    }
);

const App = (page) => (
    <Provider store = {store}>
        <RootStack />
    </Provider>
);


export default App;
