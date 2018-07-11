import React, { Component } from 'react'
import PropTypes from 'prop-types'
import CSSModules from 'react-css-modules'
import style from './forecast.less'
import { NavBar, Icon } from 'antd-mobile'
import { Tabs, WhiteSpace } from 'antd-mobile';
import { StickyContainer } from 'react-sticky';
import InventoryItem from '../../layout/inventory-item'
import store from '../../store'
import _ut from '../../libs/my-util'
import AlertWindow from '../../module/mo-alertWindow';


@CSSModules(style, { handleNotFoundStyleName: 'ignore' })
class MatchForecastComponent extends Component {
    constructor(props) {
        super(props)

        store.dispatch({
            type: "DOTA_CHOSEN_FORECAST_INVENTORY",
            dotaChosenForecastInventory: []
        })

        this.props.getInventory({
            GameType: "570",
            DateSort: 0,
            PriceSort: 0,
            QualitySort: 0,
            RaritySort: 0
        })

        this.props.refreshUserInfo()

        this.state = {
            tabs: [
                { title: 'DOTA2预测',index:0 },
                { title: 'T豆预测',index:1 },
            ],
            canChoose: false,//是否可以选择队伍
            tbeanCount: 0, //输入的t豆个数
            tabChosen: 0, //选中哪个tab
        }
    }

    changeBtnPart = () => {
        if(this.props.dotaChosenForecastInventory.length>0){
            this.setState({
                canChoose: true
            })
        }else{
            this.setState({
                canChoose: false
            })
        }
    }

    ornamentForecast = (info) => {
        if(info.Ornaments){
            if(info.Ornaments && info.Ornaments.length == 0){
                return (<div styleName="ornament_part">
                    <p styleName="title">选择饰品</p>
                    <div styleName="imgPart">
                        <div styleName="goStore" onClick={()=>this.props.goStore()}>
                            <p className="iconfont icon-cart"></p>
                            <p>去商城购买</p>
                        </div>
                    </div>
                </div>)
            }else{
                return (<div styleName="ornament_part">
                    <p styleName="title">选择饰品</p>
                    <div styleName="imgPart">
                        <div styleName="goStore" onClick={()=>this.props.goStore()}>
                            <p className="iconfont icon-cart"></p>
                            <p>去商城购买</p>
                        </div>
                        {info.Ornaments.map((item,index)=>(
                            <InventoryItem
                                key={index}
                                itemInfo={item}
                                usageType="forecast"
                                changeBtn={this.changeBtnPart}
                            />
                        ))}
                    </div>
                </div>)
            }

        }else{
            return (<div styleName="ornament_part">
                <p styleName="title">选择饰品</p>
                <div styleName="imgPart">
                    <div styleName="goStore" onClick={()=>this.props.goStore()}>
                        <p className="iconfont icon-cart"></p>
                        <p>去商城购买</p>
                    </div>
                </div>
            </div>)
        }
    }

    tbeanChange = (event) => {
        if(_ut.isEmpty(event.target.value)||event.target.value==0){
            this.setState({
                tbeanCount: 0,
                canChoose: false
            })
        }else{
            this.setState({
                tbeanCount: parseInt(event.target.value),
                canChoose: true
            })
        }
        
    }

    chooseTBean = (num) => {
        if(num > this.props.userInfos.TBeansCount){
            AlertWindow.Prompt("您剩余的T豆余额不足"+num+"！",()=>{return false})
        }else{
            this.setState({
                tbeanCount: num
            })
        }
    }

    tBeanForecast = () => (
        <div styleName="tbean_part">
            <p styleName="my_tbean">我的剩余T豆：<span>{this.props.userInfos.TBeansCount}</span></p>
            <div styleName="forecast_tbean">
                <p>预测的T豆</p>
                <input type="tel" value={this.state.tbeanCount} onChange={this.tbeanChange.bind(this)} />
            </div>
            <div styleName="fast_choose">
                <span onClick={()=>this.chooseTBean(1000)}>1,000</span>
                <span onClick={()=>this.chooseTBean(5000)}>5,000</span>
                <span onClick={()=>this.chooseTBean(50000)}>50,000</span>
                <span onClick={()=>this.chooseTBean(100000)}>100,000</span>
                <span onClick={()=>this.chooseTBean(this.props.userInfos.TBeansCount)}>ALL IN</span>
            </div>
        </div>
    )

