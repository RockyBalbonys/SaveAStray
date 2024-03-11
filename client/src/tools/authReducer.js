
const initialState = {
    isLoggedIn: false,
    user: null,
    role: null
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'LOGIN_SUCCESS':
            return {
                ...state,
                isLoggedIn: true,
                user: action.payload.user,
                role: action.payload.role
            };
            case 'LOGIN_FAILED':
            return {
                ...state,
                isLoggedIn: false,
            };
        default:
            return state;
    }
};

export default authReducer;
