import * as types from '../actions/types';

const rootReducer = (state = {}, action) => {
    switch (action.type) {
        case types.UPDATE_PAGE:
            return {...state, page: action.page};
        default:
            return state;
    }
}

export default rootReducer;
