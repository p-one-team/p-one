import React, { Component } from 'react'
import PropTypes from 'prop-types'
import CSSModules from 'react-css-modules'
import style from './feedback.less'
import { NavBar, Icon } from 'antd-mobile'


@CSSModules(style)
class FeedbackComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            shortDesc: "",
            qqNumber: "",
            detailDesc: ""
        }
    }

    shortChange = (event) => {
        this.setState({
            shortDesc: event.target.value
        })
    }

    qqChange = (event) => {
        this.setState({
            qqNumber: event.target.value
        })
    }

    detailChange = (event) => {
        this.setState({
            detailDesc: event.target.value
        })
    }

    render() {
        return (
            <div styleName="wrap">
                <NavBar
                    mode="dark"
                    icon={<Icon type="left" />}
                    onLeftClick={() => this.props.history.goBack()}
                    rightContent="确认提交"
                >意见反馈</NavBar>

                <div styleName="container">
                    <div styleName="short">
                        <input placeholder="请简短描述您的问题" maxLength="20" type="text" value={this.state.shortDesc} onChange={this.shortChange.bind(this)} />
                    </div>
                    <div styleName="qq">
                        <input placeholder="留下您的QQ" maxLength="12" type="tel" value={this.state.qqNumber} onChange={this.qqChange.bind(this)} />
                    </div>
                    <div styleName="detail">
                        <textarea placeholder="请详细描述您的问题" maxLength="200" type="text" value={this.state.detailDesc} onChange={this.detailChange.bind(this)} />
                    </div>
                </div>
            </div>
        )
    }
}

FeedbackComponent.propTypes = {
    goRankPage: PropTypes.func,
}

export default FeedbackComponent