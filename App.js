import React, {Component} from 'react';=
import WelcomePage from './pages/WelcomePage/WelcomePage';
import {createStore} from 'redux';
import rootReducer from 'rootReducer';
import Provider from "react-redux/es/components/Provider";
import connect from "react-redux/es/connect/connect";

const store = createStore(rootReducer);

export default class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <WelcomePage />
            </Provider>
        );
    }
}

const mapStateToProps = state => {
    return {
        page: state.page
    };
};

export default connect(mapStateToProps)(App);
