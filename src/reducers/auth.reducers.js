import { authConstants } from '../actions/constants'

const initState = {
    name: 'Riz'
}

const authReducer = (state = initState, action) => {

    console.log('action', action)
    switch(action.type){
        case authConstants.LOGIN_REQUEST:
            return state = {
                ...state,
                ...action.payload
            }
            
    default:
        return state
        
    }
}

export default authReducer;