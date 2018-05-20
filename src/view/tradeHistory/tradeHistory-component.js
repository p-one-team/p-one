import React, { Component } from 'react'
import PropTypes from 'prop-types'
import CSSModules from 'react-css-modules'
import style from './history.less'

import { NavBar, Icon } from 'antd-mobile';


@CSSModules(style, { handleNotFoundStyleName: 'ignore' })
class TradeHistoryComponent extends Component {
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
                >我的交易</NavBar>

                <div>
                    <div styleName="headCard">
                        <div styleName="wallet">
                            <p>30</p>
                            <p>我的金币</p>
                        </div>
                        <div>
                            <div>
                                <p>0</p>
                                <p>累计消费</p>
                            </div>
                            <div>
                                <p>0</p>
                                <p>累计收益</p>
                            </div>
                        </div>
                    </div>
                    <div className={style.tips + ' ' + style.proD}>
                        <div>
                            <p>0</p>
                            <p>在售</p>
                        </div>
                        <div>
                            <p>0</p>
                            <p>已售</p>
                        </div>
                        <div>
                            <p>0</p>
                            <p>购买</p>
                        </div>
                        <div>
                            <p>0</p>
                            <p>求购</p>
                        </div>
                    </div>
                    <div className={style.tips + ' ' + style.cards}>
                        <div>
                            <i className="iconfont icon-sale"></i>
                            <p>我的出售</p>
                        </div>
                        <div>
                            <i className="iconfont icon-goumai"></i>
                            <p>我的购买</p>
                        </div>
                        <div>
                            <i className="iconfont icon-iconwishlist"></i>
                            <p>我的求购</p>
                        </div>

                    </div>

                    <div>
                        <p >近期交易</p>
                        <p styleName="title">
                            <lable>时间</lable>
                            <lable>操作</lable>
                            <lable>饰品</lable>
                            <lable>件数</lable>
                            <lable>价格</lable>
                            <lable>交易状态</lable>
                        </p>
                        <ul>
                            <li>
                                <lable>2018-01-01</lable>
                                <lable>买入</lable>
                                <lable>aSDFADSFF</lable>
                                <lable>1</lable>
                                <lable>500.00</lable>
                                <lable>成功</lable>
                            </li>
                            <li></li>
                            <li></li>
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
}

TradeHistoryComponent.propTypes = {
    phoneNumber: PropTypes.string,
    verificationCode: PropTypes.string
}

export default TradeHistoryComponent