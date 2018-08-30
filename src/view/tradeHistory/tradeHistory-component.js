import React, { Component } from 'react'
import PropTypes from 'prop-types'
import CSSModules from 'react-css-modules'
import style from './history.less'

import { NavBar, Icon } from 'antd-mobile';


@CSSModules(style, { handleNotFoundStyleName: 'ignore' })
class TradeHistoryComponent extends Component {
    constructor(props) {
        super(props)

        this.props.getMyPublishRecords(1)

        this.state = {
            startDate: this.props.myHistoryStart,
            endDate: this.props.myHistoryEnd,
            isLeftChosen: true
        }
    }

    queryTrans = (type,list) => {
        if(list && list.length>0){
            return (<div>
                <div styleName="title">
                    <label>时间</label>
                    <label>饰品名称</label>
                    <label>数量</label>
                    <label>价格</label>
                    <label>操作</label>
                </div>
                <ul>
                    {list.map((item,index) => {
                        let lastBtn;
                        if(type==1){
                            if(item.AllowCancel){
                                lastBtn = (<label styleName="cancelBtn" onClick={()=>this.props.cancelOrnamentSale(item.PublishID)}>取消出售</label>)
                            }else{
                                if(item.Status==1){
                                    lastBtn = (<label>新建出售</label>)
                                }else if(item.Status==2){
                                    lastBtn = (<label>部分出售</label>)
                                }else if(item.Status==3){
                                    lastBtn = (<label>出售成功</label>)
                                }else if(item.Status==4){
                                    lastBtn = (<label>已取消出售</label>)
                                }
                            }
                        }else if(type==2){
                            if(item.AllowCancel){
                                lastBtn = (<label styleName="cancelBtn" onClick={()=>this.props.cancelOrnamentSale(item.PublishID)}>取消求购</label>)
                            }else{
                                if(item.Status==1){
                                    lastBtn = (<label>新建求购</label>)
                                }else if(item.Status==2){
                                    lastBtn = (<label>部分求购</label>)
                                }else if(item.Status==3){
                                    lastBtn = (<label>求购成功</label>)
                                }else if(item.Status==4){
                                    lastBtn = (<label>已取消求购</label>)
                                }
                            }
                        }
                        
                        return (<li key={index}>
                            <label>{item.Time}</label>
                            <label>{item.Name}</label>
                            <label>{item.OrnamentCount}</label>
                            <label>{item.OrnamentPrice}</label>
                            {lastBtn}
                        </li>)
                    })}
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

    getRecords = (type) => {
        this.props.getMyPublishRecords(type,()=>{
            this.setState({
                isLeftChosen: type==1 ? true : false
            })
        })
    }

    render() {
        let tradeInfo = this.props.myTransactionInfo

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
                        {/* <p styleName="recent_deal">查询交易<span>(填写日期，如：20180101至20180214)</span></p>

                        <div styleName="chooseDate">
                            <input placeholder="开始日期" type="text" value={this.state.startDate} onChange={this.start.bind(this)} />
                            <label>至</label>
                            <input placeholder="结束日期" type="text" value={this.state.endDate} onChange={this.end.bind(this)} />
                            <span onClick={()=>this.props.getMyPublishRecords(this.state.startDate, this.state.endDate)}>查询</span>
                        </div> */}

                        {this.state.isLeftChosen ? <div styleName="publishBtn">
                            <span styleName="chosen" onClick={()=>this.getRecords(1)}>出售记录</span>
                            <span onClick={()=>this.getRecords(2)}>求购记录</span>
                        </div> : <div styleName="publishBtn">
                            <span onClick={()=>this.getRecords(1)}>出售记录</span>
                            <span styleName="chosen" onClick={()=>this.getRecords(2)}>求购记录</span>
                        </div> }
                        

                        {this.queryTrans(this.props.recordPublishType,this.props.myPublishRecordsList)}
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