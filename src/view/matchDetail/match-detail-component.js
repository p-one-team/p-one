import React, { Component } from 'react'
import PropTypes from 'prop-types'
import CSSModules from 'react-css-modules'
import style from './match-detail.less'
import { NavBar, Icon } from 'antd-mobile'
// import { Progress } from 'antd-mobile';
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
        name: "EHOME",
        icon: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1524217691703&di=8dc6d07e85bdbcbe504acafe523055fb&imgtype=0&src=http%3A%2F%2Fi1.hdslb.com%2Fbfs%2Farchive%2F080a5890b0341879a1fff8cbca0bff826102cadb.jpg"
    },
    team2: {
        name: "LDG",
        icon: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1524217774744&di=4c7adb6185187106c398ff5780d47bb6&imgtype=0&src=http%3A%2F%2Fupload.techweb.com.cn%2F2016%2F0115%2F1452822932280.png"
    },
    gameName: "Meet hotel",
    title: '猜输赢',
    Odds: {
        teamL: 0.25,
        teamR: 3.65
    },
    supportRate: {
        teamL: 0.65,
        teamR: 0.35
    },
    gameStatus: "03", //01未开始可预测 02进行中 03已结清
    winner: "",
    statusDesc: "已结算"
}

const userInfo = {
    userName: "username",
    userImg: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1524227131869&di=dcca65d33e7ce856a261f31c847ddf90&imgtype=0&src=http%3A%2F%2Fimgsrc.baidu.com%2Fforum%2Fw%253D580%2Fsign%3D7d86311748ed2e73fce98624b703a16d%2Fcb514fc2d5628535ae210cb292ef76c6a6ef6365.jpg",
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
        <div></div>
        <div>{userInfo.userLevel}</div>
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
                    <p styleName="sub-tips"><span></span><label>谁将赢得此系列赛的胜利?</label></p>
                    <div styleName="rateLine1"><div></div></div>
                    <div styleName="rateBox">
                        <span>{data.team1.name}</span>
                        <b>{data.Odds.teamL}</b>
                        <label>赔率</label>
                        <b>{data.Odds.teamR}</b>
                        <span>{data.team2.name}</span>
                    </div>
                    <div styleName="rateLine2"><div></div></div>
                    <div styleName="show-info">
                        <span>{Number(data.supportRate.teamL)*100}%</span>
                        <label>支持率</label>
                        {/* <Progress percent={Number(data.supportRate.teamL)*100} position="normal" /> */}
                        <span>{Number(data.supportRate.teamR)*100}%</span>
                    </div>
                    <div styleName="progress">
                        <span style={{width:'65%'}}></span>
                        <label></label>
                        <b></b>
                        <label></label>
                        <span style={{width:'35%'}}></span>
                    </div>
                    <div styleName="forecast">预测</div>
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
