import { connect } from 'react-redux'
import UserCenterComponent from './userCenter-component.js'
import { withRouter } from 'react-router-dom'
import { getMyTransaction } from '../../reducers/shop'


const mapDispatchToProps = (dispatch, props) => {
    return {
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
        }
    }
}


const mapStateToProps = (state) => {
    return {
        userInfos: state.UserReducer.userInfos
    }
}

const UserCenter = withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(UserCenterComponent))

export default UserCenter