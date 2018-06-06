import { connect } from 'react-redux'
import UserDetailComponent from './userdetail-component'
// import { withRouter } from 'react-router-dom'
import { logoutAction } from "../../reducers/user"

const mapDispatchToProps = (dispatch, props) => {

    return {

        goResetPsd(){
			dispatch({
				type: "USER_FORGET_PSD",
				isForgetPsd: false
			})
			props.history.push('/resetPassword')
		},

        logout(){
            logoutAction(function(){
                //跳转到登录页
                props.history.push('/')
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