import * as types from '../actions/types';

/**
 * Highest level reducer
 *
 * @param state current store state
 * @param action action being passed up from component
 *
 * @return new store state. Note the use of '...' syntax to ensure immutability
 */
export const rootReducer = (state = {}, action) => {
    //Updates the current page being displayed via state.page
    var a = 1;
    switch (a) {
        case 1:
            return 0;
        default:
            return 1;
    }
    // switch (action.type) {
    //     case 'UPDATE_PAGE':
    //          return (...state, page: action.page);
    // }
};
