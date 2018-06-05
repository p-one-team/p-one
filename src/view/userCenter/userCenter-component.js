import React, { Component } from 'react'
import PropTypes from 'prop-types'
import CSSModules from 'react-css-modules'
import style from './uc.less'
// import '../../styles/iconfont.css'
@CSSModules(style)
class UserCenterComponent extends Component {
	constructor(props) {
		super(props)
	}

	render() {
		let userInfos = this.props.userInfos;
		
		return (
			<div styleName="wrap">
				<ul>
					<li styleName="header" onClick={() => this.props.goDetail()}>
						<div styleName="left">
							<img styleName="user-img" src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1524227131869&di=dcca65d33e7ce856a261f31c847ddf90&imgtype=0&src=http%3A%2F%2Fimgsrc.baidu.com%2Fforum%2Fw%253D580%2Fsign%3D7d86311748ed2e73fce98624b703a16d%2Fcb514fc2d5628535ae210cb292ef76c6a6ef6365.jpg" alt="" />
							<div styleName="user-info">
								<p>{userInfos.NickName}</p>
								{/* <p>LV 32</p> */}
							</div>
						</div>

						<div className="iconfont icon-previewright"></div>
					</li>
					<li onClick={() => this.props.goTradeHistory()}>
						<div> <span className="iconfont icon-cart"></span>我的交易</div>
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