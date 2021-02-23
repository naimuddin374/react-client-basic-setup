import jwtDecode from 'jwt-decode';
import { setAuthToken } from '../actions/axios';
import { SET_USER } from '../actions/types';

const init = {
    isAuth: false,
    user: {},
}

const authReducer = (state = init, action) => {
    switch (action.type) {
        case SET_USER: {

            if (Object.keys(action.payload).length > 0) {
                setAuthToken(action.payload)
            }

            return {
                ...state,
                user: action.payload && Object.keys(action.payload).length ? jwtDecode(action.payload) : {},
                isAuth: action.payload && Object.keys(action.payload).length !== 0,
            }
        }
        default: return state
    }
}
export default authReducer
