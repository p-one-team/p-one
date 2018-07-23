import axios from '../https'
import { Toast } from 'antd-mobile'
import store from '../store'


/*-----------------------------------------------------------------*/
/*User Reducer*/
/*-----------------------------------------------------------------*/
const initInventoryInfo = {
    dotaInventory: {},
    csgoInventory: {},
    pubgInventory: {},
    dotaSteamInventory: [],
    dotaChosenInventory: [],
    dotaChosenVipInventory: [],
    dotaChosenForecastInventory: []
}

const InventoryReducer = (state = initInventoryInfo, action) => {

    switch (action.type) {
        case 'DOTA_INVENTORY':
            return Object.assign({}, state, { dotaInventory: action.dotaInventory })

        case 'CSGO_INVENTORY':
            return Object.assign({}, state, { csgoInventory: action.csgoInventory })

        case 'PUBG_INVENTORY':
            return Object.assign({}, state, { pubgInventory: action.pubgInventory })

        case 'DOTA_STEAM_INVENTORY':
            return Object.assign({}, state, { dotaSteamInventory: action.dotaSteamInventory })

        case 'DOTA_CHOSEN_INVENTORY':
            return Object.assign({}, state, { dotaChosenInventory: action.dotaChosenInventory })

        case 'DOTA_CHOSEN_VIP_INVENTORY':
            return Object.assign({}, state, { dotaChosenVipInventory: action.dotaChosenVipInventory })

        case 'DOTA_CHOSEN_FORECAST_INVENTORY':
            return Object.assign({}, state, { dotaChosenForecastInventory: action.dotaChosenForecastInventory })

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
            RaritySort: data.RaritySort,
            StockType: data.StockType
        })
        .then(function(res) {
            if (res) {

                if (data.GameType == "570") {
                    store.dispatch({
                        type: "DOTA_INVENTORY",
                        dotaInventory: res.Data
                    })
                } else if (data.GameType == "730") {
                    store.dispatch({
                        type: "CSGO_INVENTORY",
                        csgoInventory: res.Data
                    })
                } else if (data.GameType == "lol") {
                    store.dispatch({
                        type: "PUBG_INVENTORY",
                        pubgInventory: res.Data
                    })
                }

                callback ? callback() : ""
            }
        })
        .catch(function(error) {
            Toast.fail('获取失败，请稍后重试！');
            console.log('error', error);
        });
}

//查询用户steam库存
const getMySteamInventory = (data, callback) => {
    axios.post('/Ornament/GetUserInventory', {
            GameCode: data.GameCode
        })
        .then(function(res) {
            if (res) {

                if (data.GameCode == "570") {
                    store.dispatch({
                        type: "DOTA_STEAM_INVENTORY",
                        dotaSteamInventory: res.Data
                    })
                }

                callback ? callback() : ""
            }
        })
        .catch(function(error) {
            Toast.fail('获取失败，请稍后重试！');
            console.log('error', error);
        });
}

//添加饰品到VIP库存
const addToMyInventory = (data, callback) => {
    axios.post('/Offer/AddToUser', {
            AppId: data.AppId,
            Items: data.Items
        })
        .then(function(res) {
            if (res) {
                Toast.success(res.Msg)
                callback ? callback() : ""
            }
        })
        .catch(function(error) {
            Toast.fail('添加失败，请稍后重试！');
            console.log('error', error);
        });
}

//从VIP库存提取到STEAM
const addToSteamInventory = (data, callback) => {
    axios.post('/Offer/AddToMine', {
            AppId: data.AppId,
            Items: data.Items
        })
        .then(function(res) {
            if (res) {
                Toast.success(res.Msg)
                callback ? callback(res) : ""
            }
        })
        .catch(function(error) {
            Toast.fail('添加失败，请稍后重试！');
            console.log('error', error);
        });
}

export {
    InventoryReducer,
    getMyInventory,
    getMySteamInventory,
    addToMyInventory,
    addToSteamInventory
}