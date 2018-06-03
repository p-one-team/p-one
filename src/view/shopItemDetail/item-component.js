import React, { Component } from 'react'
import PropTypes from 'prop-types'
import CSSModules from 'react-css-modules'
import style from './item.less'

import { NavBar, Icon,Tabs } from 'antd-mobile';

const tabsInfo = [
    { title: "出售", sub: '1' },
    { title: '求购', sub: '2' },
    { title: '成交记录', sub: '3' }
]


@CSSModules(style, { handleNotFoundStyleName: 'ignore' })
class ShopItemDetailComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            prodInfo: {
                id: this.props.match.params.itemId,
                name: "烬爵披肩",
                imgUrl: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1526290768043&di=9596619bd7c62cb81c21dc87a4bf4108&imgtype=0&src=http%3A%2F%2Fthumb.vpgcdn.com%2Fcrop%2F360x240%2Fitem-16599.png",
                slotPosition: "杂项",//槽位
                hero: "斧王",//使用英雄
                special1: "不朽",
                special2: "标准",
                evaluation: 4150,
                evaluateRate: 0.85
            },
            sellList: [
                {
                    index: 1,
                    userImg: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1524227131869&di=dcca65d33e7ce856a261f31c847ddf90&imgtype=0&src=http%3A%2F%2Fimgsrc.baidu.com%2Fforum%2Fw%253D580%2Fsign%3D7d86311748ed2e73fce98624b703a16d%2Fcb514fc2d5628535ae210cb292ef76c6a6ef6365.jpg",
                    userName: "Rover",
                    pieceNum: 10,
                    price: 4410
                },
                {
                    index: 2,
                    userImg: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1524227131869&di=dcca65d33e7ce856a261f31c847ddf90&imgtype=0&src=http%3A%2F%2Fimgsrc.baidu.com%2Fforum%2Fw%253D580%2Fsign%3D7d86311748ed2e73fce98624b703a16d%2Fcb514fc2d5628535ae210cb292ef76c6a6ef6365.jpg",
                    userName: "Blue",
                    pieceNum: 120,
                    price: 4450
                }
            ],
            forBuyList: [
                {
                    index: 1,
                    userImg: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1524227131869&di=dcca65d33e7ce856a261f31c847ddf90&imgtype=0&src=http%3A%2F%2Fimgsrc.baidu.com%2Fforum%2Fw%253D580%2Fsign%3D7d86311748ed2e73fce98624b703a16d%2Fcb514fc2d5628535ae210cb292ef76c6a6ef6365.jpg",
                    userName: "哈哈",
                    pieceNum: 10,
                    price: 4410
                },
                {
                    index: 2,
                    userImg: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1524227131869&di=dcca65d33e7ce856a261f31c847ddf90&imgtype=0&src=http%3A%2F%2Fimgsrc.baidu.com%2Fforum%2Fw%253D580%2Fsign%3D7d86311748ed2e73fce98624b703a16d%2Fcb514fc2d5628535ae210cb292ef76c6a6ef6365.jpg",
                    userName: "嘻嘻",
                    pieceNum: 120,
                    price: 4450
                }
            ],
            dealRecordList: [
                {
                    index: 1,
                    userImg: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1524227131869&di=dcca65d33e7ce856a261f31c847ddf90&imgtype=0&src=http%3A%2F%2Fimgsrc.baidu.com%2Fforum%2Fw%253D580%2Fsign%3D7d86311748ed2e73fce98624b703a16d%2Fcb514fc2d5628535ae210cb292ef76c6a6ef6365.jpg",
                    userName: "皮皮",
                    pieceNum: 10,
                    price: 4410,
                    operation: "购买",
                    time: "1分钟前"
                },
                {
                    index: 2,
                    userImg: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1524227131869&di=dcca65d33e7ce856a261f31c847ddf90&imgtype=0&src=http%3A%2F%2Fimgsrc.baidu.com%2Fforum%2Fw%253D580%2Fsign%3D7d86311748ed2e73fce98624b703a16d%2Fcb514fc2d5628535ae210cb292ef76c6a6ef6365.jpg",
                    userName: "皮蛋",
                    pieceNum: 120,
                    price: 4450,
                    operation: "求购",
                    time: "30分钟前"
                }
            ]
        }

    }

    componentDidMount() {
        this.props.initData()
    }

    tabContent(type,tPrice,price,list){

        let content;
        if(type=="sellList"){
            let listDetail1 = list.map((item)=>{
                return (
                    <div  styleName="list_item" key={item.index}>
                        <div>
                            <img src={item.userImg} />
                            <span>{item.userName}</span>
                        </div>
                        <div>x{item.pieceNum}</div>
                        <div>
                            <span>{item.price}P/件</span>
                            <label>购买</label>
                        </div>
                    </div>
                )
            })

            content = (
                <div styleName="sellListPart">
                    <div styleName="title">
                        <span>商家</span><span>件数</span><span>价格</span>
                    </div>
                    {listDetail1}
                </div>
            )
        }else if(type=="forBuyList"){
            let listDetail1 = list.map((item)=>{
                return (
                    <div  styleName="list_item" key={item.index}>
                        <div>
                            <img src={item.userImg} />
                            <span>{item.userName}</span>
                        </div>
                        <div>x{item.pieceNum}</div>
                        <div>
                            <span>{item.price}P/件</span>
                            <label>出售</label>
                        </div>
                    </div>
                )
            })

            content = (
                <div styleName="sellListPart">
                    <div styleName="title">
                        <span>商家</span><span>件数</span><span>价格</span>
                    </div>
                    {listDetail1}
                </div>
            )
        }else{
            let listDetail3 = list.map((item)=>{
                return (
                    <div  styleName="list_item" key={item.index}>
                        <div>
                            <img src={item.userImg} />
                            <span>{item.userName}</span>
                        </div>
                        <div>{item.operation}</div>
                        <div>{item.pieceNum}</div>
                        <div>{item.price}P/件</div>
                        <div>{item.time}</div>
                    </div>
                )
            })

            content = (
                <div styleName="recordPart">
                    <div styleName="title">
                        <span>玩家</span><span>操作</span><span>件数</span><span>价格</span><span>成交时间</span>
                    </div>
                    {listDetail3}
                </div>
            )
        }

        return (
            <div>
                <div styleName="evaluate">系统估价：<span>{tPrice}</span><label>T豆&nbsp;({price})</label></div>
                {content}
            </div>
        )
    }


    render() {

        let prodDetail = this.props.shopItem;
        return (
            <div styleName="wrap">
                <NavBar
                    mode="light"
                    icon={<Icon type="left" />}
                    onLeftClick={() => this.props.history.goBack()}
                >{prodDetail.Name}</NavBar>

                <div className="container">
                    <div styleName="head-card">
                        {/* <p>槽位：<span>{data.slotPosition}</span>&nbsp;&nbsp;使用英雄：<span>{data.hero}</span></p> */}
                        <p>允许预测</p>
                        <div styleName="imgPart">
                            <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1526290768043&di=9596619bd7c62cb81c21dc87a4bf4108&imgtype=0&src=http%3A%2F%2Fthumb.vpgcdn.com%2Fcrop%2F360x240%2Fitem-16599.png" alt="" />
                            <div>
                                <label>{prodDetail.Rarity}</label>
                                {/* <label>{data.special2}</label> */}
                            </div>
                        </div>
                    </div>
                    <div styleName="mainPart">
                        <Tabs tabs={tabsInfo}
                            initialPage={1}
                            onChange={(tab, index) => { console.log('onChange', index, tab); }}
                            onTabClick={(tab, index) => { console.log('onTabClick', index, tab); }}
                        >
                            <div styleName="listPart">
                                {this.tabContent("sellList", prodDetail.TPrice,prodDetail.Price, this.state.sellList)}
                            </div>
                            <div styleName="listPart">
                                {this.tabContent("forBuyList", prodDetail.TPrice,prodDetail.Price, this.state.forBuyList)}
                            </div>
                            <div styleName="listPart">
                                {this.tabContent("dealRecordList", prodDetail.TPrice,prodDetail.Price, this.state.dealRecordList)}
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