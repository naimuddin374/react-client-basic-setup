import store from '../store'

export const auth = () => {
    let { auth: { loggedIn, user } } = store.getState()
    if (!loggedIn)
        return false

    return user
}

export const decimalNumber = (num, format = 2) => {
    if (!num)
        return 0

    return Number.parseFloat(num).toFixed(format);
}