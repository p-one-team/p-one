import React from 'react';
import ReactDOM from 'react-dom';
import App from './router';
import { AppContainer } from 'react-hot-loader';
import axios from 'axios'

axios.defaults.baseURL = 'http://112.33.11.107:61680/api';
axios.defaults.headers.post['content-Type'] = 'application/json';
axios.interceptors.response.use(function (res) {
	//在这里对返回的数据进行处理
	if (res.data.Code !== 200) {
		alert(res.data.Msg)
		return false
	}
	return res.data;
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





