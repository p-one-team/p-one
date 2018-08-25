import { connect } from 'react-redux'
import LoginComponent from './login-component.js'
import { loginAction, getMsgCode } from '../../reducers/user'

const mapDispatchToProps = (dispatch, props) => {

	return {
		//前往忘记密码页
		goResetPsd() {
			dispatch({
				type: "USER_FORGET_PSD",
				isForgetPsd: true
			})
			props.history.push('/resetPassword')
		},

		//登录
		login(data) {
			loginAction(data, function () {
				props.history.replace('/')
			})
		},

		//获取验证码
		getCode(data) {
			getMsgCode(data)
		}
	}
}

const mapStateToProps = (state) => {
	return {
		...state.UserReducer
	}
}

const Login = connect(
	mapStateToProps,
	mapDispatchToProps
)(LoginComponent)

export default Login;