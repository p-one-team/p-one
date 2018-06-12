import React, { Component } from 'react'
import PropTypes from 'prop-types'
import CSSModules from 'react-css-modules'
import style from './forecast.less'
import { NavBar, Icon } from 'antd-mobile'
import { Tabs, WhiteSpace } from 'antd-mobile';
import { StickyContainer } from 'react-sticky';


@CSSModules(style, { handleNotFoundStyleName: 'ignore' })
class MatchForecastComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            tabs: [
                { title: 'DOTA2预测' },
                { title: 'T豆预测' },
            ],
            canChoose: true
        }
    }

    TabExample = () => (
        <div>
            <StickyContainer>
                <Tabs tabs={this.state.tabs}
                    initalPage={0}
                >
                    <div>
                        {/* {this.guessList(ornamentInfo.OrnamentsGuessOfGameItems)} */}
                    </div>
                    <div>
                        {/* {this.tBeansList(tBeansInfo.BeansGuessOfGameItems)} */}
                    </div>
                    <div>
                        {/* {this.guessList(tycoonInfo.GuessOfGameItems)} */}
                    </div>
                </Tabs>
            </StickyContainer>
            <WhiteSpace />
        </div>
    )

    chooseTeam = (num) => {
        console.log(num)
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

                <div styleName="card">
                    {this.state.canChoose
                    ? (<div styleName="canChoose" onClick={()=>this.chooseTeam(1)}>
                        <div>
                            <span>选择</span>
                            <span>{gameItemInfos.GameTeam.LeftTeamName}</span>
                        </div>
                        <p>价值：0.00</p>
                        <p>收益：0.00</p>
                    </div>)
                    : (<div styleName="team">
                        <div>
                            <span>选择</span>
                            <span>{gameItemInfos.GameTeam.LeftTeamName}</span>
                        </div>
                        <p>价值：0.00</p>
                        <p>收益：0.00</p>
                    </div>)}
                    {this.state.canChoose
                    ? (<div styleName="canChoose" onClick={()=>this.chooseTeam(2)}>
                        <div>
                            <span>选择</span>
                            <span>{gameItemInfos.GameTeam.RightTeamName}</span>
                        </div>
                        <p>价值：0.00</p>
                        <p>收益：0.00</p>
                    </div>)
                    : (<div styleName="team">
                        <div>
                            <span>选择</span>
                            <span>{gameItemInfos.GameTeam.RightTeamName}</span>
                        </div>
                        <p>价值：0.00</p>
                        <p>收益：0.00</p>
                    </div>)}
                </div>

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
