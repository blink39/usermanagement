export const login = () => {
    return {
        type: 'SIGN_IN'
    }
}

export const logout = () => {
    return {
        type: 'SIGN_OUT'
    }
}

export const setUserType = (num) => {
    return {
        type: 'SIGN_IN',
        payload: num
    }
}