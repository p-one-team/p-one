import React, { Component } from 'react'
import PropTypes from 'prop-types'
import CSSModules from 'react-css-modules'
import style from './login.less'
// import classNames from 'classnames'

import { InputItem, Toast } from 'antd-mobile';
import { createForm } from 'rc-form';



@CSSModules(style, { handleNotFoundStyleName: 'ignore' })
class LoginComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            phoneNumber: '', //手机号码
            hasPhoneError: false, //手机号是否有误
            loginPsd: '', //登录密码
            hasPsdError: false, //登录密码是否有误
            messageCode: '', //短信验证码
            hasCodeError: false, //验证码是否有误
            useMessageCode: false, //false使用密码登录，true使用验证码登录
        }
    }

    //去注册
    goSign = () => {
        window.register = "register";
        this.props.history.replace('/')
    }

    //去重置密码
    goResetPsd = () => {
        this.props.goResetPsd()
    }

    //切换登录方式
    changeMode = () => {
        this.state.useMessageCode ?
            this.setState({
                useMessageCode: false,
                loginPsd: '',
                hasPsdError: false,
                messageCode: '',
                hasCodeError: false
            }) : this.setState({
                useMessageCode: true,
                loginPsd: '',
                hasPsdError: false,
                messageCode: '',
                hasCodeError: false
            })
    }

    //手机号相关
    onErrorClickPhone = () => {
        if (this.state.hasPhoneError) {
            Toast.info('请输入11位手机号');
        }
    }
    onChangePhone = (value) => {
        if (value.replace(/\s/g, '').length < 11) {
            this.setState({
                hasPhoneError: true,
            });
        } else {
            this.setState({
                hasPhoneError: false,
            });
        }
        this.setState({
            phoneNumber: value
        });
    }

    //密码相关
    onErrorClickPsd = () => {
        if (this.state.hasPsdError) {
            Toast.info('密码必须由6~18个字母和数字组成,请重新填写！');
        }
    }

    onChangePsd = (value) => {
        let regExp = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,18}$/;
        value = value.replace(/\s/g, '');

        if (value.length < 6 || value.length > 18) {
            this.setState({
                hasPsdError: true,
            });
        } else if (!regExp.test(value)) {
            this.setState({
                hasPsdError: true,
            });
        } else {
            this.setState({
                hasPsdError: false,
            });
        }

        this.setState({
            loginPsd: value
        });

    }

    // 验证码相关
    onErrorClickCode = () => {
        if (this.state.hasCodeError) {
            Toast.info('请正确填写验证码！');
        }
    }
    onChangeCode = (value) => {
        if (value.replace(/\s/g, '').length < 4) {
            this.setState({
                hasCodeError: true,
            });
        } else {
            this.setState({
                hasCodeError: false,
            });
        }
        this.setState({
            messageCode: value
        });
    }

    //获取验证码
    getCode = () => {
        if (this.state.hasPhoneError || this.state.phoneNumber.length == 0) {
            Toast.info('请正确填写登录手机号码');
            return false
        }

        this.props.getCode({
            phone: this.state.phoneNumber.replace(/\s/g, '')
        })
    }

    //登录
    login = () => {
        if (this.state.hasPhoneError || this.state.phoneNumber.length == 0) {
            Toast.info('请正确填写登录手机号码');
            return false
        }

        if (this.state.useMessageCode && (this.state.hasCodeError || this.state.messageCode.length == 0)) {
            Toast.info('请正确填写验证码!');
            return false
        }

        if (!this.state.useMessageCode && (this.state.hasPsdError || this.state.phoneNumber.length == 0)) {
            Toast.info('请正确填写登录密码!');
            return false
        }

        this.props.login({
            Phone: this.state.phoneNumber.replace(/\s/g, ''),
            Password: this.state.loginPsd,
            SmsCode: this.state.messageCode,
            UseSmsCode: this.state.useMessageCode
        })
    }

    render() {
        const { getFieldProps } = this.props.form;

        return (
            <div styleName="wrap">
                <p styleName="logo">
                    <img styleName="logo-img" src="./img/logo.png" />
                </p>
                <div styleName="main">
                    <InputItem
                        {...getFieldProps('phoneNumber')}
                        type="digit"
                        maxLength={13}
                        placeholder="请输入您的手机号"
                        clear
                        error={this.state.hasPhoneError}
                        onErrorClick={this.onErrorClickPhone}
                        onChange={this.onChangePhone}
                        value={this.state.phoneNumber}
                    ></InputItem>
                    {
                        this.state.useMessageCode == false
                            ?
                            <InputItem
                                {...getFieldProps('loginPsd')}
                                type="password"
                                maxLength={18}
                                placeholder="请输入您的密码"
                                clear
                                error={this.state.hasPsdError}
                                onErrorClick={this.onErrorClickPsd}
                                onChange={this.onChangePsd}
                                value={this.state.loginPsd}
                            ></InputItem>
                            :
                            <InputItem
                                {...getFieldProps('messageCode')}
                                maxLength={4}
                                type="number"
                                placeholder="请输入您的验证码"
                                clear
                                error={this.state.hasCodeError}
                                onErrorClick={this.onErrorClickCode}
                                onChange={this.onChangeCode}
                                value={this.state.messageCode}
                            ></InputItem>

                    }
                </div>

                {this.state.useMessageCode == false ? <div styleName="forget" onClick={this.goResetPsd}>忘记密码？</div> : <div styleName="getcode" onClick={this.getCode}>获取验证码</div>}

                <div styleName="login-btn" onClick={this.login}>登录</div>
                <div styleName="bottom">
                    {this.state.useMessageCode == false
                        ? <span onClick={this.changeMode}>验证码登录</span>
                        : <span onClick={this.changeMode}>密码登录</span>
                    }
                    <span styleName="register" onClick={this.goSign}>立即注册</span>
                </div>
            </div>
        )
    }
}

LoginComponent.propTypes = {
    phoneNumber: PropTypes.string,
    loginPsd: PropTypes.string,
    messageCode: PropTypes.string,
    useMessageCode: PropTypes.bool
}

const LoginComponentWrapper = createForm()(LoginComponent);
export default LoginComponentWrapper