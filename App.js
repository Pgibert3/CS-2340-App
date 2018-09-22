import React, {Component} from 'react';
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
        );
    }
}

const mapStateToProps = state => {
    return {
        page: state.page,
    };
};

export default connect(mapStateToProps)(App);
