import { connect } from 'react-redux'
import UserCenterComponent from './userCenter-component.js'
import { withRouter } from 'react-router-dom'
import { getMyTransaction } from '../../reducers/shop'
import { signIn, refreshUserInfo, isShowGame } from '../../reducers/user'


const mapDispatchToProps = (dispatch, props) => {
    return {

        refreshUserInfo(data, callback) {
            refreshUserInfo(data, ()=>{
                callback ? callback() : null;
                isShowGame()
            })
        },

        goDetail() {
            props.history.push('/userDetail')
        },

        goInventory() {
            props.history.push('/inventory')
        },

        goMyForecast() {
            props.history.push('/myForecast')
        },

        goTradeHistory() {
            getMyTransaction({}, () => {
                props.history.push('/tradeHistory')
            })
        },

        goFeedback() {
            props.history.push('/feedback')
        },

        goExchangeCenter() {
            props.history.push('/exchangeCenter')
        },

        goHelpSuggest() {
            props.history.push('/helpSuggest')
        },

        signIn(data, callback) {
            signIn(data, callback)
        },

        goSteamSetting() {
            props.history.push('/steamSetting')
        },
    }
}


const mapStateToProps = (state) => {
    return {
        userInfos: state.UserReducer.userInfos,
    }
}

const UserCenter = withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(UserCenterComponent))

export default UserCenter