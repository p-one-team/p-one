import React, { Component } from 'react'
import PropTypes from 'prop-types'
import CSSModules from 'react-css-modules'
import style from './uc.less'
// import '../../styles/iconfont.css'
@CSSModules(style)
class UserCenterComponent extends Component {
	constructor(props) {
		super(props)

		this.state = {
			isSign: false
		}
	}

	sign = () => {
		this.setState({
			isSign: true
		})
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
					{this.state.isSign ? <div styleName="hasSigned">已签到</div> : <div styleName="sign" onClick={()=>this.sign()}>点击签到</div>}
				</div>
				<ul>
					<li onClick={() => this.props.goInventory()}>
						<div> <span className="iconfont icon-money"></span>我的库存</div>
						<div className="iconfont icon-previewright"></div>
					</li>
					<li onClick={() => this.props.goMyForecast()}>
						<div> <span className="iconfont icon-line_chart"></span>我的预测</div>
						<div className="iconfont icon-previewright"></div>
					</li>
					<li onClick={() => this.props.goTradeHistory()}>
						<div> <span className="iconfont icon-cart"></span>我的交易</div>
						<div className="iconfont icon-previewright"></div>
					</li>
					<li onClick={() => this.props.goFeedback()}>
						<div> <span className="iconfont icon-yijianfankui"></span>意见反馈</div>
						<div className="iconfont icon-previewright"></div>
					</li>
					<li onClick={() => this.props.goMessage()}>
						<div> <span className="iconfont icon-message"></span>我的消息</div>
						<div className="iconfont icon-previewright"></div>
					</li>
					{/* <li>
						<div> <span className="iconfont icon-gift"></span>我的礼物</div>
						<div className="iconfont icon-previewright"></div>
					</li>
					<li>
						<div> <span className="iconfont icon-star"></span>我的关注</div>
						<div className="iconfont icon-previewright"></div>
					</li> */}
					<li onClick={() => this.props.goHelpSuggest()}>
						<div> <span className="iconfont icon-help"></span>帮助和建议</div>
						<div className="iconfont icon-previewright"></div>
					</li>
				</ul>
			</div>
		)
	}
}

UserCenterComponent.propTypes = {
	goBack: PropTypes.func
}

export default UserCenterComponent