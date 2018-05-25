import axios from 'axios';
import host from "./host";

// let loading = document.querySelector('.fixedLoading')
//console.log(loading.style.display)
// --------------------------------------拦截器--------------------------------------------
//请求处理（添加请求拦截器）
axios.interceptors.request.use(config => {
    // 在发送请求之前做些什么
    // if (localStorage.getItem('cfc_token')) {
    // config.headers.Authorization ="1111";
    //}
    // loading.style.display = 'block'// 请求前loading
    return config;
}, err => {
    // 对请求错误做些什么
    //  loading.style.display = 'none'// 请求失败loading
    return Promise.reject(err);
});


//响应处理（ 添加响应拦截器）
axios.interceptors.response.use(response => {
    // 对响应数据做点什么
    // loading.style.display = 'none'// 响应数据成功loading
    return response
}, error => {
    // 对响应错误做点什么
    // loading.style.display = 'none'// 响应数据失败loading
    // 请求后得到的响应数据
    // if (error.response) {
    //     switch (error.response.status) {
    //         case 401: 强制退出，登录过期
    //         ///bundle.js
    //         break;
    //     }
    // }
    return Promise.resolve(error.response)
});



function checkStatus(response) {
    // 如果http状态码正常，则直接返回数据
    if (response && (response.status === 200 || response.status === 304 ||
            response.status === 400)) {
        return response
    }
    // 异常状态下，把错误信息返回去
    return {
        status: -404,
        msg: '请求异常'
    }
}

function checkCode(res) {
    // 如果code异常
    if (res.status === -404) {
        console.log(res.msg);
    }
    //console.log(res);
    //console.log(res.headers.get('Content-Type'));
    if (res.data && (!res.data.success)) {
        //console.log(res.data.error_msg);
    }

    return res.data
}




// 请求方式的配置
// 注意：这些是创建请求时可以用的配置选项。只有 url 是必需的。如果没有指定 method，请求将默认使用 get 方法。

// axios(config)    代表：可以通过向 axios 传递相关配置来创建请求
// //localStorage.getItem("token") ? JSON.stringify(localStorage.getItem("token")) : null
export default {
    post(url, data) {
        return axios({ //------------------- 发送 POST 请求
            method: 'post',
            baseURL: host,
            url,
            data: JSON.stringify(data),
            timeout: 5000, // 如果请求话费了超过 `timeout` 的时间，请求将被中断
            headers: {
                'X-Requested-With': 'XMLHttpRequest',
                'Content-Type': 'application/json; charset=UTF-8',
                'Authorization': null
            }
        }).then(
            (response) => {
                return checkStatus(response)
            }
        ).then(
            (res) => {
                return checkCode(res)
            }
        )
    },
    get(url, params) { //------------------- 发送 get 请求
        return axios({
            method: 'get', // 默认是 get
            baseURL: host,
            // `url` 是用于请求的服务器 URL
            url,
            params, // get 请求时带的参数
            timeout: 5000,
            headers: {
                //'X-Requested-With': 'XMLHttpRequest',
                // 'Content-Type': 'application/json; charset=UTF-8',
                //'ABC':'1111'
            }
        }).then(
            (response) => {
                return checkStatus(response)
            }
        ).then(
            (res) => {
                return checkCode(res)
            }
        )
    }
}