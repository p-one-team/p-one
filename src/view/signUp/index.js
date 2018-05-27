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
        register(Phone, SmsCode, Password, ConfirmPassword) {
            console.log(Phone)
            axios.post('/User/Register', {
                Phone: Phone,
                SmsCode: SmsCode,
                Password: Password,
                ConfirmPassword: ConfirmPassword
            })
                .then(function (response) {
                    Toast.success('注册成功,跳转中...');
                    console.log('res', response)
                })
                .catch(function (error) {
                    Toast.fail('登录失败,请稍后重试...');
                    console.log('error', error)
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