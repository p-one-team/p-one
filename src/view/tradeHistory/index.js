import { connect } from 'react-redux'
import TradeHistoryComponent from './tradeHistory-component'
import { queryMyTransHistory } from '../../reducers/shop'

const mapDispatchToProps = (dispatch, props) => {
    return {
        initData() {
            //console.log('init index')
        },

        goListPage() {
            props.history.push('/list')
        },

        queryRecord(startDate,endDate){
            queryMyTransHistory({
                TransactionStartDate: startDate,
                TransactionEndDate: endDate
            })
        }
    }
}

const mapStateToProps = (state) => {
    return {
        myTransactionInfo: state.ShopReducer.myTransactionInfo,
        myTransactionHistory: state.ShopReducer.myTransactionHistory
    }
}


const TradeHistory = connect(
    mapStateToProps,
    mapDispatchToProps
)(TradeHistoryComponent)

export default TradeHistory;