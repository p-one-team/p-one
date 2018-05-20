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
		return (
			<div styleName="wrap">
				<ul>
					<li styleName="header" onClick={() => this.props.goDetail()}>
						<div styleName="left">
							<img styleName="user-img" src="323" alt="" />
							<div styleName="user-info">
								<p>rover</p>
								<p>lv 32</p>
							</div>
						</div>

						<div className="iconfont icon-previewright"></div>
					</li>
					<li onClick={() => this.props.goTradeHistory()}>
						<div> <span className="iconfont icon-cart"></span>我的交易</div>
						<div className="iconfont icon-previewright"></div>
					</li>
					<li>
						<div> <span className="iconfont icon-message"></span>我的消息</div>
						<div className="iconfont icon-previewright"></div>
					</li>
					<li>
						<div> <span className="iconfont icon-gift"></span>我的礼物</div>
						<div className="iconfont icon-previewright"></div>
					</li>
					<li>
						<div> <span className="iconfont icon-star"></span>我的关注</div>
						<div className="iconfont icon-previewright"></div>
					</li>
					<li>
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