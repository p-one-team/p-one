import React, { Component } from 'react'
// import PropTypes from 'prop-types'
import CSSModules from 'react-css-modules'
import style from './message.less'

import { NavBar, Icon } from 'antd-mobile';


@CSSModules(style, { handleNotFoundStyleName: 'ignore' })
class MessageComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            messageList: [
                {
                    index: 1,
                    time: "2018年1月1日",
                    content: "你被拒绝加入CDEC预备赛，原因如下：未满足报名需求。"
                },
                {
                    index: 2,
                    time: "2018年1月1日",
                    content: "你被拒绝加入CDEC预备赛，原因如下：未满足报名需求。"
                }
            ]
        }
    }

    render() {
        let messageList = this.state.messageList
        let list = messageList.map((item)=>{
            return (
                <li key={item.index}>
                    <p>系统消息：{item.time}</p>
                    <p>{item.content}</p>
                </li>
            )
        })

        return (
            <div styleName="wrap">
                <NavBar
                    mode="dark"
                    icon={<Icon type="left" />}
                    onLeftClick={() => this.props.history.goBack()}
                >我的消息</NavBar>

                <ul>{list}</ul>
                
            </div>
        )
    }
}

MessageComponent.propTypes = {

}

export default MessageComponent