import axios from '../https'
import { Toast } from 'antd-mobile'
import store from '../store'


/*-----------------------------------------------------------------*/
/*User Reducer*/
/*-----------------------------------------------------------------*/
const initShopInfo = {
    shopInfos: {},
    shopItem: {}
}

const ShopReducer = (state = initShopInfo, action) => {

    switch (action.type) {
        case 'MALL_LIST':
            return Object.assign({}, state, {shopInfos: action.shopInfos})

        case 'PROD_DETAIL':
            return Object.assign({}, state, {shopItem: action.shopItem})


        default:
            return state
    }
}


/*-----------------------------------------------------------------*/
/*User Action*/
/*-----------------------------------------------------------------*/

const getMallList = (data, callback) => {
    axios.post('/Game/GetMallList', {
        GameType: data.GameType,
        AttributeID: data.AttributeID,
        AttributeValue: data.AttributeValue,
        KeyWords: data.KeyWords,
        PageIndex: data.PageIndex,
        PageSize: data.PageSize
    })
    .then(function (res) {
        if(res){
            store.dispatch({
                type: "MALL_LIST",
                shopInfos: res.Data
            })

            callback ? callback() : ""
        }
    })
    .catch(function (error) {
        Toast.fail('获取失败，请稍后重试！');
        console.log('error', error);
    });
}

const getMallProdItem = (data, callback) => {
    axios.post('/Game/GetOrnamentInfo', {
        MarketHashName: data.MarketHashName,
    })
    .then(function (res) {
        if(res){
            store.dispatch({
                type: "PROD_DETAIL",
                shopItem: res.Data.Ornament
            })

            callback ? callback() : ""
        }
    })
    .catch(function (error) {
        Toast.fail('获取失败，请稍后重试！');
        console.log('error', error);
    });
}

export { 
    ShopReducer,
    getMallList,
    getMallProdItem
}