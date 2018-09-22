import * as types from '../actions/types';

/**
 * Highest level reducer
 *
 * @param state current store state
 * @param action action being passed up from component
 *
 * @return new store state. Note the use of '...' syntax to ensure immutability
 */
const rootReducer = (state = {}, action) => {

    //Updates the current page being displayed via state.page
    switch (action.type) {
        case types.UPDATE_PAGE:
            return (...state, page: action.page);
    }
};

export default rootReducer;