    changeTab = (index) => {
        if(index == 0){
            if(this.props.dotaChosenForecastInventory.length>0){
                this.setState({
                    tabChosen: 0,
                    canChoose: true
                })
            }else{
                this.setState({
                    tabChosen: 0,
                    canChoose: false
                })
            }
        }else{
            if(this.state.tbeanCount==0){
                this.setState({
                    tabChosen: 1,
                    canChoose: false
                })
            }else{
                this.setState({
                    tabChosen: 1,
                    canChoose: true
                })
            }
        }
    }

    TabExample = () => (
        <div>
            <StickyContainer>
                <Tabs tabs={this.state.tabs}
                    initalPage={0}
                    onTabClick={(tab)=>this.changeTab(tab.index)}
                >
                    <div>
                        {this.ornamentForecast(this.props.dotaInventory)}
                    </div>
                    <div>
                        {this.tBeanForecast()}
                    </div>
                </Tabs>
            </StickyContainer>
            <WhiteSpace />
        </div>
    )

    chooseTeam = (selectEdge,teamId) => {
        if(this.state.tabChosen==0){
            if(this.props.dotaChosenForecastInventory.length>0){
                this.props.ornamentForecast({
                    Ornaments: this.props.dotaChosenForecastInventory,
                    HandicapID: this.props.gameItemId,
                    SelectedEdge: selectEdge,
                    GameTeamID:teamId
                },()=>{
                    store.dispatch({
                        type: "DOTA_CHOSEN_FORECAST_INVENTORY",
                        dotaChosenForecastInventory: []
                    })
                    this.setState({
                        canChoose: false,
                        tbeanCount: 0
                    })
                    this.props.getInventory({
                        GameType: "570",
                        DateSort: 0,
                        PriceSort: 0,
                        QualitySort: 0,
                        RaritySort: 0
                    })
                })
            }else{
                AlertWindow.Prompt("请选择库存",()=>{return false})
            }

        }else{
            if(this.state.tbeanCount>0){
                this.props.tBeanForecast({
                    TBeans: this.state.tbeanCount,
                    HandicapID: this.props.gameItemId,
                    SelectedEdge: selectEdge,
                    GameTeamID:teamId
                },()=>{
                    store.dispatch({
                        type: "DOTA_CHOSEN_FORECAST_INVENTORY",
                        dotaChosenForecastInventory: []
                    })
                    this.setState({
                        canChoose: false,
                        tbeanCount: 0
                    })
                })
            }else{
                AlertWindow.Prompt("请输入预测的T豆数",()=>{return false})
            }
        }
    }

    render() {
        let gameItemInfos = this.props.gameItemInfos;
        return (
            <div styleName="wrap">
                <NavBar
                    icon={<Icon type="left" />}
                    onLeftClick={() => this.props.history.goBack()}
                    mode="dark"
                >比赛预测</NavBar>

                {this.state.canChoose
                ? (<div styleName="card">
                    <div styleName="canChooseL">
                        <p>{gameItemInfos.GameTeam.LeftTeamName}</p>
                        <p>价值：{gameItemInfos.GameTeam.LeftTeamOdds}</p>
                        <p>收益：0.00</p>
                        <div onClick={()=>this.chooseTeam(1,gameItemInfos.GameTeam.LeftTeamID)}>选择</div>
                    </div>
                    <div styleName="canChooseR">
                        <p>{gameItemInfos.GameTeam.RightTeamName}</p>
                        <p>价值：{gameItemInfos.GameTeam.RightTeamOdds}</p>
                        <p>收益：0.00</p>
                        <div onClick={()=>this.chooseTeam(2,gameItemInfos.GameTeam.RightTeamID)}>选择</div>
                    </div>
                </div>)
                : (<div styleName="card">
                    <div styleName="teamL">
                        <p>{gameItemInfos.GameTeam.LeftTeamName}</p>
                        <p>价值：{gameItemInfos.GameTeam.LeftTeamOdds}</p>
                        <p>收益：0.00</p>
                        <div>选择</div>
                    </div>
                    <div styleName="teamR">
                        <p>{gameItemInfos.GameTeam.RightTeamName}</p>
                        <p>价值：{gameItemInfos.GameTeam.RightTeamOdds}</p>
                        <p>收益：0.00</p>
                        <div>选择</div>
                    </div>
                </div>)}

                <div styleName="rankList">
                    {this.TabExample()}
                </div>

            </div>
        )
    }
}

MatchForecastComponent.propTypes = {
    getGuessList: PropTypes.func
}

export default MatchForecastComponent
