import React, { Component } from 'react'
import PropTypes from 'prop-types'
import CSSModules from 'react-css-modules'
import style from './match.less'
import BottomTab from '../../layout/bottom-tab'
import { Grid } from 'antd-mobile'
import _ut from '../../libs/my-util'
import store from '../../store'
import { steamLogin } from '../../common'


@CSSModules(style)
class MatchComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            gridData: [
                { text: '我的库存' },
                { text: '收菜排行' },
                { text: '我的预测' },
                { text: '商城' }
            ],
            showSteamAlert: this.props.userSteamAlert,
            showUrlAlert: this.props.userUrlAlert,
        }
    }

    componentWillMount() {
        this.props.refreshUserInfo('', () => { return false })
    }

    goPage(el, index) {
        switch (index) {
            case 0:
                if (_ut.isEmpty(this.props.userInfos.SteamId)) {
                    this.setState({
                        showSteamAlert: true
                    })
                } else {
                    if (_ut.isEmpty(this.props.userInfos.SteamTradeUrl)) {
                        this.setState({
                            showUrlAlert: true
                        })
                    } else {
                        this.props.goInventoryPage();
                    }
                }
                break;
            case 1:
                this.props.goRankPage();
                break;
            case 2:
                this.props.goMyForecastPage();
                break;
            case 3:
                this.props.goShop();
                break;
        }
    }

    GridExample = () => (
        <div styleName="topMenu">
            <Grid
                data={this.state.gridData}
                hasLine={false}
                activeStyle={{ backgroundColor: "#2c2c32", "color": "#fff", fontSize: "3.2vw" }}
                onClick={(_el, index) => { this.goPage(_el, index) }}
            />
        </div>
    )

    closeAlert = () => {
        this.setState({
            showSteamAlert: false,
            showUrlAlert: false
        }, () => {
            store.dispatch({
                type: "USER_STEAM_ALERT",
                userSteamAlert: false,
                userUrlAlert: false
            })
        })
    }

    steamAlert = () => (<div styleName="steamAlert">
        <div styleName="inner">
            <div styleName="close">
                <p>绑定Steam账号</p>
                <span onClick={() => this.closeAlert()}>跳过</span>
            </div>
            <div styleName="prodInfo">
                <div>
                    <label></label>
                    <span className="iconfont icon-steamsquare"></span>
                    <span className="iconfont icon-jiaohuan1"></span>
                    <span className="iconfont icon-dota"></span>
                    <label></label>
                </div>
                <p>绑定Steam账号后才能继续库存操作</p>
            </div>
            <div styleName="btnPart">
                <span onClick={() => this.goBind()}>去绑定</span>
            </div>
        </div>
    </div>)

    goBind = () => {
        this.closeAlert()
        let ref = window.cordova.InAppBrowser.open(`${steamLogin}?userId=${this.props.userInfos.UserId}&mobile=${this.props.userInfos.Mobile}`, '_blank', 'location=no')
        //  cordova.InAppBrowser.open('http://apache.org', '_blank', 'location=yes');
        let InAppBrowserCallback = ()=>{
            alert('更新userInfo');
        }
        ref.addEventListener('exit', InAppBrowserCallback);

        //去绑定Steam
    }

    urlAlert = () => (<div styleName="steamAlert">
        <div styleName="inner">
            <div styleName="close">
                <p>设置交易URL</p>
                <span onClick={() => this.closeAlert()}>跳过</span>
            </div>
            <div styleName="prodInfo">
                <div>
                    <label></label>
                    <span className="iconfont icon-steamsquare"></span>
                    <span className="iconfont icon-jiaohuan1"></span>
                    <span className="iconfont icon-dota"></span>
                    <label></label>
                </div>
                <p>将完整的Steam交易URL复制到我的交易URL中</p>
            </div>
            <div styleName="btnPart">
                <span onClick={() => this.goSet()}>去设置</span>
            </div>
        </div>
    </div>)

    goSet = () => {
        this.closeAlert()
        this.props.goSteamSetting()
    }

    render() {
        return (
            <div styleName="wrap">
                {/* {this.GridExample()} */}
                <BottomTab goPage={(_el, index) => this.goPage(_el, index)} goMatchDetail={(id) => this.props.goMatchDetail(id)} showGameDetail={(id) => this.props.showGameDetail(id)} />

                {this.state.showSteamAlert ? this.steamAlert() : null}
                {this.state.showUrlAlert ? this.urlAlert() : null}

            </div>
        )
    }
}

MatchComponent.propTypes = {
    goInventoryPage: PropTypes.func,
    goRankPage: PropTypes.func,
    goMyForecastPage: PropTypes.func,
    goShop: PropTypes.func,
    goMatchDetail: PropTypes.func,
    showGameDetail: PropTypes.func
}

export default MatchComponent