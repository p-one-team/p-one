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

        this.state = {
            tabs: [
                { title: '饰品竞猜',sub: 1 },
                { title: 'T豆竞猜',sub: 2 },
                { title: '土豪榜',sub: 3 },
            ],
            chosenTab: 1,
            pageIndex: 1,
            ornamentsGuessList: [],
            isOrnamentsMore: false,
            tbeansGuessList: [],
            isTbeansMore: false,
            tycoonGuessList: [],
            isTycoonMore: false
        }
    }

    componentWillMount(){
        this.props.getOrnamentsGuessList({
            HandicapID: this.props.gameItemId,
            PageIndex: 1
        },()=>{
            this.setState({
                pageIndex: 1,
                chosenTab: 1,
                ornamentsGuessList: this.props.gameItemOrnamentsGuessInfo.OrnamentsGuessOfGameItems,
                isOrnamentsMore: this.props.gameItemOrnamentsGuessInfo.IsMore,
            })
        })
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

    guessList = (guessInfo,isMore) =>{
        if(guessInfo && guessInfo.length > 0){
            return (<div>
                {guessInfo.map((item,index)=>(
                    <div key={index} className="guess_list">
                        <Accordion defaultActiveKey="0" className="my-accordion  bet-info" onChange={this.onChange}>
                            <Accordion.Panel header={this.userPart(item,index+1)} className="pad">
                                <div className="ornament_list">
                                    {item.Ornaments.map((_item,_index)=>(
                                        <img key={_index} src={_item.IconUrl.indexOf("https")>=0 ? _item.IconUrl : "https://steamcommunity-a.akamaihd.net/economy/image/"+_item.IconUrl} alt=""/>
                                    ))}
                                </div>
                            </Accordion.Panel>
                        </Accordion>
                    </div>
                ))}
                {isMore ? <div className="loadMore" onClick={()=>this.loadMoreFn()}>点击加载更多</div> : <div className="loadMore">无更多</div>}
            </div>)
        }else{
            return (<div className="noRecords">暂无记录</div>)
        }
    }

    tBeansList = (guessInfo,isMore) =>{
        if(guessInfo && guessInfo.length > 0){
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
                {isMore ? <div className="loadMore" onClick={()=>this.loadMoreFn()}>点击加载更多</div> : <div className="loadMore">无更多</div>}
            </div>) 
        }else{
            return (<div className="noRecords">暂无记录</div>)
        }
    }

    loadMoreFn = () => {
        if(this.state.chosenTab == 1){
            this.props.getOrnamentsGuessList({
                HandicapID: this.props.gameItemId,
                PageIndex: this.state.pageIndex + 1
            },()=>{
                this.setState({
                    pageIndex: this.state.pageIndex + 1,
                    ornamentsGuessList: this.state.ornamentsGuessList.concat(this.props.gameItemOrnamentsGuessInfo.OrnamentsGuessOfGameItems),
                    isOrnamentsMore: this.props.gameItemOrnamentsGuessInfo.IsMore,
                })
            })
        }else if(this.state.chosenTab == 2){
            this.props.getTBeansGuessList({
                HandicapID: this.props.gameItemId,
                PageIndex: this.state.pageIndex + 1
            },()=>{
                this.setState({
                    pageIndex: this.state.pageIndex + 1,
                    tbeansGuessList: this.state.tbeansGuessList.concat(this.props.gameItemTBeansGuessInfo.BeansGuessOfGameItems),
                    isTbeansMore: this.props.gameItemTBeansGuessInfo.IsMore,
                })
            })
        }else if(this.state.chosenTab == 3){
            this.props.getTycoonGuessList({
                HandicapID: this.props.gameItemId,
                PageIndex: this.state.pageIndex + 1
            },()=>{
                this.setState({
                    pageIndex: this.state.pageIndex + 1,
                    tycoonGuessList: this.state.tycoonGuessList.concat(this.props.gameItemTycoonGuessInfo.GuessOfGameItems),
                    isTycoonMore: this.props.gameItemTycoonGuessInfo.IsMore,
                })
            })
        }
    }

    changeTab = (sub) => {
        if(sub == 1){
            this.props.getOrnamentsGuessList({
                HandicapID: this.props.gameItemId,
                PageIndex: 1
            },()=>{
                this.setState({
                    pageIndex: 1,
                    chosenTab: sub,
                    ornamentsGuessList: this.props.gameItemOrnamentsGuessInfo.OrnamentsGuessOfGameItems,
                    isOrnamentsMore: this.props.gameItemOrnamentsGuessInfo.IsMore,
                })
            })
        }else if(sub == 2){
            this.props.getTBeansGuessList({
                HandicapID: this.props.gameItemId,
                PageIndex: 1
            },()=>{
                this.setState({
                    pageIndex: 1,
                    chosenTab: sub,
                    tbeansGuessList: this.props.gameItemTBeansGuessInfo.BeansGuessOfGameItems,
                    isTbeansMore: this.props.gameItemTBeansGuessInfo.IsMore,
                })
            })
        }else if(sub == 3){
            this.props.getTycoonGuessList({
                HandicapID: this.props.gameItemId,
                PageIndex: 1
            },()=>{
                this.setState({
                    pageIndex: 1,
                    chosenTab: sub,
                    tycoonGuessList: this.props.gameItemTycoonGuessInfo.GuessOfGameItems,
                    isTycoonMore: this.props.gameItemTycoonGuessInfo.IsMore,
                })
            })
        }
    }

    TabExample = () => (
        <div className="userPart">
            <StickyContainer>
                <Tabs tabs={this.state.tabs}
                    initalPage={0}
                    onTabClick={(tab)=>this.changeTab(tab.sub)}
                >
                    <div>
                        {this.guessList(this.state.ornamentsGuessList,this.state.isOrnamentsMore)}
                    </div>
                    <div>
                        {this.tBeansList(this.state.tbeansGuessList,this.state.isTbeansMore)}
                    </div>
                    <div>
                        {this.guessList(this.state.tycoonGuessList,this.state.isTycoonMore)}
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
                    {gameItemInfos.IsForecast ? (<div styleName="forecastCanClick" onClick={()=>this.props.goForecast()}>预测</div>) : (<div styleName="forecast">预测</div>)}
                </div>

                <div styleName="rankList">
                    {this.TabExample()}
                </div>

            </div>
        )
    }
}

matchDetail.propTypes = {
    getGuessList: PropTypes.func
}

export default matchDetail
