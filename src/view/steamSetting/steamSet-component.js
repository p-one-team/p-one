import React, { Component } from 'react'
import PropTypes from 'prop-types'
import CSSModules from 'react-css-modules'
import style from './setting.less'
import { NavBar, Icon } from 'antd-mobile'


@CSSModules(style)
class SteamSetComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            steamUrl: this.props.userInfos.SteamTradeUrl
        }
    }

    urlChange = (event) => {
        this.setState({
            steamUrl: event.target.value
        })
    }

    submit = () => {
        this.props.feedBack({
            ProblemTitle: this.state.shortDesc,
            QQ: this.state.qqNumber,
            ProblemContent: this.state.detailDesc
        }, () => {
            this.setState({
                shortDesc: "",
                qqNumber: "",
                detailDesc: ""
            })
        })
    }

    render() {
        return (
            <div styleName="wrap">
                <NavBar
                    mode="dark"
                    icon={<Icon type="left" />}
                    onLeftClick={() => this.props.history.goBack()}
                >Steam设置</NavBar>

                <div styleName="container">
                    <p styleName="title">您的SteamID</p>
                    <div styleName="short">
                        <input placeholder="SteamID" maxLength="20" type="text" readOnly value={this.props.userInfos.SteamId} />
                    </div>

                    <p styleName="title">Steam交易URL</p>
                    <div styleName="detail">
                        <textarea placeholder="请输入您的Steam交易URL" maxLength="200" type="text" value={this.state.steamUrl} onChange={this.urlChange.bind(this)} />
                    </div>
                </div>
            </div>
        )
    }
}

SteamSetComponent.propTypes = {
    goRankPage: PropTypes.func,
}

export default SteamSetComponent