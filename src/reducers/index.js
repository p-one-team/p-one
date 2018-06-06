import { combineReducers } from 'redux'
import { MainInfoReducer } from './main'
import { UserReducer } from './user'
import { MatchReducer } from './match'
import { ShopReducer } from './shop'
import { RankReducer } from './rank'
import { InventoryReducer } from './inventory';


export default combineReducers({
    MainInfoReducer,
    UserReducer,
    MatchReducer,
    ShopReducer,
    RankReducer,
    InventoryReducer
})