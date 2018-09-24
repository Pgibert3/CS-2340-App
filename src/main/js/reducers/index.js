import * as types from '../actions/types';

const rootReducer = (state = {}, action) => {
    if (action.type === types.SUBMIT_LOGIN_FORM) {
        let username = action.usernameInput;
        let password = action.passwordInput;
        let loggedIn = false;

        if (username === "user" && password === "password") {
            loggedIn = true;
        }

        return ({...state, loggedIn: loggedIn});
    } else {
        return state;
    }
}

export default rootReducer;
