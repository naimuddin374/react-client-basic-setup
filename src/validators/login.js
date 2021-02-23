const loginValidator = data => {
    let error = {}

    if (!data.phone_number) {
        error.phone_number = 'Phone number field is required!'
    }
    if (!data.password) {
        error.password = 'Password field is required!'
    }

    return {
        isValid: Object.keys(error).length === 0 ? true : false,
        error
    }
}
export default loginValidator