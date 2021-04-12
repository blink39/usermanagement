import loggedReducer from './isLogged'
import userTypeReducer from './userType'
import {combineReducers} from 'redux'
import {persistReducer} from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['isLogged', 'userType']
}

const allReducers = combineReducers({
    isLogged: loggedReducer,
    userType: userTypeReducer
})

export default persistReducer(persistConfig, allReducers)