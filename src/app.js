import React from 'react';
import ReactDOM from 'react-dom';
import App from './router';
import { AppContainer } from 'react-hot-loader';
import axios from 'axios'
import AlertWindow from './module/mo-alertWindow';


// import 'whatwg-fetch';
// import request from 'superagent'

//请求方式superagent
// const myRequest = function(url,data){
// 	let URL = "http://112.33.11.107:61680/api"+url;
// 	request.post(URL)
// 		.withCredentials()
// 		.set('Content-Type', 'application/json-patch+json')
// 		.send(data)
// 		.then(function(res){
// 			console.log(res)
// 			// console.log(res.header)
// 			// console.log(res.getResponseHeader("Set-Cookie"))
// 			console.log(res.xhr.getResponseHeader("Set-Cookie"))
// 		})
		
// }

// export default myRequest;

//请求方式fetch
// const myFetch = function(url,reqData,callback){
// 	let URL = "http://112.33.11.107:61680/api"+url;

// 	function status(response){
// 		// console.log(response)
// 		if(response.status>=200 && response.status<300){
// 			console.log(response.headers)
// 			return Promise.resolve(response);
// 		}
// 		else{
// 			console.log(response.headers)
// 			return Promise.reject(new Error(response.statusText));
// 		}
// 	}
// 	function json(response){
// 		return response.json();
// 	}

// 	fetch(URL,{
// 		method:"post",
// 		headers:{
// 			"Content-type":"application/json-patch+json"
// 		},
// 		mode: "cors",
// 		body:JSON.stringify(reqData),
// 		credentials:"include"
// 	})
// 	.then(status)
// 	.then(json)
// 	.then(function(data){
// 		if(data.Code=="0000"){
// 			callback(data)
// 		}else{
// 			AlertWindow.Prompt(data.Msg)
// 		}
// 	})
// 	.catch(function(err){
// 		console.log("Fetch错误:"+err);
// 	});
// }

// export default myFetch

//请求方式axios
axios.defaults.baseURL = 'http://112.33.11.107:61680/api';
axios.defaults.headers.post['content-Type'] = 'application/json-patch+json';
axios.defaults.withCredentials = true;
axios.interceptors.response.use(function (res) {
	// if (res && !(res.status === 200 || res.status === 304 ||
	// 	res.status === 400)) {
	// 	return Promise.reject({
	// 		status: -404,
	// 		msg: '请求异常'
	// 	})
	// }
	// console.log('res', res.data)

	//在这里对返回的数据进行处理
	if(res.data.Code=="0000"){
		return res.data
	}else{
		AlertWindow.Prompt(res.data.Msg,()=>{return false})
		return false
	}

}, function (err) {
	//Do something with response error
	return Promise.reject(err);
})


if (process.env.NODE_ENV === 'development') {
	const render = (Component) => {
		ReactDOM.render(
			<AppContainer>
				<Component />
			</AppContainer>,
			document.getElementById('root'));
	};

	render(App);

	if (module.hot) {
		module.hot.accept('./router', () => {
			render(App)
		});
	}
} else {
	ReactDOM.render(<App />, document.getElementById('root'));
}





