import React from 'react'
import { connect } from 'react-redux'
import Dialog from 'mo-dialog'
import HomeComponent from './home-component.js'

// import axios from 'axios'

const mapDispatchToProps = (dispatch, props) => {

	// axios.post('/User/Register', {
	// 	Phone: 13312345678,
	// 	SmsCode: 1111,
	// 	Password: 1122,
	// 	ConfirmPassword: 1122
	// })
	// 	.then(function (response) {
	// 		console.log('res', response)
	// 	})
	// 	.catch(function (error) {
	// 		console.log('error', error)
	// 	});


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