import React, { Component } from 'react'
import PropTypes from 'prop-types'
import CSSModules from 'react-css-modules'
import style from './uc.less'
import _ut from '../../libs/my-util'
import store from '../../store'
import { steamLogin } from '../../common'

@CSSModules(style)
class UserCenterComponent extends Component {
	constructor(props) {
		super(props)

		this.state = {
			isSign: this.props.userInfos.IsCheckIn,
			showSteamAlert: false,
			showUrlAlert: false,
		}
	}

	componentWillMount() {
		this.props.refreshUserInfo('', () => {
			this.setState({
				isSign: this.props.userInfos.IsCheckIn
			})
		})
	}

	updateUserInfo = () => {
		this.props.refreshUserInfo('', () => {
			this.setState({
				isSign: this.props.userInfos.IsCheckIn
			})
		})
	}

	sign = () => {
		this.props.signIn('', () => {
			this.updateUserInfo()
		})
	}

	goInventory = () => {
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
				this.props.goInventory();
			}
		}
	}

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
		this.closeAlert();
		window.location.href = `${steamLogin}?userId=${this.props.userInfos.UserId}&mobile=${this.props.userInfos.Mobile}`;
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
		let userInfos = this.props.userInfos;

		return (
			<div styleName="wrap">
				<div styleName="header">
					<div styleName="left" onClick={() => this.props.goDetail()}>
						<img styleName="user-img" src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1524227131869&di=dcca65d33e7ce856a261f31c847ddf90&imgtype=0&src=http%3A%2F%2Fimgsrc.baidu.com%2Fforum%2Fw%253D580%2Fsign%3D7d86311748ed2e73fce98624b703a16d%2Fcb514fc2d5628535ae210cb292ef76c6a6ef6365.jpg" alt="" />
						<div styleName="user-info">{userInfos.NickName}</div>
					</div>
					{/* {this.state.isSign ? <div styleName="hasSigned">已签到</div> : <div styleName="sign" onClick={() => this.sign()}>点击签到</div>} */}
				</div>
				<ul>
					<li>
						<div> <span className="iconfont icon-favorfill"></span>签到送T豆</div>
						{this.state.isSign ? <div styleName="hasSigned">已签到</div> : <div styleName="sign" onClick={() => this.sign()}>点击签到</div>}
					</li>
					<li onClick={() => this.goInventory()}>
						<div> <span className="iconfont icon-goodsfill"></span>我的库存</div>
						<div className="iconfont icon-previewright"></div>
					</li>
					<li onClick={() => this.props.goMyForecast()}>
						<div> <span className="iconfont icon-shujutongji"></span>我的预测</div>
						<div className="iconfont icon-previewright"></div>
					</li>
					<li onClick={() => this.props.goTradeHistory()}>
						<div> <span className="iconfont icon-sponsorfill"></span>我的交易</div>
						<div className="iconfont icon-previewright"></div>
					</li>
					<li onClick={() => this.props.goExchangeCenter()}>
						<div> <span className="iconfont icon-gift1"></span>兑换中心</div>
						<div className="iconfont icon-previewright"></div>
					</li>
					<li onClick={() => this.props.goFeedback()}>
						<div> <span className="iconfont icon-writefill"></span>意见反馈</div>
						<div className="iconfont icon-previewright"></div>
					</li>
					<li onClick={() => this.props.goHelpSuggest()}>
						<div> <span className="iconfont icon-help1"></span>帮助和建议</div>
						<div className="iconfont icon-previewright"></div>
					</li>
				</ul>

				{this.state.showSteamAlert ? this.steamAlert() : null}
				{this.state.showUrlAlert ? this.urlAlert() : null}
			</div>
		)
	}
}

UserCenterComponent.propTypes = {
	goBack: PropTypes.func
}

export default UserCenterComponent