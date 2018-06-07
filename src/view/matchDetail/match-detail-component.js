import React, { Component } from 'react'
import PropTypes from 'prop-types'
import CSSModules from 'react-css-modules'
import style from './match-detail.less'
import { NavBar, Icon } from 'antd-mobile'
import { Tabs, WhiteSpace } from 'antd-mobile';
import { StickyContainer } from 'react-sticky';
import { Accordion } from 'antd-mobile';


@CSSModules(style, { handleNotFoundStyleName: 'ignore' })
class matchDetail extends Component {
    constructor(props) {
        super(props)

        this.props.getGuessList(this.props.gameItemId)

        this.state = {
            tabs: [
                { title: '饰品竞猜' },
                { title: 'T豆竞猜' },
                { title: '土豪榜' },
            ],
        }
    }

    userPart = (info,index) => (
        <div className="userImg">
            <span>{index}</span>
            {/* <img src={info.UserImage} alt="" /> */}
            <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1524227131869&di=dcca65d33e7ce856a261f31c847ddf90&imgtype=0&src=http%3A%2F%2Fimgsrc.baidu.com%2Fforum%2Fw%253D580%2Fsign%3D7d86311748ed2e73fce98624b703a16d%2Fcb514fc2d5628535ae210cb292ef76c6a6ef6365.jpg" alt="" />
            <span>{info.UserNickname}</span>
            {/* <div></div> */}
            {/* <div>{userInfo.userLevel}</div> */}
        </div>
    )

    guessList = (guessInfo) =>{
        if(guessInfo){
            return guessInfo.map((item,index)=>(
                <div key={index} className="guess_list">
                    <Accordion defaultActiveKey="0" className="my-accordion  bet-info" onChange={this.onChange}>
                        <Accordion.Panel header={this.userPart(item,index+1)} className="pad">
                            <div className="ornament_list">
                                {item.Ornaments.map((_item)=>(
                                    // <img key={_item.MarketHashName} src={_item.IconUrl} alt="" />
                                    <img key={_item.MarketHashName} src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1523812158978&di=6ebb2cffef7d33aa006e9125a0b37e2f&imgtype=0&src=http%3A%2F%2Fthumb.vpgame.com%2Fitem-7108.png" alt=""/>
                                ))}
                            </div>
                        </Accordion.Panel>
                    </Accordion>
                </div>
            ))
        }else{
            return ""
        }
    }

    tBeansList = (guessInfo) =>{
        if(guessInfo){
            return (<div className="beans_list">
                {guessInfo.map((item,index)=>(
                    <div key={index} className="inner">
                        <span>{index+1}</span>
                        {/* <img src={info.UserImage} alt="" /> */}
                        <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1524227131869&di=dcca65d33e7ce856a261f31c847ddf90&imgtype=0&src=http%3A%2F%2Fimgsrc.baidu.com%2Fforum%2Fw%253D580%2Fsign%3D7d86311748ed2e73fce98624b703a16d%2Fcb514fc2d5628535ae210cb292ef76c6a6ef6365.jpg" alt="" />
                        <span>{item.UserNickname}</span>
                        <label>{item.TBeans}T豆</label>
                    </div>
                ))}
            </div>) 
        }else{
            return ""
        }
    }

    TabExample = (ornamentInfo,tBeansInfo,tycoonInfo) => (
        <div className="userPart">
            <StickyContainer>
                <Tabs tabs={this.state.tabs}
                    initalPage={0}
                >
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#fff' }}>
                        {this.guessList(ornamentInfo.OrnamentsGuessOfGameItems)}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '250px', backgroundColor: '#fff' }}>
                        {this.tBeansList(tBeansInfo.BeansGuessOfGameItems)}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '250px', backgroundColor: '#fff' }}>
                        {this.guessList(tycoonInfo.GuessOfGameItems)}
                    </div>
                </Tabs>
            </StickyContainer>
            <WhiteSpace />
        </div>
    )

    render() {
        let gameItemInfos = this.props.gameItemInfos;

        return (
            <div styleName="wrap">
                <NavBar
                    icon={<Icon type="left" />}
                    onLeftClick={() => this.props.history.goBack()}
                    mode="dark"
                >比赛预测</NavBar>

                <div styleName="detailCard">
                    <div styleName="teamL">
                        <img src={gameItemInfos.GameTeam.LeftTeamImage} alt="" />
                        <p>{gameItemInfos.GameTeam.LeftTeamName}</p>
                    </div>
                    <div styleName="des">
                        <p>{gameItemInfos.GameItemTitle}</p>
                        <p>猜输赢</p>
                        <p>{gameItemInfos.IsForecast?"进行中":"已结算"}</p>
                    </div>
                    <div styleName="teamR">
                        <img src={gameItemInfos.GameTeam.RightTeamImage} alt="" />
                        <p>{gameItemInfos.GameTeam.RightTeamName}</p>
                    </div>
                </div>

                <div styleName="rateDes">
                    <p styleName="sub-tips"><span></span><label>谁将赢得此系列赛的胜利?</label></p>
                    <div styleName="rateLine1"><div></div></div>
                    <div styleName="rateBox">
                        <span>{gameItemInfos.GameTeam.LeftTeamName}</span>
                        <b>{gameItemInfos.GameTeam.LeftTeamOdds}</b>
                        <label>赔率</label>
                        <b>{gameItemInfos.GameTeam.RightTeamOdds}</b>
                        <span>{gameItemInfos.GameTeam.RightTeamName}</span>
                    </div>
                    <div styleName="rateLine2"><div></div></div>
                    <div styleName="show-info">
                        <span>{parseFloat(gameItemInfos.GameTeam.LeftTeamRate)}%</span>
                        <label>支持率</label>
                        <span>{parseFloat(gameItemInfos.GameTeam.RightTeamRate)}%</span>
                    </div>
                    <div styleName="progress">
                        <span style={{ width: parseFloat(gameItemInfos.GameTeam.LeftTeamRate)+"%" }}></span>
                        <label></label>
                        <b></b>
                        <label></label>
                        <span style={{ width: parseFloat(gameItemInfos.GameTeam.RightTeamRate)+"%" }}></span>
                    </div>
                    {gameItemInfos.IsForecast ? (<div styleName="forecastCanClick">预测</div>) : (<div styleName="forecast">预测</div>)}
                </div>

                <div styleName="rankList">
                    {this.TabExample(this.props.gameItemOrnamentsGuessInfo,this.props.gameItemTBeansGuessInfo,this.props.gameItemTycoonGuessInfo)}
                </div>

            </div>
        )
    }
}

matchDetail.propTypes = {
    getGuessList: PropTypes.func
}

export default matchDetail
