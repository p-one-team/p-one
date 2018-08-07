import React, { Component } from 'react'
import PropTypes from 'prop-types'
import CSSModules from 'react-css-modules'
import style from './signUp.less'

import { InputItem, Toast } from 'antd-mobile';
import { createForm } from 'rc-form';



@CSSModules(style, { handleNotFoundStyleName: 'ignore' })
class signUpComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            phoneNumber: '', //手机号码
            hasPhoneError: false,
            messageCode: '', //验证码
            hasCodeError: false,
            loginPsd: '', //第一遍密码
            hasPsdError: false,
            confirmPsd: '', //第二遍密码
            hasConfirmError: false,
            checkboxState: true
        }
    }

    //去登录
    goLogin = () => {
        this.props.history.goBack()
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

    // 首次密码相关
    onErrorClickPsd = () => {
        if (this.state.hasPsdError) {
            Toast.info('密码必须由6~15个字母和数字组成,请重新填写！');
        }
    }
    onChangePsd = (value) => {
        let regExp = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,15}$/;
        value = value.replace(/\s/g, '');

        if (value.length < 6 || value.length > 15) {
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

    //确认密码相关
    onErrorClickConfirm = () => {
        if (this.state.hasConfirmError) {
            Toast.info('确认密码请和密码一致');
        }
    }
    onChangeConfirm = (value) => {
        if (value !== this.state.loginPsd) {
            this.setState({
                hasConfirmError: true,
            });
        } else {
            this.setState({
                hasConfirmError: false,
            });
        }

        this.setState({
            confirmPsd: value
        });
    }

    //获取验证码
    getCode = () => {
        if (this.state.hasPhoneError || this.state.phoneNumber.length == 0) {
            Toast.info('请正确填写注册手机号码');
            return false
        }

        this.props.getCode({
            phone: this.state.phoneNumber.replace(/\s/g, '')
        })
    }

    //注册
    register = () => {
        if (this.state.hasPhoneError || this.state.phoneNumber.length == 0) {
            Toast.info('请正确填写注册手机号码');
            return false
        }

        if (this.state.hasCodeError || this.state.messageCode.length == 0) {
            Toast.info('请正确填写验证码!');
            return false
        }

        if (this.state.hasPsdError || this.state.loginPsd.length == 0) {
            Toast.info('密码必须由6~15个数字和字母组成,请正确填写!');
            return false
        }

        if (this.state.hasConfirmError || this.state.confirmPsd.length == 0) {
            Toast.info('两次填写密码不一致,请重新确认登录密码!');
            return false
        }

        if(!this.state.checkboxState){
            Toast.info('请同意平台服务协议!');
            return false
        }

        this.props.register({
            Phone: this.state.phoneNumber.replace(/\s/g, ''),
            SmsCode: this.state.messageCode,
            Password: this.state.loginPsd,
            ConfirmPassword: this.state.confirmPsd
        })
    }

    changeCheckbox = () => {
        this.setState({
            checkboxState: !this.state.checkboxState
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
                        {...getFieldProps('phoneNum')}
                        type="digit"
                        placeholder="请输入您的手机号码"
                        maxLength={13}
                        clear
                        error={this.state.hasPhoneError}
                        onErrorClick={this.onErrorClickPhone}
                        onChange={this.onChangePhone}
                        value={this.state.phoneNumber}
                    >手机号码</InputItem>
                    <InputItem
                        className="codeInput"
                        {...getFieldProps('messageCode')}
                        type="number"
                        placeholder="请输入您的验证码"
                        maxLength={4}
                        clear
                        error={this.state.hasCodeError}
                        onErrorClick={this.onErrorClickCode}
                        onChange={this.onChangeCode}
                        value={this.state.messageCode}
                    >验证码</InputItem>
                    <span className="getCode" onClick={this.getCode}>获取验证码</span>
                    <div style={{ clear: "both" }}></div>
                    <InputItem
                        {...getFieldProps('loginPsd')}
                        type="password"
                        placeholder="请设置您的密码(限6~18个字符)"
                        maxLength={18}
                        clear
                        error={this.state.hasPsdError}
                        onErrorClick={this.onErrorClickPsd}
                        onChange={this.onChangePsd}
                        value={this.state.loginPsd}
                    >密码</InputItem>
                    <InputItem
                        className="confirmInput"
                        {...getFieldProps('confirmpassword')}
                        type="password"
                        placeholder="请再次确认您的密码(限6~18个字符)"
                        maxLength={18}
                        clear
                        error={this.state.hasConfirmError}
                        onErrorClick={this.onErrorClickConfirm}
                        onChange={this.onChangeConfirm}
                        value={this.state.confirmPsd}
                    >确认密码</InputItem>
                </div>
                <div styleName="checkboxPart" onClick={()=>this.changeCheckbox()}>
                    {this.state.checkboxState ? <label className="iconfont icon-fangxingxuanzhongfill"></label> : <label className="iconfont icon-fangxingweixuanzhong"></label> }
                    <span>同意平台<a onClick={()=>this.props.goProtocol()}>服务协议</a></span>
                </div>
                <div styleName="register-btn" onClick={this.register}>注册</div>
                <p styleName="login" onClick={this.goLogin}>已有账号，去登录</p>
            </div>
        )
    }
}

signUpComponent.propTypes = {
    phoneNumber: PropTypes.string,
    messageCode: PropTypes.string,
    loginPsd: PropTypes.string,
    confirmPsd: PropTypes.string
}

const signUpComponentWrapper = createForm()(signUpComponent);
export default signUpComponentWrapper