const userTypeReducer = (state = 0, action) => {
    switch(action.type) {
        case 'SIGN_IN' :
            return action.payload
        default :
            return 0
    }
}

export default userTypeReducer