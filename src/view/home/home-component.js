import React, { Component } from 'react'
import PropTypes from 'prop-types'
import CSSModules from 'react-css-modules'
import style from './home.less'
// import classNames from 'classnames'

import { InputItem, Toast } from 'antd-mobile';
import { createForm } from 'rc-form';



@CSSModules(style, { handleNotFoundStyleName: 'ignore' })
class HomeComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            phoneNumber: '',
            verificationCode: '',
            hasError: false,
            Password: '',
            hasPsdError: '',
            SmsCode: '',
            mode: 'password'
        }

    }



    componentDidMount() {
        this.props.initData()
    }

    submit = () => {

        if (this.state.hasError || this.state.hasPsdError || this.state.phoneNumber.length == 0 || (this.state.Password.length == 0 && this.state.SmsCode.length == 0)) {
            Toast.info('请填写完整信息后登录!');
        } else {
            const phoneNum = this.state.phoneNumber.replace(/\s/g, '');
            this.props.login(phoneNum, this.state.Password, this.state.SmsCode, this.state.mode === 'code')
        }

        // this.props.form.validateFields((error, value) => {
        //     console.log(error, value);


        //     this.props.history.push('/match')
        // });
    }
    goSign = () => {
        this.props.history.push('/signUp')
    }
    handleClick() {
        this.customFocusInst.focus();
    }

    changeMode = () => {
        this.state.mode == "password" ? this.setState({ mode: "code" }) : this.setState({ mode: "password" })
    }

    //手机号相关
    onErrorClick = () => {
        if (this.state.hasError) {
            Toast.info('请输入11位手机号');
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

    render() {
        // const {} = this.props
        const { getFieldProps } = this.props.form;
        // let errors;
        // const { getFieldProps, getFieldError } = this.props.form;
        return (
            <div styleName="wrap">
                <p styleName="logo">GT</p>
                <div styleName="main">
                    <InputItem
                        {...getFieldProps('phoneNumber')}
                        type="phone"
                        placeholder="请输入您的手机号"
                        clear
                        error={this.state.hasError}
                        onErrorClick={this.onErrorClick}
                        onChange={this.onChange}
                        value={this.state.phoneNumber}
                    ></InputItem>
                    {
                        this.state.mode == 'password'
                            ?
                            <InputItem
                                {...getFieldProps('password')}
                                type={'password'}
                                placeholder="请输入您的密码"
                                error={this.state.hasErrorPSD}
                                onErrorClick={this.onErrorClickPSD}
                                onChange={this.onChangePSD}
                                value={this.state.Password}
                                clear
                            ></InputItem>
                            :
                            <InputItem
                                {...getFieldProps('verificationCode')}
                                maxLength={4}
                                type={'number'}
                                placeholder="请输入您的验证码"
                                clear
                            ></InputItem>

                    }
                </div>

                {this.state.mode == "password" ? "" : <div styleName="getcode">获取验证码</div>}

                <div styleName="login-btn" onClick={this.submit}>登录</div>
                <div styleName="bottom">
                    {this.state.mode == "password"
                        ? <span onClick={this.changeMode}>验证码登录</span>
                        : <span onClick={this.changeMode}>密码登录</span>
                    }
                    <span styleName="register" onClick={this.goSign}>立即注册</span>
                </div>
            </div>
        )
    }
}

HomeComponent.propTypes = {
    phoneNumber: PropTypes.string,
    verificationCode: PropTypes.string
}

const HomeComponentWrapper = createForm()(HomeComponent);
export default HomeComponentWrapper