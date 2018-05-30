import React from 'react'
import { connect } from 'react-redux'
import Dialog from 'mo-dialog'
import HomeComponent from './home-component.js'
import { loginAction, getMsgCode } from '../../reducers/user'

const mapDispatchToProps = (dispatch, props) => {

	return {
		initData() {
			//console.log('init index')
		},

		goResetPsd(){
			dispatch({
				type: "USER_FORGET_PSD",
				isForgetPsd: true
			})
			props.history.push('/resetPassword')
		},

		openDialog() {
			Dialog.alert(<p>Hello from the <b style={{ color: "#f496ce" }}>Moon~</b></p>)
		},

		login(data) {
			loginAction(data, function(){
				props.history.push('/match')
			})
		},

		getCode(data) {
			getMsgCode(data)
		}
	}
}

const mapStateToProps = (state) => {
	return {
		...state.HomeReducer
	}
}


const Home = connect(
	mapStateToProps,
	mapDispatchToProps
)(HomeComponent)

export default Home;