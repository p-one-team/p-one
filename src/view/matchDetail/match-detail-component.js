import React, { Component } from 'react'
import PropTypes from 'prop-types'
import CSSModules from 'react-css-modules'
import style from './match-detail.less'
import { NavBar, Icon } from 'antd-mobile'
import { Progress } from 'antd-mobile';
import { Tabs, WhiteSpace } from 'antd-mobile';
import { StickyContainer, Sticky } from 'react-sticky';
import { Accordion } from 'antd-mobile';


function renderTabBar(props) {
    return (<Sticky>
        {({ style }) => <div style={{ ...style, zIndex: 1 }}><Tabs.DefaultTabBar {...props} /></div>}
    </Sticky>);
}
const tabs = [
    { title: '饰品预测' },
    { title: 'P豆预测' },
    { title: '土豪榜' },
];

const data = {
    team1: {
        name: "team1 name",
        icon: "https://zos.alipayobjects.com/rmsportal/dKbkpPXKfvZzWCM.png"
    },
    team2: {
        name: "team2 name",
        icon: "https://zos.alipayobjects.com/rmsportal/dKbkpPXKfvZzWCM.png"
    },
    gameName: "Meet hotel",
    title: '猜输赢',
    Odds: {
        teamL: 0.25,
        teamR: 3.65
    },
    gameStatus: "03", //01未开始可预测 02进行中 03已结清
    winner: "",
    statusDesc: "已结算"
}

const userInfo = {
    userName: "username",
    userImg: "http://img4.duitang.com/uploads/item/201511/26/20151126112617_vUaQf.jpeg",
    userLevel: "LV 3",
    imgList: [
        "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1523812158978&di=6ebb2cffef7d33aa006e9125a0b37e2f&imgtype=0&src=http%3A%2F%2Fthumb.vpgame.com%2Fitem-7108.png",
        "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1523812158978&di=6ebb2cffef7d33aa006e9125a0b37e2f&imgtype=0&src=http%3A%2F%2Fthumb.vpgame.com%2Fitem-7108.png",
        "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1523812158978&di=6ebb2cffef7d33aa006e9125a0b37e2f&imgtype=0&src=http%3A%2F%2Fthumb.vpgame.com%2Fitem-7108.png"
    ]
}

const rowHead = () =>
    (<div className="userImg">
        <span>1</span>
        <img src={userInfo.userImg} alt=""/>
        <span>{userInfo.userName}</span>
        <label>{userInfo.userLevel}</label>
    </div>
    )

const TabExample = () => (
    <div className="userPart">
        <StickyContainer>
            <Tabs tabs={tabs}
                initalPage={'t2'}
                renderTabBar={renderTabBar}
            >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#fff' }}>
                    <Accordion defaultActiveKey="0" className="my-accordion  bet-info" onChange={this.onChange}>
                        <Accordion.Panel header={rowHead()} className="pad">
                            <div className="userImgList">
                                <img src={userInfo.imgList[0]} alt="" />
                                <img src={userInfo.imgList[1]} alt="" />
                                <img src={userInfo.imgList[2]} alt="" />
                            </div>

                        </Accordion.Panel>
                    </Accordion>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '250px', backgroundColor: '#fff' }}>
                    Content of second tab
          </div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '250px', backgroundColor: '#fff' }}>
                    Content of third tab
          </div>
            </Tabs>
        </StickyContainer>
        <WhiteSpace />
    </div>)

@CSSModules(style, { handleNotFoundStyleName: 'ignore' })
class matchDetail extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <div styleName="wrap">
                <NavBar
                    icon={<Icon type="left" />}
                    onLeftClick={() => console.log('onLeftClick')}
                    mode="dark"
                >比赛预测</NavBar>

                <div styleName="detailCard">
                    <div styleName="teamL">
                        <img src={data.team1.icon} alt=""/>
                        <p>{data.team1.name}</p>
                    </div>
                    <div styleName="des">
                        <p>{data.gameName}</p>
                        <p>{data.title}</p>
                        <p>{data.statusDesc}</p>
                    </div>
                    <div styleName="teamR">
                        <img src={data.team2.icon} alt=""/>
                        <p>{data.team2.name}</p>
                    </div>
                </div>

                <div styleName="rateDes">
                    <p styleName="sub-tips">谁将赢得此系列赛的胜利?</p>
                    <div styleName="rateBox">
                        <div>赔率</div>
                        <div>0.28</div>
                        <div>3.26</div>
                        <div>赔率</div>
                    </div>
                    <div styleName="show-info">
                        <div aria-hidden="true">40%</div>
                        <div styleName="progress"><Progress percent={50} position="normal" /></div>
                        <div aria-hidden="true">50%</div>
                    </div>
                </div>

                <div styleName="rankList">
                    <TabExample />
                </div>

            </div>
        )
    }
}

matchDetail.propTypes = {
    goBack: PropTypes.func
}

export default matchDetail
