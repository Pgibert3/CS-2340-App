import * as types from '../actions/types';

const rootReducer = (state = {}, action) => {
    switch (action.type) {
        case types.UPDATE_PAGE:
            return Object.assign({}, {page: action.page});
    }
};

export default rootReducer;
