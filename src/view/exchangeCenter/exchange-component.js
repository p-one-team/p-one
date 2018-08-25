import React, { Component } from 'react'
import PropTypes from 'prop-types'
import CSSModules from 'react-css-modules'
import style from './exchange.less'
import { NavBar, Icon } from 'antd-mobile'


@CSSModules(style)
class ExchangeComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
        }
    }

    componentWillMount() {
        this.props.refreshUserInfo()
    }

    render() {
        return (
            <div styleName="wrap">
                <NavBar
                    mode="dark"
                    icon={<Icon type="left" />}
                    onLeftClick={() => this.props.history.goBack()}
                >兑换中心</NavBar>

                <div styleName="container">
                    <div styleName="tbean">
                        <div styleName="pic">
                            <img src="./img/hero.jpg" />
                        </div>
                        <div styleName="detail">
                            <p>T豆余额</p>
                            <p>{this.props.userInfos.TBeansCount}</p>
                            <div onClick={() => this.props.goExchangeTbeans()}>兑换T豆</div>
                        </div>
                    </div>
                    <p styleName="tips">兑换中心只支持至宝以及特定饰品兑换</p>
                </div>

            </div>
        )
    }
}

ExchangeComponent.propTypes = {
    goRankPage: PropTypes.func,
}

export default ExchangeComponent