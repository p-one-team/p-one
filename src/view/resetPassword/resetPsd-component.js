import React, { Component } from 'react'
import PropTypes from 'prop-types'
import CSSModules from 'react-css-modules'
import style from './password.less'

import { List, InputItem, Toast, NavBar, Icon } from 'antd-mobile';
import { createForm } from 'rc-form';



@CSSModules(style, { handleNotFoundStyleName: 'ignore' })
class resetPsdComponent extends Component {
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
        }
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
        if (this.state.hasPhoneError || this.state.phoneNumber.length == 0){
            Toast.info('请正确填写注册手机号码');
            return false
        }

        this.props.getCode({
            phone: this.state.phoneNumber.replace(/\s/g, '')
        })
    }

    //注册
    reset = () => {
        if (this.state.hasPhoneError || this.state.phoneNumber.length == 0){
            Toast.info('请正确填写注册手机号码');
            return false
        }

        if(this.state.hasCodeError || this.state.messageCode.length == 0){
            Toast.info('请正确填写验证码!');
            return false
        }

        if(this.state.hasPsdError || this.state.loginPsd.length == 0){
            Toast.info('请正确填写登录密码!');
            return false
        }

        if(this.state.hasConfirmError || this.state.confirmPsd.length == 0){
            Toast.info('请正确确认登录密码!');
            return false
        }

        this.props.resetPsd({
            Phone: this.state.phoneNumber.replace(/\s/g, ''),
            SmsCode: this.state.messageCode,
            Password: this.state.loginPsd,
            ConfirmPassword: this.state.confirmPsd
        })
    }

    render() {
        const { getFieldProps } = this.props.form;

        return (
            <div styleName="wrap">
                <NavBar
                    mode="dark"
                    icon={<Icon type="left" />}
                    onLeftClick={() => this.props.history.goBack()}
                >{this.props.isForgetPsd?"忘记密码":"重置密码"}</NavBar>

                <div styleName="main">
                    <List>
                        <InputItem
                            {...getFieldProps('phoneNum')}
                            type="phone"
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
                        <div style={{clear:"both"}}></div>
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
                    </List>
                </div>
                <div styleName="reset-btn" onClick={this.reset}>确认重置</div>
            </div>
        )
    }
}

resetPsdComponent.propTypes = {
    phoneNumber: PropTypes.string,
    messageCode: PropTypes.string,
    loginPsd: PropTypes.string,
    confirmPsd: PropTypes.string
}

const resetPsdComponentWrapper = createForm()(resetPsdComponent);
export default resetPsdComponentWrapper