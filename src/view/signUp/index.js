import { connect } from 'react-redux'
import signUpComponentWrapper from './signUp-component.js'
import axios from 'axios'
import { Toast } from 'antd-mobile';

const mapDispatchToProps = (dispatch, props) => {
    return {
        initData() {
            console.log('init index')
        },
        goListPage() {
            props.history.push('/list')
        },

        register(data) {
            axios.post('/User/Register', {
                Phone: data.Phone,
                SmsCode: data.SmsCode,
                Password: data.Password,
                ConfirmPassword: data.ConfirmPassword
            })
            .then(function (res) {
                if(res){
					Toast.success('注册成功！');
				}
            })
            .catch(function (error) {
                Toast.fail('注册失败，请稍后重试！');
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


const signUp = connect(
    mapStateToProps,
    mapDispatchToProps
)(signUpComponentWrapper)

export default signUp;