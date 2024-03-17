// actions/authActions.js
export const loginSuccess = (role, user) => ({
    type: 'LOGIN_SUCCESS',
    payload: {
        user: user,
        role: role
    }
});

export const loginFailed = () => ({
    type: 'LOGIN_FAILED'
});

export const logout = () => ({
    type: 'LOGOUT'
});

