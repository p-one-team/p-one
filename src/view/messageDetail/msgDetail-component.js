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
                    <p>{detail.Title}</p>
                    <div>{detail.Content}</div>
                    <p>GT</p>
                    <p>{detail.PublishTime}</p>
                </div>
            </div>
        )
    }
}

MsgDetailComponent.propTypes = {

}

export default MsgDetailComponent