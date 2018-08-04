import axios from '../https'
import { Toast } from 'antd-mobile'
import store from '../store'
import _ut from '../libs/my-util'


/*-----------------------------------------------------------------*/
/*User Reducer*/
/*-----------------------------------------------------------------*/
const initUserInfo = {
    userInfos: {},
    isForgetPsd: false,
    userSteamAlert: false,
    userUrlAlert: false,
    noticesList: {},
    noticesDetail: {}
}

const UserReducer = (state = initUserInfo, action) => {

    switch (action.type) {
        case 'USER_INFO':
            return Object.assign({}, state, { userInfos: action.userInfos })

        case 'USER_FORGET_PSD':
            return Object.assign({}, state, { isForgetPsd: action.isForgetPsd })

        case 'USER_STEAM_ALERT':
            return Object.assign({}, state, { userSteamAlert: action.userSteamAlert, userUrlAlert: action.userUrlAlert })

        case 'NOTICES_LIST':
            return Object.assign({}, state, { noticesList: action.noticesList })

        case 'NOTICES_DETAIL':
            return Object.assign({}, state, { noticesDetail: action.noticesDetail })

        default:
            return state
    }
}


/*-----------------------------------------------------------------*/
/*User Action*/
/*-----------------------------------------------------------------*/

// 登录
const loginAction = (data, callback) => {
    axios.post('/User/Login', {
            Phone: data.Phone,
            SmsCode: data.SmsCode,
            Password: data.Password,
            UseSmsCode: data.UseSmsCode
        })
        .then(function(res) {
            if (res) {
                // Toast.success('登录成功！');
                window.token = res.Data.Token
                setCookie(res.Data.Token)
                store.dispatch({
                    type: "USER_INFO",
                    userInfos: res.Data
                })

                if (_ut.isEmpty(res.Data.SteamId)) {
                    store.dispatch({
                        type: "USER_STEAM_ALERT",
                        userSteamAlert: true,
                        userUrlAlert: false
                    })
                } else {
                    if (_ut.isEmpty(res.Data.SteamTradeUrl)) {
                        store.dispatch({
                            type: "USER_STEAM_ALERT",
                            userSteamAlert: false,
                            userUrlAlert: true
                        })
                    } else {
                        store.dispatch({
                            type: "USER_STEAM_ALERT",
                            userSteamAlert: false,
                            userUrlAlert: false
                        })
                    }
                }

                callback ? callback() : ""
            }
        })
        .catch(function(error) {
            Toast.fail('登录失败，请稍后重试！');
            console.log('error', error);
        });
}

// 获取验证码
const getMsgCode = (data) => {
    axios.post('/User/GetSmsCode', {
            phone: data.phone
        })
        .then(function(res) {
            if (res) {
                Toast.success('短信验证码获取成功！');
            }
        })
        .catch(function(error) {
            Toast.fail('短信验证码获取失败，请稍后重试！');
            console.log('error', error);
        });
}

// 登出
const logoutAction = (callback) => {
    axios.get("/User/Logout")
        .then(function(res) {
            if (res) {
                // Toast.success('退出登录成功！');
                window.token = ""

                store.dispatch({
                    type: "USER_INFO",
                    userInfos: {}
                })

                callback ? callback() : ""
            }
        })
        .catch(function(error) {
            Toast.fail('退出登录失败，请稍后重试！');
            console.log('error', error)
        });
}

