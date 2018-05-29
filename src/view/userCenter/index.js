import { connect } from 'react-redux'
import UserCenterComponent from './userCenter-component.js'
import { withRouter } from 'react-router-dom'


const mapDispatchToProps = (dispatch, props) => {
    return {
        goBack() {
            props.history.replace('/')
        },

        goDetail() {
            props.history.push('/userDetail')
        },
        goTradeHistory() {
            props.history.push('/tradeHistory')
        },
        goMessage() {
            props.history.push('/message')
        },
        goHelpSuggest() {
            props.history.push('/helpSuggest')
        }
    }
}

const UserCenter = withRouter(connect(
    null,
    mapDispatchToProps
)(UserCenterComponent))

export default UserCenter