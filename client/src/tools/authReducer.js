
const initialState = {
    isLoggedIn: false,
    user: null,
    role: null
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'LOGIN_SUCCESS':
            return {
                isLoggedIn: true,
                user: action.payload.user,
                role: action.payload.role
            };
            case 'LOGIN_FAILED':
            return {
                isLoggedIn: false,
                user: null,
                role: null
            };
            case 'LOGOUT':
            return {
                isLoggedIn: false,
                user: null,
                role: null
            }
        default:
            return state;
    }
};

export default authReducer;
