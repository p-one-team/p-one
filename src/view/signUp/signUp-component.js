import React, { Component } from 'react'
import PropTypes from 'prop-types'
import CSSModules from 'react-css-modules'
import style from './signUp.less'

import { InputItem, Button, WhiteSpace, Flex, Checkbox } from 'antd-mobile';
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

    loginBox = (getFieldProps) => (
        <div styleName="loginBox">
            <InputItem
                {...getFieldProps('phoneNumber')}
                type="phone"
                placeholder="1xx xxxx xxxx"
                clear
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
        </div>
    );


    componentDidMount() {
        this.props.initData()
    }

    submit = () => {
        this.props.form.validateFields((error, value) => {
            console.log(error, value);
        });
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
                <p styleName="title">GT</p>
                <loginBox />
                <div styleName="loginBox">
                    <InputItem
                        {...getFieldProps('phoneNumber')}
                        type="phone"
                        placeholder="1xx xxxx xxxx"
                        clear
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
                </div>

                <div styleName="signUp">
                    <InputItem
                        {...getFieldProps('phoneNumber')}
                        type="phone"
                        placeholder="1xx xxxx xxxx"
                        clear
                    >手机号码</InputItem>
                    <InputItem
                        {...getFieldProps('password')}
                        type={'password'}
                        clear
                    >密码</InputItem>
                    <InputItem
                        {...getFieldProps('password')}
                        type={'password'}
                        clear
                    >密码</InputItem>
                    <InputItem
                        {...getFieldProps('verificationCode')}
                        maxLength={4}
                        type={'digit'}
                        clear
                    >验证码</InputItem>
                    <WhiteSpace />
                    <Button type="primary" inline size="large" onClick={this.submit}>登录</Button>
                    <Flex>
                        <Flex.Item>
                            <AgreeItem data-seed="logId" onChange={e => console.log('checkbox', e)}>
                                Agree <a onClick={(e) => { e.preventDefault(); alert('agree it'); }}>agreement</a>
                            </AgreeItem>
                        </Flex.Item>
                    </Flex>
                </div>

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