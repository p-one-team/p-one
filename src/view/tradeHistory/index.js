import { connect } from 'react-redux'
import TradeHistoryComponent from './tradeHistory-component'
// import { queryMyTransHistory } from '../../reducers/shop'
import { getMyPublishRecords,cancelOrnamentSale } from '../../reducers/user'

const mapDispatchToProps = (dispatch, props) => {
    return {

        goListPage() {
            props.history.push('/list')
        },

        cancelOrnamentSale(id,callback){
            cancelOrnamentSale({
                PublishRecordID: id
            },callback)
        },

        getMyPublishRecords(type,callback){
            getMyPublishRecords({
                PublishType: type,
            },callback)
        }
    }
}

const mapStateToProps = (state) => {
    return {
        myTransactionInfo: state.ShopReducer.myTransactionInfo,
        myHistoryStart: state.ShopReducer.myHistoryStart,
        myHistoryEnd: state.ShopReducer.myHistoryEnd,
        myTransactionHistory: state.ShopReducer.myTransactionHistory,
        myPublishRecordsList: state.UserReducer.myPublishRecordsList,
        recordPublishType: state.UserReducer.recordPublishType,
    }
}


const TradeHistory = connect(
    mapStateToProps,
    mapDispatchToProps
)(TradeHistoryComponent)

export default TradeHistory;