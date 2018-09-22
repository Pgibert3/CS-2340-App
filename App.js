import React, {Component} from 'react';
<<<<<<< HEAD
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
=======
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import rootReducer from './reducers'
import WelcomePage from './pages/WelcomePage/WelcomePage';
import LoginPage from './pages/WelcomePage/LoginPage';

const store = createStore(rootReducer);

export default class App extends Component {
    render() {
        return (
            <Provider store={store}>
                {
                    switch (page) {
                        case 'WELCOME_PAGE':
                            return(<WelcomePage />);
                        case 'LOGIN_PAGE':
                            return (<LoginPage />);
                        default:
                            return (<Text>Error 404</Text>);
                    }
                }
            </Provider>
>>>>>>> df247ace754fd684fa88e321f93cffbea346596f
        );
    }
}

<<<<<<< HEAD
mapStateToProps = state => ({

})
=======
const mapStateToProps = state => {
    return {
        page: state.page,
    };
};

export default connect(mapStateToProps)(App);
>>>>>>> df247ace754fd684fa88e321f93cffbea346596f
