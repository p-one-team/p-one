import { combineReducers } from 'redux'
import { MainInfoReducer } from './main'
import { UserReducer } from './user'
import { MatchReducer } from './match'



export default combineReducers({
    MainInfoReducer,
    UserReducer,
    MatchReducer
})