import React from 'react'
import { connect } from 'react-redux'
import Dialog from 'mo-dialog'
import HomeComponent from './home-component.js'
import axios from 'axios'
import { Toast } from 'antd-mobile';

// import axios from 'axios'

const mapDispatchToProps = (dispatch, props) => {

	return {
		initData() {
			console.log('init index')
		},
		goListPage() {
			props.history.push('/list')
		},
		goMiaoPage() {
			props.history.push('/miao')
		},
		openDialog() {
			Dialog.alert(<p>Hello from the <b style={{ color: "#f496ce" }}>Moon~</b></p>)
		},
		login(Phone, password, SmsCode, UseSmsCode) {
			console.log(Phone)
			axios.post('/User/Login', {
				Phone: Phone,
				SmsCode: SmsCode,
				Password: password,
				UseSmsCode: UseSmsCode
			})
				.then(function (response) {
					Toast.success('登录成功,跳转中...');
					// props.history.push('/match');
					console.log('reslogin', response.data);
				})
				.catch(function (error) {
					Toast.fail('登录失败,跳转中...');
					console.log('error', error);
				});
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