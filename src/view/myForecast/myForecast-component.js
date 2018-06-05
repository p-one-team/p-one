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
            ]
        }
    }

    TabExample = (info) => {
        if(info){
            let historyList;
            
            if(info.BetDetails){
                historyList = (<div>
                    <div className="list_title">
                        <span>状态</span>
                        <span>比赛</span>
                        <span>队伍</span>
                        <span>收益</span>
                    </div>
                    <div className="list-item">
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>
                </div>)
            }else{
                historyList = (<div className="noRecord">暂无预测记录</div>)
            }

            return (<div>
                <div className="title_part">
                    <div>
                        <p>{info.GuessCount}</p>
                        <p>预测场次</p>
                    </div>
                    <div>
                        <p>{info.GuessWinRate}%</p>
                        <p>胜率</p>
                    </div>
                    <div>
                        <p>{info.GuessIncome}</p>
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
                    mode="light"
                    icon={<Icon type="left" />}
                    onLeftClick={() => this.props.history.goBack()}
                >我的预测</NavBar>

                <div styleName="header">
                    <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1524227131869&di=dcca65d33e7ce856a261f31c847ddf90&imgtype=0&src=http%3A%2F%2Fimgsrc.baidu.com%2Fforum%2Fw%253D580%2Fsign%3D7d86311748ed2e73fce98624b703a16d%2Fcb514fc2d5628535ae210cb292ef76c6a6ef6365.jpg"/>
                </div>

                <div styleName="tab_part">
                    <div styleName="tab_title">预测统计</div>

                    <Tabs tabs={this.state.tabs}
                        initialPage={1}
                        onTabClick={(tab) => { this.props.getGuessRecord({DayType: tab.sub, PageIndex: 0})}}
                    >

                        <div>
                            {this.TabExample(this.props.guessRecordWeek)}
                        </div>

                        <div>
                            {this.TabExample(this.props.guessRecordMonth)}
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