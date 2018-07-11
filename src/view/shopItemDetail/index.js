import { connect } from 'react-redux'
import ShopItemDetailComponent from './item-component.js'
import { getSalePublishRecords, getBuyPublishRecords, getTransactionRecords, publishBuyOrSale } from '../../reducers/shop'

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

        publishBuySale(data){
            publishBuyOrSale(data)
        }
    }
}

const mapStateToProps = (state) => {
    return {
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