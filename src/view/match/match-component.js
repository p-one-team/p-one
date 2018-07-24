import React, { Component } from 'react'
import PropTypes from 'prop-types'
import CSSModules from 'react-css-modules'
import style from './match.less'
import BottomTab from '../../layout/bottom-tab'
import { Grid } from 'antd-mobile'
import _ut from '../../libs/my-util'


@CSSModules(style)
class MatchComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            gridData: [
                {text: '我的库存'},
                {text: '收菜排行'},
                {text: '我的预测'},
                {text: '商城'}
            ],
            showAlert: _ut.isEmpty(this.props.userInfos.SteamId)&&_ut.isEmpty(this.props.userInfos.SteamTradeUrl) ? true : false
        }
    }

    goPage(el, index) {
        switch (index) {
            case 0:
                this.props.goInventoryPage();
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
                activeStyle={{backgroundColor:"#2c2c32","color":"#fff",fontSize:"3.2vw"}}
                onClick={(_el, index) => { this.goPage(_el, index) }} 
            />
        </div>
    )

    closeAlert = () => {
        this.setState({
            showAlert: false
        })
    }

    goSetting = () => {
        if(!_ut.isEmpty(this.props.userInfos.SteamId) && _ut.isEmpty(this.props.userInfos.SteamTradeUrl)){
            this.props.goSteamSetting()
        }
    }

    steamAlert = () => (<div styleName="steamAlert">
        <div styleName="inner">
            <div styleName="close">
                <label>饰品竞猜准备</label>
                <span onClick={()=>this.closeAlert()}>取消</span>
            </div>
            <div styleName="prodInfo">
                <div styleName="item">
                    <div styleName="detail">
                        <p>公开Steam库存</p>
                        <p>将Steam个人资料状态和库存两项设置为“公开”</p>
                    </div>
                    <div styleName="btn" onClick={()=>this.closeAlert()}>去公开</div>
                </div>
                <div styleName="item">
                    <div styleName="detail">
                        <p>设置交易URL</p>
                        <p>将完整的Steam交易URL复制到我的交易URL中</p>
                    </div>
                    <div styleName="btn" onClick={()=>this.goSetting()}>去设置</div>
                </div>
                <div styleName="item">
                    <div styleName="detail">
                        <p>绑定手机令牌</p>
                        <p>绑定Steam手机令牌且已绑定满15天</p>
                    </div>
                    <div styleName="btn" onClick={()=>this.closeAlert()}>确认绑定</div>
                </div>
                <div styleName="tips">
                    <p>1、下载Steam官方APP</p>
                    <p>2、使用自己的账号登录Steam APP</p>
                    <p>3、在左上角的设置中依次选择：</p>
                    <p>“Steam令牌”--“设置”--“在我的手机上获取Steam令牌验证码”根据Steam的说明完成手机令牌的绑定，15天之后即可交易。</p>
                </div>
            </div>
        </div>
    </div>)

    render() {
        return (
            <div styleName="wrap">
                {/* {this.GridExample()} */}
                <BottomTab goPage={(_el,index)=>this.goPage(_el,index)}goMatchDetail={(id) => this.props.goMatchDetail(id)} showGameDetail={(id) => this.props.showGameDetail(id)} />

                {this.state.showAlert ? this.steamAlert(): null}
                
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