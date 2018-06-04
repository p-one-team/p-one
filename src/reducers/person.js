import axios from '../https'
import { Toast } from 'antd-mobile'
import store from '../store'


/*-----------------------------------------------------------------*/
/*User Reducer*/
/*-----------------------------------------------------------------*/
const initPersonInfo = {

}

const PersonReducer = (state = initPersonInfo, action) => {

    switch (action.type) {
        case 'USER_INFO':
            return Object.assign({}, state, {userInfos: action.userInfos})

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


export { 
    PersonReducer,
    loginAction,
}