import * as types from './types';

export const submitLoginForm = (usernameInput, passwordInput) => ({
    type: types.SUBMIT_LOGIN_FORM,
    usernameInput: usernameInput,
    passwordInput: passwordInput
});
