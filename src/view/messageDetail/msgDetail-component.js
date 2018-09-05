import React, { Component } from 'react'
import CSSModules from 'react-css-modules'
import style from './msgDetail.less'
import { NavBar, Icon } from 'antd-mobile';

@CSSModules(style, { handleNotFoundStyleName: 'ignore' })
class MsgDetailComponent extends Component {
    constructor(props) {
        super(props)
    }

    render() {

        let detail = this.props.noticesDetail;

        return (
            <div styleName="wrap">
                <NavBar
                    mode="dark"
                    icon={<Icon type="left" />}
                    onLeftClick={() => this.props.history.goBack()}
                >系统公告</NavBar>

                <div styleName="detail">
                    <p styleName="title" dangerouslySetInnerHTML={{__html: detail.Title}}></p>
                    <div styleName="content" dangerouslySetInnerHTML={{__html: detail.Content}}></div>
                    <p styleName="name">GT</p>
                    <p styleName="time">{detail.PublishTime}</p>
                </div>
            </div>
        )
    }
}

MsgDetailComponent.propTypes = {

}

export default MsgDetailComponent