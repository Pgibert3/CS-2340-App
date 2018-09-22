import React, {Component} from 'react';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import rootReducer from './reducers'
import App from  './App';

const store = createStore(rootReducer);

render(
    <Provider store={store}>
        <App />
    </Provider>
    document.getElementById('root');
)
