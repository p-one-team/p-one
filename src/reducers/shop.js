import axios from '../https'
import { Toast } from 'antd-mobile'
import store from '../store'


/*-----------------------------------------------------------------*/
/*User Reducer*/
/*-----------------------------------------------------------------*/
const initShopInfo = {
    paramAttributeId: 0,
    paramAttributeValue: "",
    paramKeywords: "",
    paramPageIndex: 1,
    publishAttributeId: 0,
    publishAttributeValue: "",
    publishKeywords: "",
    publishPageIndex: 1,
    shopInfos: {},
    shopItem: {},
    saleRecordInfo: {},
    buyRecordInfo: {},
    dealRecordInfo: {},
    myTransactionInfo: {},
    myHistoryStart: "",
    myHistoryEnd: "",
    myTransactionHistory: [],
    prodAttribute: {},
    selectEnter: ""
}

const ShopReducer = (state = initShopInfo, action) => {

    switch (action.type) {
        case "SELECT_ENTER":
            return Object.assign({}, state, { selectEnter: action.selectEnter })

        case 'MALL_LIST_PARAM':
            return Object.assign({}, state, { paramAttributeId: action.paramAttributeId, paramAttributeValue: action.paramAttributeValue, paramKeywords: action.paramKeywords, paramPageIndex: action.paramPageIndex })

        case 'MALL_LIST_PUBLISH':
            return Object.assign({}, state, { publishAttributeId: action.publishAttributeId, publishAttributeValue: action.publishAttributeValue, publishKeywords: action.publishKeywords, publishPageIndex: action.publishPageIndex })

        case 'MALL_LIST':
            return Object.assign({}, state, { shopInfos: action.shopInfos })

        case 'PROD_ATTRIBUTES':
            return Object.assign({}, state, { prodAttribute: action.prodAttribute })

        case 'PROD_DETAIL':
            return Object.assign({}, state, { shopItem: action.shopItem })

        case 'SALE_RECORD':
            return Object.assign({}, state, { saleRecordInfo: action.saleRecordInfo })

        case 'BUY_RECORD':
            return Object.assign({}, state, { buyRecordInfo: action.buyRecordInfo })

        case 'DEAL_RECORD':
            return Object.assign({}, state, { dealRecordInfo: action.dealRecordInfo })

        case 'MY_TRANSACTION':
            return Object.assign({}, state, { myTransactionInfo: action.myTransactionInfo })

        case 'MY_TRANSACTION_HISTORY':
            return Object.assign({}, state, { myHistoryStart: action.myHistoryStart, myHistoryEnd: action.myHistoryEnd, myTransactionHistory: action.myTransactionHistory })


        default:
            return state
    }
}


/*-----------------------------------------------------------------*/
/*User Action*/
/*-----------------------------------------------------------------*/

//商城
const getMallList = (data, callback) => {
    axios.post('/Game/GetMallList', {
            GameType: data.GameType,
            AttributeID: data.AttributeID,
            AttributeValue: data.AttributeValue,
            KeyWords: data.KeyWords,
            PageIndex: data.PageIndex,
            PageSize: data.PageSize
        })
        .then(function(res) {
            if (res) {
                store.dispatch({
                    type: "MALL_LIST",
                    shopInfos: res.Data
                })

                callback ? callback() : ""
            }
        })
        .catch(function(error) {
            Toast.fail('获取失败，请稍后重试！');
            console.log('error', error);
        });
}

//商品属性筛选
const getOrnamentAttributes = (data, callback) => {
    axios.post('/Game/GetOrnamentAttributes', {

        })
        .then(function(res) {
            if (res) {
                store.dispatch({
                    type: "PROD_ATTRIBUTES",
                    prodAttribute: res.Data
                })

                callback ? callback() : ""
            }
        })
        .catch(function(error) {
            Toast.fail('获取失败，请稍后重试！');
            console.log('error', error);
        });
}

