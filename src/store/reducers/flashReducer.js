import shortid from 'shortid';
import { SET_FLASH_MESSAGE } from '../actions/types';


const init = {
    id: null,
    message: null,
    type: null
}

const flashReducer = (state = init, action) => {
    switch (action.type) {
        case SET_FLASH_MESSAGE: {

            return {
                ...state,
                id: shortid.generate(),
                message: action.payload.message,
                type: action.payload.type,
            }
        }
        default: return state
    }
}
export default flashReducer
