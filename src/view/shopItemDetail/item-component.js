import React, { Component } from 'react'
import PropTypes from 'prop-types'
import CSSModules from 'react-css-modules'
import style from './item.less'
import { NavBar, Icon,Tabs } from 'antd-mobile';


@CSSModules(style, { handleNotFoundStyleName: 'ignore' })
class ShopItemDetailComponent extends Component {
    constructor(props) {
        super(props)

        //获取出售列表
        this.props.getRecords("1", this.props.shopItem.MarketHashName)

        this.state = {
            tabs: [
                { title: "出售", sub: '1' },
                { title: '求购', sub: '2' },
                { title: '成交记录', sub: '3' }
            ]
        }
    }

    publishSale = (count,price) => {
        this.props.publishBuySale({
            PublishType: 1,//出售
            MarketHashName: this.props.shopItem.MarketHashName,
            OrnamentPrice: price,
            OrnamentCount: count
        })
    }

    publishBuy = (count,price) => {
        this.props.publishBuySale({
            PublishType: 2,//求购
            MarketHashName: this.props.shopItem.MarketHashName,
            OrnamentPrice: price,
            OrnamentCount: count
        })
    }

    tabContent(type, tPrice, price, list){
        if(type == "sale"){
            if(list){
                return (<div>
                    <div styleName="evaluate">市场价：<span>{tPrice}</span><label>T豆&nbsp;({price})</label></div>
                    { list.length > 0
                    ? <div styleName="sellListPart">
                        <div styleName="title">
                            <span>商家</span><span>数量</span><span>价格(/件)</span>
                        </div>
                        {list.map((item,index) => (
                            <div styleName="list_item" key={index}>
                                <div>
                                    <img src={item.UserImage} />
                                    <span>{item.UserNickname}</span>
                                </div>
                                <div>{item.OrnamentCount}</div>
                                <div>
                                    <span>{item.OrnamentPrice}</span>
                                    <label onClick={()=>this.publishBuy(item.OrnamentCount,item.OrnamentPrice)}>购买</label>
                                </div>
                            </div>
                        ))}
                    </div>
                    : <div styleName="noInfo">暂无出售信息</div>}
                </div>)
            }else{
                return ""
            }

        }else if(type=="buy"){
            if(list){
                return (<div>
                    <div styleName="evaluate">系统估价：<span>{tPrice}</span><label>T豆&nbsp;({price})</label></div>
                    { list.length > 0
                    ? <div styleName="sellListPart">
                        <div styleName="title">
                            <span>商家</span><span>数量</span><span>价格(/件)</span>
                        </div>
                        {list.map((item,index) => (
                            <div  styleName="list_item" key={index}>
                                <div>
                                    {/* <img src={item.UserImage} /> */}
                                    <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1524227131869&di=dcca65d33e7ce856a261f31c847ddf90&imgtype=0&src=http%3A%2F%2Fimgsrc.baidu.com%2Fforum%2Fw%253D580%2Fsign%3D7d86311748ed2e73fce98624b703a16d%2Fcb514fc2d5628535ae210cb292ef76c6a6ef6365.jpg" />
                                    <span>{item.UserNickname}</span>
                                </div>
                                <div>{item.OrnamentCount}</div>
                                <div>
                                    <span>{item.OrnamentPrice}</span>
                                    <label onClick={()=>this.publishSale(item.OrnamentCount,item.OrnamentPrice)}>出售</label>
                                </div>
                            </div>
                        ))}
                    </div>
                    : <div styleName="noInfo">暂无求购信息</div>
                    }
                </div>)
            }else{
                return ""
            }
        }else{
            if(list){
                return (<div>
                    <div styleName="evaluate">系统估价：<span>{tPrice}</span><label>T豆&nbsp;({price})</label></div>
                    { list.length > 0 
                    ? <div styleName="recordPart">
                        <div styleName="title">
                            <span>玩家</span><span>操作</span><span>数量</span><span>价格(/件)</span><span>成交时间</span>
                        </div>
                        {list.map((item,index) => (
                            <div  styleName="list_item" key={index}>
                                <div>
                                    {/* <img src={item.UserImage} /> */}
                                    <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1524227131869&di=dcca65d33e7ce856a261f31c847ddf90&imgtype=0&src=http%3A%2F%2Fimgsrc.baidu.com%2Fforum%2Fw%253D580%2Fsign%3D7d86311748ed2e73fce98624b703a16d%2Fcb514fc2d5628535ae210cb292ef76c6a6ef6365.jpg" />
                                    <span>{item.UserNickname}</span>
                                </div>
                                <div>{item.TransactionType}</div>
                                <div>{item.TransactionCount}</div>
                                <div>{item.TransactionPrice}</div>
                                <div>{item.TransactionDate}</div>
                            </div>
                        ))}
                    </div>
                    : <div styleName="noInfo">暂无成交记录</div>
                    }
                </div>)
            }else{
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
                            {/* <img src={prodDetail.IconUrlLarge} alt="" /> */}
                            <img src={prodDetail.IconUrlLarge.indexOf("http:")>=0?prodDetail.IconUrlLarge.replace("http:","https:"):prodDetail.IconUrlLarge} alt="" />
                            {/* <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1526290768043&di=9596619bd7c62cb81c21dc87a4bf4108&imgtype=0&src=http%3A%2F%2Fthumb.vpgcdn.com%2Fcrop%2F360x240%2Fitem-16599.png" alt="" /> */}
                            <div>
                                <label>{prodDetail.Rarity}</label>
                                {/* <label>{data.special2}</label> */}
                            </div>
                        </div>
                    </div>
                    <div styleName="mainPart">
                        <Tabs tabs={this.state.tabs}
                            initialPage={0}
                            onTabClick={(tab) => { this.props.getRecords(tab.sub, prodDetail.MarketHashName)} }
                        >
                            <div styleName="listPart">
                                {this.tabContent("sale", prodDetail.TPrice, prodDetail.Price, this.props.saleRecordInfo.PublishRecords)}
                            </div>
                            <div styleName="listPart">
                                {this.tabContent("buy", prodDetail.TPrice, prodDetail.Price, this.props.buyRecordInfo.PublishRecords)}
                            </div>
                            <div styleName="listPart">
                                {this.tabContent("deal", prodDetail.TPrice, prodDetail.Price, this.props.dealRecordInfo.TransactionRecords)}
                            </div>
                        </Tabs>
                    </div>
                </div>
            </div>
        )
    }
}

ShopItemDetailComponent.propTypes = {
    phoneNumber: PropTypes.string,
    verificationCode: PropTypes.string
}

export default ShopItemDetailComponent