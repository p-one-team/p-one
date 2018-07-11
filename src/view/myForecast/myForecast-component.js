import React, { Component } from 'react'
import PropTypes from 'prop-types'
import CSSModules from 'react-css-modules'
import style from './myForecast.less'
import { NavBar, Icon, Tabs } from 'antd-mobile';


@CSSModules(style, { handleNotFoundStyleName: 'ignore' })
class myForecastComponent extends Component {
    constructor(props) {
        super(props)

        //初始获取本周
        this.props.getGuessRecord({
            DayType: 0,
            PageIndex: 0
        })

        this.state = {
            tabs: [
                { title: <div className="left">本周</div>, sub: 0 },
                { title: <div className="right">本月</div>, sub: 1 }
            ],
            pageIndex: 1,
            chosenTab: 0,
            guessInfo: {
                guessCount:0,
                guessIncome:0,
                guessWinRate:"0.0%",
            },
            weekList: [],
            isWeekMore: false,
            monthList: [],
            isMonthMore: false
        }
    }

    componentWillMount(){
        //初始获取本周
        this.props.getGuessRecord({
            DayType: 0,
            PageIndex: 1
        },()=>{
            this.setState({
                pageIndex: 1,
                chosenTab: 0,
                guessInfo: {
                    guessCount: this.props.guessRecordWeek.GuessCount,
                    guessIncome:this.props.guessRecordWeek.GuessIncome,
                    guessWinRate: this.props.guessRecordWeek.GuessWinRate
                },
                weekList: this.props.guessRecordWeek.BetDetails,
                isWeekMore: this.props.guessRecordWeek.IsMore
            })
        })
    }

    changeTab = (type) => {
        if(type == 0){
            this.props.getGuessRecord({
                DayType: 0,
                PageIndex: 1
            },()=>{
                this.setState({
                    pageIndex: 1,
                    chosenTab: 0,
                    guessInfo: {
                        guessCount: this.props.guessRecordWeek.GuessCount,
                        guessIncome:this.props.guessRecordWeek.GuessIncome,
                        guessWinRate: this.props.guessRecordWeek.GuessWinRate
                    },
                    weekList: this.props.guessRecordWeek.BetDetails,
                    isWeekMore: this.props.guessRecordWeek.IsMore
                })
            })
        }else if(type == 1){
            this.props.getGuessRecord({
                DayType: 1,
                PageIndex: 1
            },()=>{
                this.setState({
                    pageIndex: 1,
                    chosenTab: 1,
                    guessInfo: {
                        guessCount: this.props.guessRecordMonth.GuessCount,
                        guessIncome:this.props.guessRecordMonth.GuessIncome,
                        guessWinRate: this.props.guessRecordMonth.GuessWinRate
                    },
                    monthList: this.props.guessRecordMonth.BetDetails,
                    isMonthMore: this.props.guessRecordMonth.IsMore
                })
            })
        }

    }

    loadMoreFn = () => {
        if(this.state.chosenTab == 0){
            this.props.getGuessRecord({
                DayType: 0,
                PageIndex: this.state.pageIndex + 1,
            },()=>{
                this.setState({
                    pageIndex: this.state.pageIndex + 1,
                    weekList: this.state.weekList.concat(this.props.guessRecordWeek.BetDetails),
                    isWeekMore: this.props.guessRecordWeek.IsMore
                })
            })
        }else if(this.state.chosenTab == 1){
            this.props.getGuessRecord({
                DayType: 1,
                PageIndex: this.state.pageIndex + 1
            },()=>{
                this.setState({
                    pageIndex: this.state.pageIndex + 1,
                    monthList: this.state.monthList.concat(this.props.guessRecordMonth.BetDetails),
                    isMonthMore: this.props.guessRecordMonth.IsMore
                })
            })
        }

    }

    TabExample = (info,list,isMore) => {
        if(info){
            let historyList;
            
            if(list && list.length>0){
                historyList = (<div>
                    <div className="list_title">
                        <span>状态</span>
                        <span>比赛</span>
                        <span>队伍</span>
                        <span>收益</span>
                    </div>
                    {list.map((item,index) => (
                        <div key={index} className="list-item">
                            <div>
                                <p>{item.SettlementStatus}</p>
                                <p>{item.HandicapDate}</p>
                            </div>
                            <div>
                                <div>
                                    <img src={item.HostTeamImage}/>
                                    <label>VS</label>
                                    <img src={item.GuestTeamImage}/>
                                </div>
                                <p>{item.HandicapName}</p>
                            </div>
                            <div>
                                <div>
                                    <img src={item.BetTeamImage}/>
                                </div>
                                <p>{item.EstimatedEarning}</p>
                            </div>
                            <div>{item.SettlementAmount}</div>
                        </div>
                    ))}
                    {isMore ? <div className="loanMore" onClick={()=>this.loadMoreFn()}>点击加载更多</div> : <div className="loanMore">无更多</div>}
                </div>)
            }else{
                historyList = (<div className="noRecord">暂无预测记录</div>)
            }

            return (<div>
                <div className="title_part">
                    <div>
                        <p>{info.guessCount}</p>
                        <p>预测场次</p>
                    </div>
                    <div>
                        <p>{info.guessWinRate}</p>
                        <p>胜率</p>
                    </div>
                    <div>
                        <p>{info.guessIncome}</p>
                        <p>收益</p>
                    </div>
                </div>
                <div className="history">
                    <div className="history_title">预测历史</div>
                    {historyList}
                </div>
            </div>)

        }else{
            return ""
        }

    }

    render() {
        return (
            <div styleName="wrap">
                <NavBar
                    mode="dark"
                    icon={<Icon type="left" />}
                    onLeftClick={() => this.props.history.goBack()}
                >我的预测</NavBar>

                <div styleName="header">
                    <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1524227131869&di=dcca65d33e7ce856a261f31c847ddf90&imgtype=0&src=http%3A%2F%2Fimgsrc.baidu.com%2Fforum%2Fw%253D580%2Fsign%3D7d86311748ed2e73fce98624b703a16d%2Fcb514fc2d5628535ae210cb292ef76c6a6ef6365.jpg"/>
                </div>

                <div styleName="tab_part">
                    <div styleName="tab_title">预测统计</div>

                    <Tabs tabs={this.state.tabs}
                        initialPage={0}
                        onTabClick={(tab) => this.changeTab(tab.sub)}
                    >

                        <div>
                            {this.TabExample(this.state.guessInfo,this.state.weekList,this.state.isWeekMore)}
                        </div>

                        <div>
                            {this.TabExample(this.state.guessInfo,this.state.monthList,this.state.isMonthMore)}
                        </div>

                    </Tabs>
                </div>
            </div>
        )
    }
}

myForecastComponent.propTypes = {
    phoneNumber: PropTypes.string,
    verificationCode: PropTypes.string
}

export default myForecastComponent