import axios from 'axios';
import _ut from '../libs/my-util'
import AlertWindow from '../module/mo-alertWindow'


// 添加请求拦截器
axios.interceptors.request.use(function (config) {

    let loading = document.getElementById('Loading');
    loading.style.display = 'flex';
    return config;
}, function (error) {
    // 对请求错误做些什么
    let loading = document.getElementById('Loading');
    loading.style.display = 'none';
    return Promise.reject(error);
});


//请求方式axios
axios.interceptors.response.use(function (res) {

    let loading = document.getElementById('Loading');
    loading.style.display = 'none';
    //在这里对返回的数据进行处理
    if (res.data.Code == "0000") {
        return res.data
    } else {
        AlertWindow.Prompt(res.data.Msg, () => { return false })
        return false
    }

}, function (err) {
    return Promise.reject(err);
})


// const _baseURL = "http://112.33.11.107:61680/api"

const _baseURL = "http://jdtg.gtdianjing.com/api"

// window.token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9tb2JpbGVwaG9uZSI6IjEzMzEyMzQ1Njc4IiwiZXhwIjoxNTMzMDE4MzM2LCJpc3MiOiJndGRpYW5qaW5nLmNvbSIsImF1ZCI6Imd0ZGlhbmppbmcuY29tIn0.c6Z4jZTA0YTM7LrmRDsK_U9HPdOleicoN-X4pxFOMnc"

export default {
    post(url, params) {
        return axios({ //------------------- 发送 POST 请求
            method: 'post',
            baseURL: _baseURL,
            url,
            data: params,
            headers: {
                'Content-Type': 'application/json-patch+json',
                'Authorization': _ut.isEmpty(window.token) ? getCookie('token') : "Bearer " + window.token,
                'withCredentials': true
            }
        })
    },
    get(url, params) { //------------------- 发送 get 请求
        return axios({
            method: 'get',
            baseURL: _baseURL,
            url,
            data: params,
            headers: {
                'Content-Type': 'application/json-patch+json',
                'Authorization': _ut.isEmpty(window.token) ? getCookie('token') : "Bearer " + window.token,
                'withCredentials': true
            }
        })
    }
}

const getCookie = (c_name) => {
    if (document.cookie.length > 13) //首先查询cookie是否是空的
    {
        let c_start = document.cookie.indexOf(c_name + "=") //检测这个cookie是否存在
        if (c_start != -1) //如果cookie存在
        {
            c_start = c_start + c_name.length + 1 //获取到cookie的值的开始位置
            let c_end = document.cookie.indexOf(";", c_start) //从c_start开始查找";"的存在
            if (c_end == -1) c_end = document.cookie.length //如果没找到，说明是最后一项
            return unescape(document.cookie.substring(c_start, c_end)) //把cookie的值拆分出来并且对这个值进行解码，unescape()与escape()相对，对被escape()编码的字符串进行解码
        }
    }
    return "" //不存在就返回空
}

export { getCookie }