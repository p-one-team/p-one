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
                        <div styleName="total">
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

                    <div styleName="listPart">
                        <p styleName="recent_deal">近期交易</p>
                        <div styleName="title">
                            <label>时间</label>
                            <label>操作</label>
                            <label>饰品</label>
                            <label>件数</label>
                            <label>价格</label>
                            <label>交易状态</label>
                        </div>
                        <ul>
                            <li>
                                <label>2018-01-01</label>
                                <label>买入</label>
                                <label>aSDFADSFF</label>
                                <label>1</label>
                                <label>500.00</label>
                                <label>成功</label>
                            </li>
                            <li>
                                <label>2018-01-01</label>
                                <label>买入</label>
                                <label>aSDFADSFF</label>
                                <label>1</label>
                                <label>500.00</label>
                                <label>成功</label>
                            </li>
                            <li>
                                <label>2018-01-01</label>
                                <label>买入</label>
                                <label>aSDFADSFF</label>
                                <label>1</label>
                                <label>500.00</label>
                                <label>成功</label>
                            </li>
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