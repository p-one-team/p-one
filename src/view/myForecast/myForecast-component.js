import React, { Component } from 'react'
import PropTypes from 'prop-types'
import CSSModules from 'react-css-modules'
import style from './myForecast.less'
import { NavBar, Icon, Tabs } from 'antd-mobile';


@CSSModules(style, { handleNotFoundStyleName: 'ignore' })
class myForecastComponent extends Component {
    constructor(props) {
        super(props)

        //初始获取本日
        this.props.getGuessRecord({
            DayType: 2,
            PageIndex: 1
        })

        this.state = {
            tabs: [
                { title: <div className="left">本日</div>, sub: 2 },
                { title: <div className="right">本周</div>, sub: 0 }
            ],
            pageIndex: 1,
            chosenTab: 2,
            guessInfo: {
                guessCount: 0,
                guessIncome: 0,
                guessWinRate: "0.0%",
            },
            weekList: [],
            isWeekMore: false,
            dayList: [],
            isDayMore: false
        }
    }

    componentWillMount() {
        //初始获取本日
        this.props.getGuessRecord({
            DayType: 2,
            PageIndex: 1
        }, () => {
            this.setState({
                pageIndex: 1,
                chosenTab: 2,
                guessInfo: {
                    guessCount: this.props.guessRecordDay.GuessCount,
                    guessIncome: this.props.guessRecordDay.GuessIncome,
                    guessWinRate: this.props.guessRecordDay.GuessWinRate
                },
                dayList: this.props.guessRecordDay.BetDetails,
                isDayMore: this.props.guessRecordDay.IsMore
            })
        })
    }

    changeTab = (type) => {
        if (type == 0) {//本周
            this.props.getGuessRecord({
                DayType: 0,
                PageIndex: 1
            }, () => {
                this.setState({
                    pageIndex: 1,
                    chosenTab: 0,
                    guessInfo: {
                        guessCount: this.props.guessRecordWeek.GuessCount,
                        guessIncome: this.props.guessRecordWeek.GuessIncome,
                        guessWinRate: this.props.guessRecordWeek.GuessWinRate
                    },
                    weekList: this.props.guessRecordWeek.BetDetails,
                    isWeekMore: this.props.guessRecordWeek.IsMore
                })
            })
        } else if (type == 2) { //本日
            this.props.getGuessRecord({
                DayType: 2,
                PageIndex: 1
            }, () => {
                this.setState({
                    pageIndex: 1,
                    chosenTab: 2,
                    guessInfo: {
                        guessCount: this.props.guessRecordDay.GuessCount,
                        guessIncome: this.props.guessRecordDay.GuessIncome,
                        guessWinRate: this.props.guessRecordDay.GuessWinRate
                    },
                    dayList: this.props.guessRecordDay.BetDetails,
                    isDayMore: this.props.guessRecordDay.IsMore
                })
            })
        }

    }

    loadMoreFn = () => {
        if (this.state.chosenTab == 0) {
            this.props.getGuessRecord({
                DayType: 0,
                PageIndex: this.state.pageIndex + 1,
            }, () => {
                this.setState({
                    pageIndex: this.state.pageIndex + 1,
                    weekList: this.state.weekList.concat(this.props.guessRecordWeek.BetDetails),
                    isWeekMore: this.props.guessRecordWeek.IsMore
                })
            })
        } else if (this.state.chosenTab == 2) {
            this.props.getGuessRecord({
                DayType: 2,
                PageIndex: this.state.pageIndex + 1
            }, () => {
                this.setState({
                    pageIndex: this.state.pageIndex + 1,
                    dayList: this.state.dayList.concat(this.props.guessRecordDay.BetDetails),
                    isDayMore: this.props.guessRecordDay.IsMore
                })
            })
        }

    }

    TabExample = (info, list, isMore) => {
        if (info) {
            let historyList;

            if (list && list.length > 0) {
                historyList = (<div>
                    <div className="list_title">
                        <span>状态</span>
                        <span>比赛</span>
                        <span>队伍</span>
                        <span>收益</span>
                    </div>
                    {list.map((item, index) => (
                        <div key={index} className="list-item">
                            <div>
                                <p>{item.SettlementStatus}</p>
                                <p>{item.HandicapDate}</p>
                            </div>
                            <div>
                                <div>
                                    <img src={item.HostTeamImage} />
                                    <label>VS</label>
                                    <img src={item.GuestTeamImage} />
                                </div>
                                <p>{item.HandicapName}</p>
                            </div>
                            <div>
                                <div>
                                    <img src={item.BetTeamImage} />
                                </div>
                                <p>{item.EstimatedEarning}</p>
                            </div>
                            <div>{item.SettlementAmount}</div>
                        </div>
                    ))}
                    {isMore ? <div className="loanMore" onClick={() => this.loadMoreFn()}>点击加载更多</div> : <div className="loanMore">无更多</div>}
                </div>)
            } else {
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

        } else {
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
                    <img src={this.props.userInfos.AvatarUrl} alt="" />
                </div>

                <div styleName="tab_part">
                    <div styleName="tab_title">预测统计</div>

                    <Tabs tabs={this.state.tabs}
                        initialPage={0}
                        onTabClick={(tab) => this.changeTab(tab.sub)}
                    >
                        <div>
                            {this.TabExample(this.state.guessInfo, this.state.dayList, this.state.isDayMore)}
                        </div>

                        <div>
                            {this.TabExample(this.state.guessInfo, this.state.weekList, this.state.isWeekMore)}
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