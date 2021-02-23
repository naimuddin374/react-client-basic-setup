import { combineReducers } from 'redux';
import authReducer from './authReducer'
import flashReducer from './flashReducer'

const rootReducer = combineReducers({
    auth: authReducer,
    flash: flashReducer,
})
export default rootReducer