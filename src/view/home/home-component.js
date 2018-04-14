import React, { Component } from 'react'
import PropTypes from 'prop-types'
import CSSModules from 'react-css-modules'
import style from './home.less'
// import classnames from "classnames"

import { InputItem } from 'antd-mobile';
import { createForm } from 'rc-form';



@CSSModules(style, { handleNotFoundStyleName: 'ignore' })
class HomeComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            phoneNumber: '',
            verificationCode: '',
            mode:'password'
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
    goSign = () => {
        this.props.history.push('/signUp')
    }
    handleClick() {
        this.customFocusInst.focus();
    }

    changeMode = () => {
        this.state.mode=="password" ? this.setState({mode : "code"}) : this.setState({mode : "password"})
    }

    render() {
        // const {} = this.props
        const { getFieldProps } = this.props.form;
        // let errors;
        // const { getFieldProps, getFieldError } = this.props.form;
        console.log(this.props)
        return (
            <div styleName="wrap">
                <p styleName="logo">GT</p>
                <div styleName="main">
                    <InputItem
                        {...getFieldProps('phoneNumber')}
                        type="phone"
                        placeholder="请输入您的手机号"
                        clear
                    ></InputItem>
                    {
                        this.state.mode=='password'
                        ?
                        <InputItem
                            {...getFieldProps('password')}
                            type={'password'}
                            placeholder="请输入您的密码"
                            clear
                        ></InputItem>
                        :
                        <InputItem
                            {...getFieldProps('verificationCode')}
                            maxLength={4}
                            type={'digit'}
                            placeholder="请输入您的验证码"
                            clear
                        ></InputItem>
                        
                    }
                </div>

                { this.state.mode=="password" ? "" : <div styleName="getcode">获取验证码</div>}
                
                <div styleName="login-btn" onClick={this.submit}>登录</div>
                <div styleName="bottom">
                    { this.state.mode=="password"
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