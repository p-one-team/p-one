import React, { Component } from 'react'
import PropTypes from 'prop-types'
import CSSModules from 'react-css-modules'
import style from './signUp.less'

import { InputItem, Checkbox } from 'antd-mobile';
import { createForm } from 'rc-form';



@CSSModules(style, { handleNotFoundStyleName: 'ignore' })
class signUpComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            phoneNumber: '',
            verificationCode: ''
        }

    }

    componentDidMount() {
        this.props.initData()
    }

    submit = () => {
        this.props.form.validateFields((error, value) => {
            console.log(error, value);
        });
    }
    goLogin = () => {
        this.props.history.push('/')
    }
    handleClick = () => {
        this.customFocusInst.focus();
    }
    render() {
        // const {} = this.props
        const { getFieldProps } = this.props.form;
        // let errors;
        // const { getFieldProps, getFieldError } = this.props.form;
        console.log(this.props)
        const AgreeItem = Checkbox.AgreeItem;
        return (
            <div styleName="wrap">
                <p styleName="logo">GT</p>

                <div styleName="main">
                    <div styleName="phoneInput">
                        <div>
                            <input type="tel" placeholder="请输入您的手机号"/>
                        </div>
                        <div styleName="getCode">获取验证码</div>
                    </div>
                    <InputItem
                        {...getFieldProps('verificationCode')}
                        maxLength={4}
                        type={'digit'}
                        placeholder="请输入您的验证码"
                        clear
                    ></InputItem>
                    <InputItem
                        {...getFieldProps('password')}
                        type={'password'}
                        placeholder="请设置您的密码(限6~18个字符)"
                        clear
                    ></InputItem>
                    <InputItem
                        {...getFieldProps('confirmpassword')}
                        type={'password'}
                        placeholder="请再次确认您的密码(限6~18个字符)"
                        clear
                    ></InputItem>
                </div>
                <AgreeItem data-seed="logId" onChange={e => console.log('checkbox', e)} defaultChecked>
                    <a onClick={(e) => { e.preventDefault(); alert('agree it'); }}>同意平台服务协议</a>
                </AgreeItem>
                <div styleName="register-btn" onClick={this.submit}>注册</div>
                <p styleName="login" onClick={this.goLogin}>已有账号，去登录</p>
                
            </div>
        )
    }
}

signUpComponent.propTypes = {
    phoneNumber: PropTypes.string,
    verificationCode: PropTypes.string
}

const signUpComponentWrapper = createForm()(signUpComponent);
export default signUpComponentWrapper