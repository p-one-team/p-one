import { connect } from 'react-redux'
import UserCenterComponent from './userCenter-component.js'
import { withRouter } from 'react-router-dom'


const mapDispatchToProps = (dispatch, props) => {
    return {
        initData() {
            //console.log("init data")
        },

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