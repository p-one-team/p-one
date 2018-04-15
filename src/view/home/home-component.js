import React, { Component } from 'react'
import PropTypes from 'prop-types'
import CSSModules from 'react-css-modules'
import style from './home.less'
// import classNames from 'classnames'

import { InputItem, Button, WhiteSpace } from 'antd-mobile';
import { createForm } from 'rc-form';



@CSSModules(style, { handleNotFoundStyleName: 'ignore' })
class HomeComponent extends Component {
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

            this.props.history.push('/match')
        });
    }
    goSign = () => {
        this.props.history.push('/signUp')
    }
    handleClick() {
        this.customFocusInst.focus();
    }
    render() {
        // const {} = this.props
        const { getFieldProps } = this.props.form;
        // let errors;
        // const { getFieldProps, getFieldError } = this.props.form;
        console.log(this.props)
        return (
            <div styleName="wrap">
                <p styleName="title">GT</p>
                <div styleName="loginBox">
                    <InputItem
                        {...getFieldProps('phoneNumber')}
                        type="phone"
                        placeholder="1xx xxxx xxxx"
                        clear
                        prefixListCls='test'
                    >手机号码</InputItem>
                    <InputItem
                        {...getFieldProps('verificationCode')}
                        maxLength={4}
                        type={'digit'}
                        clear
                    >验证码</InputItem>
                    <InputItem
                        {...getFieldProps('password')}
                        type={'password'}
                        clear
                    >密码</InputItem>

                    <WhiteSpace />
                    <Button type="primary" inline size="large" onClick={this.submit}>登录</Button>
                    <Button type="primary" inline size="large" onClick={this.goSign}>注册</Button>
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