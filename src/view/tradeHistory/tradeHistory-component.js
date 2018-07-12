import React, { Component } from 'react'
import PropTypes from 'prop-types'
import CSSModules from 'react-css-modules'
import style from './history.less'

import { NavBar, Icon } from 'antd-mobile';


@CSSModules(style, { handleNotFoundStyleName: 'ignore' })
class TradeHistoryComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            startDate: this.props.myHistoryStart,
            endDate: this.props.myHistoryEnd
        }
    }

    queryTrans = (tradeList) => {
        if(tradeList && tradeList.length>0){
            return (<div>
                <div styleName="title">
                    <label>时间</label>
                    <label>操作</label>
                    <label>数量</label>
                    <label>T豆</label>
                    <label>交易状态</label>
                </div>
                <ul>
                    {tradeList.map((item,index) => (
                        <li key={index}>
                            <label>{item.TransactionDate}</label>
                            <label>{item.TransactionContent}</label>
                            <label>{item.TransactionCount}</label>
                            <label>{item.TransactionAmount}</label>
                            <label>{item.TransactionStatus}</label>
                        </li>
                    ))}
                </ul>
            </div>)
        }else{
            return (<div styleName="noRecords">该时段无交易记录</div>)
        }
    }

    start = (event) => {
        this.setState({
            startDate: event.target.value
        })
    }

    end = (event) => {
        this.setState({
            endDate: event.target.value
        })
    }

    render() {
        let tradeInfo = this.props.myTransactionInfo
        let tradeList = this.props.myTransactionHistory

        return (
            <div styleName="wrap">
                <NavBar
                    mode="dark"
                    icon={<Icon type="left" />}
                    onLeftClick={() => this.props.history.goBack()}
                >我的交易</NavBar>

                <div>
                    <div styleName="headCard">
                        <div styleName="wallet">
                            <p>{tradeInfo.StockCount}/{tradeInfo.TBeanCount}</p>
                            <p>我的库存和T豆</p>
                        </div>
                        <div styleName="total">
                            <div>
                                <p>{tradeInfo.Cost}</p>
                                <p>累计花费（T豆）</p>
                            </div>
                            <div>
                                <p>{tradeInfo.Income}</p>
                                <p>累计收益（T豆）</p>
                            </div>
                        </div>
                    </div>
                    <div className={style.tips + ' ' + style.proD}>
                        <div>
                            <p>{tradeInfo.OnSaleCount}</p>
                            <p>在售</p>
                        </div>
                        <div>
                            <p>{tradeInfo.SoldCount}</p>
                            <p>已售</p>
                        </div>
                        <div>
                            <p>{tradeInfo.BuyCount}</p>
                            <p>购买</p>
                        </div>
                        <div>
                            <p>{tradeInfo.WantBuyCount}</p>
                            <p>求购</p>
                        </div>
                    </div>

                    <div styleName="listPart">
                        <p styleName="recent_deal">查询交易<span>(填写日期，如：20180101至20180214)</span></p>

                        <div styleName="chooseDate">
                            <input placeholder="开始日期" type="text" value={this.state.startDate} onChange={this.start.bind(this)} />
                            <label>至</label>
                            <input placeholder="结束日期" type="text" value={this.state.endDate} onChange={this.end.bind(this)} />
                            <span onClick={()=>this.props.queryRecord(this.state.startDate, this.state.endDate)}>查询</span>
                        </div>

                        {this.queryTrans(tradeList)}
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