//单件饰品详情
const getMallProdItem = (data, callback) => {
    axios.post('/Game/GetOrnamentInfo', {
            MarketHashName: data.MarketHashName,
        })
        .then(function(res) {
            if (res) {
                store.dispatch({
                    type: "PROD_DETAIL",
                    shopItem: res.Data.Ornament
                })

                callback ? callback() : ""
            }
        })
        .catch(function(error) {
            Toast.fail('获取失败，请稍后重试！');
            console.log('error', error);
        });
}

//出售列表
const getSalePublishRecords = (data, callback) => {
    axios.post('/Game/GetPublishRecords', {
            MarketHashName: data.MarketHashName,
            PublishType: 1, //1出售 2求购
            PageIndex: data.PageIndex,
            PageSize: 20
        })
        .then(function(res) {
            if (res) {
                store.dispatch({
                    type: "SALE_RECORD",
                    saleRecordInfo: res.Data
                })

                callback ? callback() : ""
            }
        })
        .catch(function(error) {
            Toast.fail('获取失败，请稍后重试！');
            console.log('error', error);
        });
}

//求购列表
const getBuyPublishRecords = (data, callback) => {
    axios.post('/Game/GetPublishRecords', {
            MarketHashName: data.MarketHashName,
            PublishType: 2, //1出售 2求购
            PageIndex: data.PageIndex,
            PageSize: 20
        })
        .then(function(res) {
            if (res) {
                store.dispatch({
                    type: "BUY_RECORD",
                    buyRecordInfo: res.Data
                })

                callback ? callback() : ""
            }
        })
        .catch(function(error) {
            Toast.fail('获取失败，请稍后重试！');
            console.log('error', error);
        });
}

//交易记录列表
const getTransactionRecords = (data, callback) => {
    axios.post('/Game/GetTransactionRecords', {
            MarketHashName: data.MarketHashName,
            PageIndex: data.PageIndex,
            PageSize: 20
        })
        .then(function(res) {
            if (res) {
                store.dispatch({
                    type: "DEAL_RECORD",
                    dealRecordInfo: res.Data
                })

                callback ? callback() : ""
            }
        })
        .catch(function(error) {
            Toast.fail('获取失败，请稍后重试！');
            console.log('error', error);
        });
}

//我的交易
const getMyTransaction = (data, callback) => {
    axios.post('/Game/MyTransaction', {

        })
        .then(function(res) {
            if (res) {
                store.dispatch({
                    type: "MY_TRANSACTION",
                    myTransactionInfo: res.Data
                })

                callback ? callback() : ""
            }
        })
        .catch(function(error) {
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
        .then(function(res) {
            if (res) {
                store.dispatch({
                    type: "MY_TRANSACTION_HISTORY",
                    myHistoryStart: data.TransactionStartDate,
                    myHistoryEnd: data.TransactionEndDate,
                    myTransactionHistory: res.Data.TransactonRecords
                })

                callback ? callback() : ""
            }
        })
        .catch(function(error) {
            Toast.fail('获取失败，请稍后重试！');
            console.log('error', error);
        });
}

//发布出售、求购
const publishBuyOrSale = (data, callback) => {
    axios.post('/Game/MallPublish', {
            PublishType: data.PublishType,
            MarketHashName: data.MarketHashName,
            OrnamentPrice: data.OrnamentPrice,
            OrnamentCount: data.OrnamentCount
        })
        .then(function(res) {
            if (res) {
                if (data.PublishType == 1) {
                    Toast.success("发布出售成功！")
                } else {
                    Toast.success("发布求购成功！")
                }

                callback ? callback() : ""
            }
        })
        .catch(function(error) {
            Toast.fail('请求失败，请稍后重试！');
            console.log('error', error);
        });
}

//商城交易
const mallTransaction = (data, callback) => {
    axios.post('/Game/MallTransaction', {
            PublishRecordID: data.PublishRecordID,
            TransactionCount: data.TransactionCount
        })
        .then(function(res) {
            if (res) {
                Toast.success(res.Msg)
                callback ? callback() : ""
            }
        })
        .catch(function(error) {
            Toast.fail('请求失败，请稍后重试！');
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
    queryMyTransHistory,
    getOrnamentAttributes,
    publishBuyOrSale,
    mallTransaction
}