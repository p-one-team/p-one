import { connect } from 'react-redux'
import UserCenterComponent from './userCenter-component.js'
import { withRouter } from 'react-router-dom'
import { getMyTransaction } from '../../reducers/shop'
import { signIn, refreshUserInfo } from '../../reducers/user'


const mapDispatchToProps = (dispatch, props) => {
    return {

        refreshUser() {
            refreshUserInfo()
        },

        goBack() {
            props.history.replace('/')
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
            getMyTransaction({},()=>{
                props.history.push('/tradeHistory')
            })
        },

        goFeedback() {
            props.history.push('/feedback')
        },

        goMessage() {
            props.history.push('/message')
        },
        
        goHelpSuggest() {
            props.history.push('/helpSuggest')
        },

        signIn(callback) {
            signIn(callback)
        }
    }
}


const mapStateToProps = (state) => {
    return {
        userInfos: state.UserReducer.userInfos,
        isSign: state.UserReducer.isSign
    }
}

const UserCenter = withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(UserCenterComponent))

export default UserCenter