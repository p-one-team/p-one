import React, { Component } from 'react'
import PropTypes from 'prop-types'
import CSSModules from 'react-css-modules'
import style from './uc.less'
@CSSModules(style)
class UserCenterComponent extends Component {
	constructor(props) {
		super(props)
	}

	render() {
		return (
			<div styleName="wrap">
				<header>
					<div styleName="user-img"></div>
					<div styleName="user-info">12123123</div>
					<div styleName="arrow"></div>
				</header>
			</div>
		)
	}
}

UserCenterComponent.propTypes = {
	goBack: PropTypes.func
}

export default UserCenterComponent