import { connect } from 'react-redux'
import resetPsdComponentWrapper from './resetPsd-component.js'
import axios from 'axios'
import { Toast } from 'antd-mobile';

const mapDispatchToProps = (dispatch, props) => {
    return {
        initData() {
            console.log('init index')
        },

        resetPsd(data) {
            axios.post('/User/ResetPassword', {
                Phone: data.Phone,
                SmsCode: data.SmsCode,
                Password: data.Password,
                ConfirmPassword: data.ConfirmPassword
            })
            .then(function (res) {
                if(res){
                    Toast.success('重置密码成功，请重新登录！');
                    //跳转到登录页
                    props.history.push('/')
				}
            })
            .catch(function (error) {
                Toast.fail('重置密码失败，请稍后重试！');
                console.log('error', error)
            });
        },

        getCode(data) {
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
    }
}

const mapStateToProps = (state) => {
    return {
        ...state.HomeReducer
    }
}


const ResetPassword = connect(
    mapStateToProps,
    mapDispatchToProps
)(resetPsdComponentWrapper)

export default ResetPassword;