import { combineReducers } from 'redux'
import { MainInfoReducer } from './main'
import { UserReducer } from './user'
import { MatchReducer } from './match'
import { ShopReducer } from './shop'



export default combineReducers({
    MainInfoReducer,
    UserReducer,
    MatchReducer,
    ShopReducer
})