// 注册
const registerAction = (data, callback) => {
    axios.post('/User/Register', {
            Phone: data.Phone,
            SmsCode: data.SmsCode,
            Password: data.Password,
            ConfirmPassword: data.ConfirmPassword
        })
        .then(function(res) {
            if (res) {
                // Toast.success('注册成功！');
                window.token = res.Data.Token;
                setCookie(res.Data.Token)

                store.dispatch({
                    type: "USER_INFO",
                    userInfos: res.Data
                })

                if (_ut.isEmpty(res.Data.SteamId)) {
                    store.dispatch({
                        type: "USER_STEAM_ALERT",
                        userSteamAlert: true,
                        userUrlAlert: false
                    })
                } else {
                    if (_ut.isEmpty(res.Data.SteamTradeUrl)) {
                        store.dispatch({
                            type: "USER_STEAM_ALERT",
                            userSteamAlert: false,
                            userUrlAlert: true
                        })
                    } else {
                        store.dispatch({
                            type: "USER_STEAM_ALERT",
                            userSteamAlert: false,
                            userUrlAlert: false
                        })
                    }
                }

                callback ? callback() : ""
            }
        })
        .catch(function(error) {
            Toast.fail('注册失败，请稍后重试！');
            console.log('error', error)
        });
}

// 重置密码
const resetPsdAction = (data, callback) => {
    axios.post('/User/ResetPassword', {
            Phone: data.Phone,
            SmsCode: data.SmsCode,
            Password: data.Password,
            ConfirmPassword: data.ConfirmPassword
        })
        .then(function(res) {
            if (res) {
                window.token = res.Data.Token
                setCookie(res.Data.Token)
                store.dispatch({
                    type: "USER_INFO",
                    userInfos: res.Data
                })

                callback ? callback() : ""
            }
        })
        .catch(function(error) {
            Toast.fail('重置密码失败，请稍后重试！');
            console.log('error', error)
        });
}

//签到
const signIn = (data, callback) => {
    axios.get('/User/CheckIn')
        .then(function(res) {
            if (res) {
                Toast.success(res.Msg);
                callback ? callback() : ""
            }
        })
        .catch(function(error) {
            Toast.fail('请求失败，请稍后重试！');
            console.log('error', error)
        });
}

//刷新用户信息
const refreshUserInfo = (data, callback) => {
    axios.get('/User/RefreshUserInfo')
        .then(function(res) {
            if (res) {
                window.token = res.Data.Token;
                setCookie(res.Data.Token);
                store.dispatch({
                    type: "USER_INFO",
                    userInfos: res.Data
                })

                callback ? callback() : ""
            }
        })
        .catch(function(error) {
            Toast.fail('请求失败，请稍后重试！');
            console.log('error', error)
        });
}

// 用户反馈
const feedback = (data, callback) => {
    axios.post('/User/Feedback', {
            ProblemTitle: data.ProblemTitle,
            QQ: data.QQ,
            ProblemContent: data.ProblemContent
        })
        .then(function(res) {
            if (res) {
                Toast.success(res.Msg)

                callback ? callback() : ""
            }
        })
        .catch(function(error) {
            Toast.fail('请求失败，请稍后重试！');
            console.log('error', error)
        });
}

//获取系统公告
const getNotices = (data, callback) => {
    axios.post('/User/GetNotices', {
            Page: data.Page,
            PageSize: data.PageSize,
        })
        .then(function(res) {
            if (res) {
                store.dispatch({
                    type: "NOTICES_LIST",
                    noticesList: res.Data
                })

                callback ? callback() : ""
            }
        })
        .catch(function(error) {
            Toast.fail('请求失败，请稍后重试！');
            console.log('error', error)
        });
}

//更新steamurl
const updateSteamUrl = (data, callback) => {
    axios.post('/User/UpdateSteamTradeUrl', {
            TradeUrl: data.TradeUrl
        })
        .then(function(res) {
            if (res) {
                Toast.success(res.Msg)

                callback ? callback() : ""
            }
        })
        .catch(function(error) {
            Toast.fail('请求失败，请稍后重试！');
            console.log('error', error)
        });
}

const setCookie = (value, expiredays) => {
    var exdate = new Date();
    exdate.setDate(exdate.getDate + expiredays);
    document.cookie = "token=Bearer " + escape(value) + ((expiredays == null) ? "" : ";expires=" + exdate.toGMTString());
}


export {
    UserReducer,
    loginAction,
    getMsgCode,
    logoutAction,
    registerAction,
    resetPsdAction,
    signIn,
    refreshUserInfo,
    updateSteamUrl,
    feedback,
    getNotices
}