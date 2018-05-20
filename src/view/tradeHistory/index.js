import { connect } from 'react-redux'
import TradeHistoryComponent from './tradeHistory-component'
// import { withRouter } from 'react-router-dom'


const mapDispatchToProps = (dispatch, props) => {

    console.log(props)
    return {

        initData() {
            console.log('init index')
        },
        goListPage() {
            props.history.push('/list')
        }
    }
}

const mapStateToProps = (state) => {
    return {
        ...state.HomeReducer
    }
}


const TradeHistory = connect(
    mapStateToProps,
    mapDispatchToProps
)(TradeHistoryComponent)

export default TradeHistory;