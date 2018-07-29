import React, { Component } from 'react'
import PropTypes from 'prop-types'
import CSSModules from 'react-css-modules'
import style from './item.less'
import { NavBar, Icon, Tabs } from 'antd-mobile';
import AlertWindow from '../../module/mo-alertWindow'


@CSSModules(style, { handleNotFoundStyleName: 'ignore' })
class ShopItemDetailComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            tabs: [
                { title: "出售", sub: 1 },
                { title: '求购', sub: 2 },
                { title: '成交记录', sub: 3 }
            ],
            pageIndex: 1,
            chosenTab: 1,
            saleList: [],
            isSaleMore: false,
            buyList: [],
            isBuyMore: false,
            dealList: [],
            isDealMore: false,
            isTransactionAlertShow: false,
            transactionInfo: {},
            transactionCount: 0,
            totalPrice: 0
        }
    }

    componentWillMount() {
        this.props.getSaleRecords({
            MarketHashName: this.props.shopItem.MarketHashName,
            PageIndex: 1
        }, () => {
            this.setState({
                pageIndex: 1,
                chosenTab: 1,
                saleList: this.props.saleRecordInfo.PublishRecords,
                isSaleMore: this.props.saleRecordInfo.IsMore
            })
        })
    }

    changeTab = (sub) => {
        if (sub == 1) {
            this.props.getSaleRecords({
                MarketHashName: this.props.shopItem.MarketHashName,
                PageIndex: 1
            }, () => {
                this.setState({
                    pageIndex: 1,
                    chosenTab: 1,
                    saleList: this.props.saleRecordInfo.PublishRecords,
                    isSaleMore: this.props.saleRecordInfo.IsMore
                })
            })
        } else if (sub == 2) {
            this.props.getBuyRecords({
                MarketHashName: this.props.shopItem.MarketHashName,
                PageIndex: 1
            }, () => {
                this.setState({
                    pageIndex: 1,
                    chosenTab: 2,
                    buyList: this.props.buyRecordInfo.PublishRecords,
                    isBuyMore: this.props.buyRecordInfo.IsMore
                })
            })
        } else if (sub == 3) {
            this.props.getDealRecords({
                MarketHashName: this.props.shopItem.MarketHashName,
                PageIndex: 1
            }, () => {
                this.setState({
                    pageIndex: 1,
                    chosenTab: 3,
                    dealList: this.props.dealRecordInfo.TransactionRecords,
                    isDealMore: this.props.dealRecordInfo.IsMore
                })
            })
        }

    }

    loadMoreFn = () => {
        if (this.state.chosenTab == 1) {
            this.props.getSaleRecords({
                MarketHashName: this.props.shopItem.MarketHashName,
                PageIndex: this.state.pageIndex + 1
            }, () => {
                this.setState({
                    pageIndex: this.state.pageIndex + 1,
                    saleList: this.state.saleList.concat(this.props.saleRecordInfo.PublishRecords),
                    isSaleMore: this.props.saleRecordInfo.IsMore
                })
            })
        } else if (this.state.chosenTab == 2) {
            this.props.getBuyRecords({
                MarketHashName: this.props.shopItem.MarketHashName,
                PageIndex: this.state.pageIndex + 1
            }, () => {
                this.setState({
                    pageIndex: this.state.pageIndex + 1,
                    buyList: this.state.buyList.concat(this.props.buyRecordInfo.PublishRecords),
                    isBuyMore: this.props.buyRecordInfo.IsMore
                })
            })
        } else if (this.state.chosenTab == 3) {
            this.props.getDealRecords({
                MarketHashName: this.props.shopItem.MarketHashName,
                PageIndex: this.state.pageIndex + 1
            }, () => {
                this.setState({
                    pageIndex: this.state.pageIndex + 1,
                    dealList: this.state.dealList.concat(this.props.dealRecordInfo.TransactionRecords),
                    isDealMore: this.props.dealRecordInfo.IsMore
                })
            })
        }
    }

    showTransactionAlert = (type, id, price, count) => {
        this.props.refreshUserInfo('', () => {
            this.setState({
                isTransactionAlertShow: true,
                transactionInfo: {
                    type: type,
                    id: id,
                    price: price,
                    count: count
                },
                transactionCount: 1,
                totalPrice: price
            })
        })
    }

    closeTransactionAlert = () => {
        this.setState({
            isTransactionAlertShow: false,
            transactionInfo: {}
        })
    }

    onChange = (event) => {
        this.setState({
            transactionCount: event.target.value,
            totalPrice: this.state.transactionInfo.price * event.target.value
        })
    }

    transactionAlert = () => (<div styleName="transactionAlert">
        {this.state.transactionInfo.type == "sale"
            ? (<div styleName="inner">
                <div styleName="close">
                    <span className="iconfont icon-guanbi" onClick={() => this.closeTransactionAlert()}></span>
                </div>
                <div styleName="price">
                    <span>物品单价</span>
                    <label>{this.state.transactionInfo.price} T豆</label>
                </div>
                <div styleName="count">
                    <span>出售件数(库存{this.state.transactionInfo.count}件)</span>
                    <input type="tel" value={this.state.transactionCount} onChange={this.onChange.bind(this)} />
                </div>
                <div styleName="total">
                    <span>订单总额</span>
                    <label>{this.state.totalPrice} T豆</label>
                </div>
                <div styleName="btn" onClick={() => this.saleBuyFn()}>出售</div>
            </div>)

            : (<div styleName="inner">
                <div styleName="close">
                    <span className="iconfont icon-guanbi" onClick={() => this.closeTransactionAlert()}></span>
                </div>
                <div styleName="price">
                    <span>物品单价</span>
                    <label>{this.state.transactionInfo.price} T豆</label>
                </div>
                <div styleName="count">
                    <span>购买件数(库存{this.state.transactionInfo.count}件)</span>
                    <input type="tel" value={this.state.transactionCount} onChange={this.onChange.bind(this)} />
                </div>
                <div styleName="tbean">
                    <span>T豆余额</span>
                    <label>{this.props.userInfos.TBeansCount} T豆</label>
                </div>
                <div styleName="total">
                    <span>订单总额</span>
                    <label>{this.state.totalPrice} T豆</label>
                </div>
                <div styleName="btn" onClick={() => this.saleBuyFn()}>购买</div>
            </div>)}
    </div>)


    saleBuyFn = () => {
        if (parseInt(this.state.transactionCount) > parseInt(this.state.transactionInfo.count)) {
            AlertWindow.Prompt("您输入的交易数量超过库存", () => {
                return false
            })
        } else {
            this.props.mallTransaction({
                PublishRecordID: this.state.transactionInfo.id,
                TransactionCount: parseInt(this.state.transactionCount)
            }, () => {
                this.changeTab(this.state.chosenTab)
            })
        }
    }

    tabContent(tPrice, price, list, isMore) {
        if (this.state.chosenTab == 1) {
            if (list) {
                return (<div>
                    <div styleName="evaluate">市场价：<span>{tPrice}</span><label>T豆&nbsp;({price})</label></div>
                    {list.length > 0
                        ? <div styleName="sellListPart">
                            <div styleName="title">
                                <span>商家</span><span>数量</span><span>价格(/件)</span>
                            </div>
                            {list.map((item, index) => (
                                <div styleName="list_item" key={index}>
                                    <div>
                                        <img src={item.UserImage} />
                                        {/* <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1524227131869&di=dcca65d33e7ce856a261f31c847ddf90&imgtype=0&src=http%3A%2F%2Fimgsrc.baidu.com%2Fforum%2Fw%253D580%2Fsign%3D7d86311748ed2e73fce98624b703a16d%2Fcb514fc2d5628535ae210cb292ef76c6a6ef6365.jpg" /> */}
                                        <span>{item.UserNickname}</span>
                                    </div>
                                    <div>{item.OrnamentCount}</div>
                                    <div>
                                        <span>{item.OrnamentPrice}</span>
                                        <label onClick={() => this.showTransactionAlert("buy", item.PublishID, item.OrnamentPrice, item.OrnamentCount)}>购买</label>
                                    </div>
                                </div>
                            ))}
                            {isMore ? <div styleName="loadMore" onClick={() => this.loadMoreFn()}>点击加载更多</div> : <div styleName="loadMore">无更多</div>}
                        </div>
                        : <div styleName="noInfo">暂无出售信息</div>}
                </div>)
            } else {
                return ""
            }

        } else if (this.state.chosenTab == 2) {
            if (list) {
                return (<div>
                    <div styleName="evaluate">系统估价：<span>{tPrice}</span><label>T豆&nbsp;({price})</label></div>
                    {list.length > 0
                        ? <div styleName="sellListPart">
                            <div styleName="title">
                                <span>商家</span><span>数量</span><span>价格(/件)</span>
                            </div>
                            {list.map((item, index) => (
                                <div styleName="list_item" key={index}>
                                    <div>
                                        <img src={item.UserImage} />
                                        {/* <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1524227131869&di=dcca65d33e7ce856a261f31c847ddf90&imgtype=0&src=http%3A%2F%2Fimgsrc.baidu.com%2Fforum%2Fw%253D580%2Fsign%3D7d86311748ed2e73fce98624b703a16d%2Fcb514fc2d5628535ae210cb292ef76c6a6ef6365.jpg" /> */}
                                        <span>{item.UserNickname}</span>
                                    </div>
                                    <div>{item.OrnamentCount}</div>
                                    <div>
                                        <span>{item.OrnamentPrice}</span>
                                        <label onClick={() => this.showTransactionAlert("sale", item.PublishID, item.OrnamentPrice, item.OrnamentCount)}>出售</label>
                                    </div>
                                </div>
                            ))}
                            {isMore ? <div styleName="loadMore" onClick={() => this.loadMoreFn()}>点击加载更多</div> : <div styleName="loadMore">无更多</div>}
                        </div>
                        : <div styleName="noInfo">暂无求购信息</div>
                    }
                </div>)
            } else {
                return ""
            }
        } else if (this.state.chosenTab == 3) {
            if (list) {
                return (<div>
                    <div styleName="evaluate">系统估价：<span>{tPrice}</span><label>T豆&nbsp;({price})</label></div>
                    {list.length > 0
                        ? <div styleName="recordPart">
                            <div styleName="title">
                                <span>玩家</span><span>操作</span><span>数量</span><span>价格(/件)</span><span>成交时间</span>
                            </div>
                            {list.map((item, index) => (
                                <div styleName="list_item" key={index}>
                                    <div>
                                        <img src={item.UserImage} />
                                        {/* <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1524227131869&di=dcca65d33e7ce856a261f31c847ddf90&imgtype=0&src=http%3A%2F%2Fimgsrc.baidu.com%2Fforum%2Fw%253D580%2Fsign%3D7d86311748ed2e73fce98624b703a16d%2Fcb514fc2d5628535ae210cb292ef76c6a6ef6365.jpg" /> */}
                                        <span>{item.UserNickname}</span>
                                    </div>
                                    <div>{item.TransactionType}</div>
                                    <div>{item.TransactionCount}</div>
                                    <div>{item.TransactionPrice}</div>
                                    <div>{item.TransactionDate}</div>
                                </div>
                            ))}
                            {isMore ? <div styleName="loadMore" onClick={() => this.loadMoreFn()}>点击加载更多</div> : <div styleName="loadMore">无更多</div>}
                        </div>
                        : <div styleName="noInfo">暂无成交记录</div>
                    }
                </div>)
            } else {
                return ""
            }
        }
    }

    render() {

        let prodDetail = this.props.shopItem;

        return (
            <div styleName="wrap">
                <NavBar
                    mode="dark"
                    icon={<Icon type="left" />}
                    onLeftClick={() => this.props.history.goBack()}
                >{prodDetail.Name}</NavBar>

                <div className="container">
                    <div styleName="head-card">
                        {/* <p>槽位：<span>{data.slotPosition}</span>&nbsp;&nbsp;使用英雄：<span>{data.hero}</span></p> */}
                        <p>允许预测</p>
                        <div styleName="imgPart">
                            <img src={prodDetail.IconUrlLarge} alt="" />
                            <div>
                                <label>{prodDetail.Rarity}</label>
                                {/* <label>{data.special2}</label> */}
                            </div>
                        </div>
                    </div>
                    <div styleName="mainPart">
                        <Tabs tabs={this.state.tabs}
                            initialPage={0}
                            onTabClick={(tab) => this.changeTab(tab.sub)}
                        >
                            <div styleName="listPart">
                                {this.tabContent(prodDetail.TPrice, prodDetail.Price, this.state.saleList, this.state.isSaleMore)}
                            </div>
                            <div styleName="listPart">
                                {this.tabContent(prodDetail.TPrice, prodDetail.Price, this.state.buyList, this.state.isBuyMore)}
                            </div>
                            <div styleName="listPart">
                                {this.tabContent(prodDetail.TPrice, prodDetail.Price, this.state.dealList, this.state.isDealMore)}
                            </div>
                        </Tabs>
                    </div>
                </div>

                {this.state.isTransactionAlertShow ? this.transactionAlert() : null}

            </div>
        )
    }
}

ShopItemDetailComponent.propTypes = {
    phoneNumber: PropTypes.string,
    verificationCode: PropTypes.string
}

export default ShopItemDetailComponent