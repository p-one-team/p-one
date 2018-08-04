import React, { Component } from 'react'
import CSSModules from 'react-css-modules'
import style from './protocol.less'

import { NavBar, Icon } from 'antd-mobile';


@CSSModules(style, { handleNotFoundStyleName: 'ignore' })
class ProtocolComponent extends Component {
    constructor(props) {
        super(props)
    }

    render() {

        return (
            <div styleName="wrap">
                <NavBar
                    mode="dark"
                    icon={<Icon type="left" />}
                    onLeftClick={() => this.props.history.goBack()}
                >平台服务协议</NavBar>
            </div>
        )
    }
}

ProtocolComponent.propTypes = {

}

export default ProtocolComponent