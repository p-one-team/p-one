import { combineReducers } from 'redux'
import { UserReducer } from './user-info'
import { ListReducer } from './data-list'
import { MainInfoReducer } from './main'

export default combineReducers({
    UserReducer,
    MainInfoReducer,
    ListReducer
})