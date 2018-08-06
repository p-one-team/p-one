import { connect } from 'react-redux'
import UserDetailComponent from './userdetail-component'
// import { withRouter } from 'react-router-dom'
import { logoutAction } from "../../reducers/user"

const mapDispatchToProps = (dispatch, props) => {

    return {
        goSteamSetting() {
            props.history.push('/steamSetting')
        },

        goResetPsd() {
            dispatch({
                type: "USER_FORGET_PSD",
                isForgetPsd: false
            })
            props.history.push('/resetPassword')
        },

        logout() {
            logoutAction(function () {
                //返回到主菜单页，由主菜单进行登录判断
                props.history.goBack()
            })
        }
    }
}

const mapStateToProps = (state) => {
    return {
        userInfos: state.UserReducer.userInfos
    }
}

const UserDetail = connect(
    mapStateToProps,
    mapDispatchToProps
)(UserDetailComponent)

export default UserDetail;