/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import {render} from 'react-dom';
import {provider} from 'react-redux';
import {createStore} from 'redux';

const initialState = {
    items: []
}

const reducer = function(state=initialState, action) {
    switch(action.type) {
        case 'ADD_ITEM':
            return (...state, items.concat([action.item]));

        default:
            return state;
    }
}

const store = createStore(reducer);

export default App extends React.Component<Props> {
    render() {

    }
}

function mapStateToProps(state) {
    return {
        items : state.items
    };
}

function mapDispatchToProps(dispatch) {

}
