import React, { Component } from 'react'
import PropTypes from 'prop-types'
import CSSModules from 'react-css-modules'
import style from './myForecast.less'

import { NavBar, Icon } from 'antd-mobile';

@CSSModules(style, { handleNotFoundStyleName: 'ignore' })
class myForecastComponent extends Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        this.props.initData()
    }

    render() {

        // const { getFieldProps, getFieldError } = this.props.form;
        console.log(this.props)
        return (
            <div styleName="wrap">
                <NavBar
                    mode="light"
                    icon={<Icon type="left" />}
                    onLeftClick={() => this.props.history.goBack()}
                >我的预测</NavBar>
                <div styleName="header">
                    <div styleName="head">
                        <p>今日收益</p>
                        <p styleName="num">0</p>
                    </div>
                    <div styleName="detail">
                        <div styleName="left">
                            <div styleName="top">
                                <div><p>本周收益</p>
                                    <p>0</p></div>
                                <div><p>本月收益</p>
                                    <p>0</p></div>
                            </div>
                            <div styleName="bottom">
                                <div><p>预测次数</p>
                                    <p>0</p></div>
                                <div><p>获胜次数</p>
                                    <p>0</p></div>
                            </div>
                        </div>
                        <div styleName="right">
                            <p>预测胜率</p>
                            <div styleName="rate">
                                <label styleName="inner">0%</label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

myForecastComponent.propTypes = {
    phoneNumber: PropTypes.string,
    verificationCode: PropTypes.string
}

export default myForecastComponent