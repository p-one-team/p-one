import axios from '../https'
import { Toast } from 'antd-mobile'
import store from '../store'


/*-----------------------------------------------------------------*/
/*User Reducer*/
/*-----------------------------------------------------------------*/
const initShopInfo = {
    shopInfos: {},
    shopItem: {},
    saleRecordInfo: {},
    buyRecordInfo: {},
    dealRecordInfo: {},
    myTransactionInfo: {},
    myTransactionHistory: []
}

const ShopReducer = (state = initShopInfo, action) => {

    switch (action.type) {
        case 'MALL_LIST':
            return Object.assign({}, state, {shopInfos: action.shopInfos})

        case 'PROD_DETAIL':
            return Object.assign({}, state, {shopItem: action.shopItem})

        case 'SALE_RECORD':
            return Object.assign({}, state, {saleRecordInfo: action.saleRecordInfo})

        case 'BUY_RECORD':
            return Object.assign({}, state, {buyRecordInfo: action.buyRecordInfo})

        case 'DEAL_RECORD':
            return Object.assign({}, state, {dealRecordInfo: action.dealRecordInfo})

        case 'MY_TRANSACTION':
            return Object.assign({}, state, {myTransactionInfo: action.myTransactionInfo})

        case 'MY_TRANSACTION_HISTORY':
            return Object.assign({}, state, {myTransactionHistory: action.myTransactionHistory})


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


const getSalePublishRecords = (data, callback) => {
    axios.post('/Game/GetPublishRecords', {
        MarketHashName: data.MarketHashName,
        PublishType: 1, //1出售 2求购
        PageIndex: data.PageIndex,
        PageSize: 10
    })
    .then(function (res) {
        if(res){
            store.dispatch({
                type: "SALE_RECORD",
                saleRecordInfo: res.Data
            })

            callback ? callback() : ""
        }
    })
    .catch(function (error) {
        Toast.fail('获取失败，请稍后重试！');
        console.log('error', error);
    });
}

const getBuyPublishRecords = (data, callback) => {
    axios.post('/Game/GetPublishRecords', {
        MarketHashName: data.MarketHashName,
        PublishType: 2, //1出售 2求购
        PageIndex: data.PageIndex,
        PageSize: 10
    })
    .then(function (res) {
        if(res){
            store.dispatch({
                type: "BUY_RECORD",
                buyRecordInfo: res.Data
            })

            callback ? callback() : ""
        }
    })
    .catch(function (error) {
        Toast.fail('获取失败，请稍后重试！');
        console.log('error', error);
    });
}

const getTransactionRecords = (data, callback) => {
    axios.post('/Game/GetTransactionRecords', {
        MarketHashName: data.MarketHashName,
        PageIndex: data.PageIndex,
        PageSize: 10
    })
    .then(function (res) {
        if(res){
            store.dispatch({
                type: "DEAL_RECORD",
                dealRecordInfo: res.Data
            })

            callback ? callback() : ""
        }
    })
    .catch(function (error) {
        Toast.fail('获取失败，请稍后重试！');
        console.log('error', error);
    });
}

//我的交易
const getMyTransaction = (data, callback) => {
    axios.post('/Game/MyTransaction', {

    })
    .then(function (res) {
        if(res){
            store.dispatch({
                type: "MY_TRANSACTION",
                myTransactionInfo: res.Data
            })

            callback ? callback() : ""
        }
    })
    .catch(function (error) {
        Toast.fail('获取失败，请稍后重试！');
        console.log('error', error);
    });
}

//我的交易历史查询
const queryMyTransHistory = (data, callback) => {
    axios.post('/Game/MyTransactionRecordsQuery', {
        TransactionStartDate: data.TransactionStartDate,
        TransactionEndDate: data.TransactionEndDate
    })
    .then(function (res) {
        if(res){
            store.dispatch({
                type: "MY_TRANSACTION_HISTORY",
                myTransactionHistory: res.Data.TransactonRecords
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
    getMallProdItem,
    getSalePublishRecords,
    getBuyPublishRecords,
    getTransactionRecords,
    getMyTransaction,
    queryMyTransHistory
}