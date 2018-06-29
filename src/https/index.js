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

window.token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9tb2JpbGVwaG9uZSI6IjE4ODEyMzQ1Njc4IiwiZXhwIjoxNTMwODQ0MDc0LCJpc3MiOiJndGRpYW5qaW5nLmNvbSIsImF1ZCI6Imd0ZGlhbmppbmcuY29tIn0.jo4tOOoKtTkFVrJLprwJYP6GFknfe7L4zt6xkMFwCEs"

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