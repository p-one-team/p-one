import React, { Component } from 'react'
// import PropTypes from 'prop-types'
import CSSModules from 'react-css-modules'
import style from './help.less'

import { NavBar, Icon } from 'antd-mobile';


@CSSModules(style, { handleNotFoundStyleName: 'ignore' })
class HelpSuggestComponent extends Component {
    constructor(props) {
        super(props)
    }

    render() {

        return (
            <div styleName="wrap">
                <NavBar
                    mode="light"
                    icon={<Icon type="left" />}
                    onLeftClick={() => this.props.history.goBack()}
                >帮助与建议</NavBar>
            </div>
        )
    }
}

HelpSuggestComponent.propTypes = {

}

export default HelpSuggestComponent