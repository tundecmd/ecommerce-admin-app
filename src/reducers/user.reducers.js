import { userConstants } from "../actions/constants";

const initState = {
    error: null,
    message: '',
    loading: false
}

export default (state = initState, action) => {
    switch (action.type) {
        case userConstants.USER_REGISTER_REQUEST:
            return state = {
                ...state,
                loading: true
            };

        case userConstants.USER_REGISTER_SUCCESS:
            return state = {
                ...state,
                loading: false,
                message: action.payload.message
            };
        
        case userConstants.USER_REGISTER_FAILURE:
            return state = {
                ...state,
                loading: false,
                error: action.payload.error
            }
        default:
            return state;
    }
}