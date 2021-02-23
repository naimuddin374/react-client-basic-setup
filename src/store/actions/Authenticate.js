import { postRequest } from '.'
import store from '../index';
import { SET_USER } from './types';
import setAlertMessage from '../../utils/setAlertMessage';



class Authenticate {


    // LOGIN HANDLER
    async loginSubmitHandler(formData) {
        let response = await postRequest('/auth/login', formData)
        if (response.isSuccess) {
            localStorage.setItem('user_token', response.data)
            // SET STORE
            store.dispatch({
                type: SET_USER,
                payload: response.data
            })

        }
        return response
    }



    // REGISTER HANDLER
    async registerSubmitHandler(formData) {
        return await postRequest('/auth/register', formData)
    }


    // LOGOUT HANDLER
    async logoutHandler(history) {
        try {
            localStorage.clear();
            // localStorage.removeItem('user_token')

            setAlertMessage('Logout Successfully.', 'success')
            history.push('/')
            window.location.reload()

            return true

        } catch (error) {
            console.log(error)
            return false;
        }
    }



}

export default Authenticate