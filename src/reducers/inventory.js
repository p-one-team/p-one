import axios from '../https'
import { Toast } from 'antd-mobile'
import store from '../store'


/*-----------------------------------------------------------------*/
/*User Reducer*/
/*-----------------------------------------------------------------*/
const initInventoryInfo = {
    dotaInventory: {},
    csgoInventory: {},
    pubgInventory: {}
}

const InventoryReducer = (state = initInventoryInfo, action) => {

    switch (action.type) {
        case 'DOTA_INVENTORY':
            return Object.assign({}, state, {dotaInventory: action.dotaInventory})

        case 'CSGO_INVENTORY':
            return Object.assign({}, state, {csgoInventory: action.csgoInventory})
            
        case 'PUBG_INVENTORY':
            return Object.assign({}, state, {pubgInventory: action.pubgInventory})

        default:
            return state
    }
}


/*-----------------------------------------------------------------*/
/*User Action*/
/*-----------------------------------------------------------------*/

//我的库存
const getMyInventory = (data, callback) => {
    axios.post('/Game/MyStockResponse', {
        GameType: data.GameType,
        DateSort: data.DateSort,
        PriceSort: data.PriceSort,
        QualitySort: data.QualitySort,
        RaritySort: data.RaritySort
    })
    .then(function (res) {
        if(res){

            if(data.GameType=="570"){
                store.dispatch({
                    type: "DOTA_INVENTORY",
                    dotaInventory: res.Data
                })
            }else if(data.GameType=="730"){
                store.dispatch({
                    type: "CSGO_INVENTORY",
                    csgoInventory: res.Data
                })
            }else if(data.GameType=="578080"){
                store.dispatch({
                    type: "PUBG_INVENTORY",
                    pubgInventory: res.Data
                })
            }

            callback ? callback() : ""
        }
    })
    .catch(function (error) {
        Toast.fail('获取失败，请稍后重试！');
        console.log('error', error);
    });
}

export { 
    InventoryReducer,
    getMyInventory,
}