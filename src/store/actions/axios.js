import axios from 'axios'
import setAlertMessage from '../../utils/setAlertMessage';


const instance = axios.create({
    baseURL: `${process.env.REACT_APP_BASE_URL}/api`,
    // baseURL: process.env.REACT_APP_BASE_URL,
    timeout: 1000 * 50,
    headers: {
        "Content-Type": "application/json"
    }
});


export const setAuthToken = token => {
    // instance.defaults.headers.common['Content-Type'] = 'multipart/form-data'
    instance.defaults.headers.common['Authorization'] = token || ''
}



// GET REQUEST TO GET DOCUMENTS FROM SERVER
export const getRequest = async (url) => {
    try {
        let response = await instance.get(url)
        return responseHandler(response)

    } catch (error) {
        return errorHandler(error)
    }
}


// POST REQUEST TO INSERT NEW DOCUMENT
export const postRequest = async (url, formData) => {
    try {
        let response = await instance.post(url, formData)
        return responseHandler(response)

    } catch (error) {
        return errorHandler(error)
    }
}


// PUT REQUEST TO UPDATE DOCUMENT
export const putRequest = async (url, formData) => {
    try {
        let response = await instance.put(url, formData)
        return responseHandler(response)

    } catch (error) {
        return errorHandler(error)
    }
}


// DELETE REQUEST TO REMOVE DOCUMENT
export const deleteRequest = async (url) => {
    try {
        let response = await instance.delete(url)
        return responseHandler(response)

    } catch (error) {
        return errorHandler(error)
    }
}



const responseHandler = responseObj => {
    let { data: { data, message } } = responseObj

    message && setAlertMessage(message, 'success')

    if (!data) return true

    return {
        isSuccess: true,
        message: message || null,
        data: data || null
    }
}


const errorHandler = resObj => {
    if (!resObj.response) {
        return {
            isSuccess: true,
            error: {},
            message: null
        }
    }

    const { response: { status, data } } = resObj

    if (!data) {
        return {
            isSuccess: false,
            error: {},
            message: null
        }
    }
    setAlertMessage(data.message, 'error')

    if (status === 406) {
        return {
            isSuccess: false,
            error: data.error,
            message: data.message
        }
    }

    return {
        isSuccess: false,
        error: {},
        message: data.message
    }

}



export default instance