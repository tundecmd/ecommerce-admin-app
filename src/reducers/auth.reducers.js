import { authConstants } from '../actions/constants'

const initState = {
    token: '',
    authenticate: false,
    authenticating: false,
    user: { 
        firstName: '',
        lastName: '',
        email: '',
        picture: ''
    }
}

const authReducer = (state = initState, action) => {

    console.log('action', action)
    switch(action.type){
        case authConstants.LOGIN_REQUEST:
            return state = {
                ...state,
                authenticating: true
            }
        case authConstants.LOGIN_SUCCESS:
            return state = {
                ...state,
                user: action.payload.user,
                token: action.payload.token,
                authenticate: true,
                authenticating: false
            }
        case authConstants.LOGOUT_REQUEST:
            return state = {
                ...initState
            }
        default:
            return state
        }
}

export default authReducer;