import axios from '../https'
import { Toast } from 'antd-mobile'
import store from '../store'


/*-----------------------------------------------------------------*/
/*User Reducer*/
/*-----------------------------------------------------------------*/
const initUserInfo = {
    userInfos: {},
    isForgetPsd: false
}

const UserReducer = (state = initUserInfo, action) => {

    switch (action.type) {
        case 'USER_INFO':
            return Object.assign({}, state, {userInfos: action.userInfos})

        case 'USER_FORGET_PSD':
            return Object.assign({}, state, {isForgetPsd: action.isForgetPsd})

        default:
            return state
    }
}


/*-----------------------------------------------------------------*/
/*User Action*/
/*-----------------------------------------------------------------*/

const loginAction = (data, callback) => {
    axios.post('/User/Login', {
        Phone: data.Phone,
        SmsCode: data.SmsCode,
        Password: data.Password,
        UseSmsCode: data.UseSmsCode
    })
    .then(function (res) {
        if(res){
            // Toast.success('登录成功！');
            window.token = res.Data.Token

            store.dispatch({
                type: "USER_INFO",
                userInfos: res.Data
            })

            callback ? callback() : ""
        }
    })
    .catch(function (error) {
        Toast.fail('登录失败，请稍后重试！');
        console.log('error', error);
    });
}

const getMsgCode = (data) => {
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

const logoutAction = (callback) => {
    axios.get("/User/Logout")
        .then(function (res) {
            if(res){
                // Toast.success('退出登录成功！');
                window.token = ""

                store.dispatch({
                    type: "USER_INFO",
                    userInfos: {}
                })

                callback ? callback() : ""
            }
        })
        .catch(function (error) {
            Toast.fail('退出登录失败！');
            console.log('error', error)
        });
}

const registerAction = (data, callback) => {
    axios.post('/User/Register', {
        Phone: data.Phone,
        SmsCode: data.SmsCode,
        Password: data.Password,
        ConfirmPassword: data.ConfirmPassword
    })
    .then(function (res) {
        if(res){
            // Toast.success('注册成功！');
            window.token = res.Data.token;

            store.dispatch({
                type: "USER_INFO",
                userInfos: res.Data
            })

            callback ? callback() : ""
        }
    })
    .catch(function (error) {
        Toast.fail('注册失败，请稍后重试！');
        console.log('error', error)
    });
}

const resetPsdAction = (data, callback) => {
    axios.post('/User/ResetPassword', {
        Phone: data.Phone,
        SmsCode: data.SmsCode,
        Password: data.Password,
        ConfirmPassword: data.ConfirmPassword
    })
    .then(function (res) {
        if(res){
            window.token = res.Data.Token

            store.dispatch({
                type: "USER_INFO",
                userInfos: res.Data
            })

            callback ? callback() : ""
        }
    })
    .catch(function (error) {
        Toast.fail('重置密码失败，请稍后重试！');
        console.log('error', error)
    });
}


export { 
    UserReducer,
    loginAction,
    getMsgCode,
    logoutAction,
    registerAction,
    resetPsdAction
}