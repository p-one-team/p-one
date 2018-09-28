import { connect } from 'react-redux'
import ShopItemDetailComponent from './item-component.js'
import { getSalePublishRecords, getBuyPublishRecords, getTransactionRecords, mallTransaction } from '../../reducers/shop'
import { refreshUserInfo, isShowGame } from '../../reducers/user'

const mapDispatchToProps = (dispatch, props) => {
    return {
        goInventory() {
            props.history.push('/inventory')
        },

        getSaleRecords(data,callback){
            getSalePublishRecords(data,callback)
        },

        getBuyRecords(data,callback){
            getBuyPublishRecords(data,callback)
        },

        getDealRecords(data,callback){
            getTransactionRecords(data,callback)
        },

        mallTransaction(data,callback){
            mallTransaction(data,callback)
        },

        refreshUserInfo(data,callback) {
            refreshUserInfo(data,()=>{
                callback ? callback() : null;
                isShowGame()
            })
        },
    }
}

const mapStateToProps = (state) => {
    return {
        userInfos: state.UserReducer.userInfos,
        shopItem: state.ShopReducer.shopItem,
        saleRecordInfo: state.ShopReducer.saleRecordInfo,
        buyRecordInfo: state.ShopReducer.buyRecordInfo,
        dealRecordInfo: state.ShopReducer.dealRecordInfo
    }
}


const ShopItemDetail = connect(
    mapStateToProps,
    mapDispatchToProps
)(ShopItemDetailComponent)

export default ShopItemDetail;