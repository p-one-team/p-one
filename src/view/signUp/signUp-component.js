import React, { Component } from 'react'
import PropTypes from 'prop-types'
import CSSModules from 'react-css-modules'
import style from './signUp.less'

import { List, InputItem, Checkbox, Toast } from 'antd-mobile';
import { createForm } from 'rc-form';



@CSSModules(style, { handleNotFoundStyleName: 'ignore' })
class signUpComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            phoneNumber: '',
            SmsCode: '',
            Password: '',
            hasPsdError: '',
            hasConPsdError: '',
            ConfirmPassword: '',
            hasError: false
        }

    }

    componentDidMount() {
        this.props.initData()
    }

    submit = () => {
        if (this.state.hasError || this.state.hasPsdError || this.state.hasConPsdError || this.state.phoneNumber.length == 0 || this.state.Password.length == 0 || this.state.ConfirmPassword.length == 0 || this.state.SmsCode.length == 0) {
            Toast.info('请填写完整信息后注册!');
        } else {
            this.props.register(this.state.phoneNumber, this.state.SmsCode, this.state.Password, this.state.ConfirmPassword)
        }
    }

    //手机号相关
    onErrorClick = () => {
        if (this.state.hasError) {
            Toast.info('Please enter 11 digits');
        }
    }
    onChange = (value) => {
        if (value.replace(/\s/g, '').length < 11) {
            this.setState({
                hasError: true,
            });
        } else {
            this.setState({
                hasError: false,
            });
        }
        this.setState({
            phoneNumber: value
        });
    }

    //密码相关
    onErrorClickPSD = () => {
        if (this.state.hasPsdError) {
            Toast.info('密码必须由6~15个字母和数字组成,请重新填写！');
        }
    }
    onChangePSD = (value) => {
        let regExp = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,15}$/;
        value = value.replace(/\s/g, '');

        if (value.length < 6 || value.length > 15) {
            this.setState({
                hasErrorPSD: true,
            });
        } else if (!regExp.test(value)) {
            this.setState({
                hasErrorPSD: true,
            });
        } else {
            this.setState({
                hasErrorPSD: false,
            });
        }

        this.setState({
            Password: value
        });

    }

    //确认密码相关
    onChangeConPSD = (value) => {
        if (value !== this.state.Password) {
            this.setState({
                hasConPsdError: true,
            });
        } else {
            this.setState({
                hasConPsdError: false,
            });
        }

        this.setState({
            ConfirmPassword: value
        });

    }

    onErrorClickConPSD = () => {
        if (this.state.hasConPsdError) {
            Toast.info('确认密码请和密码一致');
        }
    }

    goLogin = () => {
        this.props.history.push('/')
    }
    render() {
        // const {} = this.props
        const { getFieldProps } = this.props.form;
        // let errors;
        // const { getFieldProps, getFieldError } = this.props.form;
        // console.log(this.props)
        const AgreeItem = Checkbox.AgreeItem;
        return (
            <div styleName="wrap">
                <p styleName="logo">GT</p>

                <div styleName="main">
                    <List>
                        <InputItem
                            {...getFieldProps('phoneNum')}
                            type="phone"
                            error={this.state.hasError}
                            onErrorClick={this.onErrorClick}
                            onChange={this.onChange}
                            value={this.state.phoneNumber}
                            placeholder="188 1234 1234"
                        >手机号码</InputItem>
                        <div> 验证码</div>
                        <InputItem
                            {...getFieldProps('verificationCode')}
                            maxLength={4}
                            type={'number'}
                            placeholder="请输入您的验证码"
                            clear
                        >验证码</InputItem>
                        <InputItem
                            {...getFieldProps('password')}
                            type={'password'}
                            error={this.state.hasErrorPSD}
                            onErrorClick={this.onErrorClickPSD}
                            onChange={this.onChangePSD}
                            value={this.state.Password}
                            placeholder="请设置您的密码(限6~18个字符)"
                            clear
                        >密码</InputItem>
                        <InputItem
                            {...getFieldProps('confirmpassword')}
                            type={'password'}
                            error={this.state.hasConPsdError}
                            onErrorClick={this.onErrorClickConPSD}
                            onChange={this.onChangeConPSD}
                            value={this.state.ConfirmPassword}
                            placeholder="请再次确认您的密码(限6~18个字符)"
                            clear
                        >确认密码</InputItem>
                    </List>
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