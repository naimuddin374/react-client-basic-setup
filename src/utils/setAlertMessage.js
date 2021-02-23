import store from '../store'
import { SET_FLASH_MESSAGE } from '../store/actions/types'



const setAlertMessage = (message, type = 'success') => {
    store.dispatch({
        type: SET_FLASH_MESSAGE,
        payload: {
            message,
            type
        }
    })
}
export default setAlertMessage
