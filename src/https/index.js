import axios from 'axios';
import _ut from '../libs/my-util'
import AlertWindow from '../module/mo-alertWindow'

//请求方式axios
axios.interceptors.response.use(function (res) {

	//在这里对返回的数据进行处理
	if(res.data.Code=="0000"){
		return res.data
	}else{
		AlertWindow.Prompt(res.data.Msg,()=>{return false})
		return false
	}

}, function (err) {
	return Promise.reject(err);
})


const _baseURL = "http://112.33.11.107:61680/api"

export default {
    post (url, params) { 
        return axios({  //------------------- 发送 POST 请求
            method: 'post',
            baseURL: _baseURL,
            url,
            data: params,
            headers: {
				'Content-Type': 'application/json-patch+json',
				'Authorization': _ut.isEmpty(window.token) ? "" : "Bearer "+window.token,
				'withCredentials': true
              }
		})
    },
    get (url, params) {  //------------------- 发送 get 请求
        return axios({
            method: 'get',
            baseURL: _baseURL,
            url,
            data: params,
            headers: {
				'Content-Type': 'application/json-patch+json',
				'Authorization': _ut.isEmpty(window.token) ? "" : "Bearer "+window.token,
				'withCredentials': true
            }
		})
    }
}