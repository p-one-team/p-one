import { connect } from 'react-redux'
import ShopItemDetailComponent from './item-component.js'
import { getSalePublishRecords, getBuyPublishRecords, getTransactionRecords, publishBuyOrSale } from '../../reducers/shop'

const mapDispatchToProps = (dispatch, props) => {
    return {
        goInventory() {
            props.history.push('/inventory')
        },

        getRecords(tab, name){
            if(tab == "1"){
                getSalePublishRecords({
                    MarketHashName: name,
                    PageIndex: 0
                })
            }else if(tab == "2"){
                getBuyPublishRecords({
                    MarketHashName: name,
                    PageIndex: 0
                })
            }else{
                getTransactionRecords({
                    MarketHashName: name,
                    PageIndex: 0
                })
            }
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