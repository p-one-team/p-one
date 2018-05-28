import React from 'react'
import { connect } from 'react-redux'
import Dialog from 'mo-dialog'
import HomeComponent from './home-component.js'
import axios from 'axios';
import { Toast } from 'antd-mobile';

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

		login(data) {
			axios.post('/User/Login', {
				Phone: data.Phone,
				SmsCode: data.SmsCode,
				Password: data.Password,
				UseSmsCode: data.UseSmsCode
			})
			.then(function (res) {
				if(res){
					Toast.success('登录成功！');
					console.log('reslogin', res.data);
				}
			})
			.catch(function (error) {
				Toast.fail('登录失败，请稍后重试！');
				console.log('error', error);
			});
		},

		getCode(data) {
			axios.post('/User/GetSmsCode', {
				phone: data.phone
			})
			.then(function (res) {
				if(res){
					Toast.success('短信验证码获取成功！');
				}
			})
			.catch(function (error) {
				Toast.fail('短信验证码获取失败，请稍后重试！');
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