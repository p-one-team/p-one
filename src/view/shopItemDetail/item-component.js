import React, { Component } from 'react'
import PropTypes from 'prop-types'
import CSSModules from 'react-css-modules'
import style from './item.less'

import { NavBar, Icon } from 'antd-mobile';



@CSSModules(style, { handleNotFoundStyleName: 'ignore' })
class ShopItemDetailComponent extends Component {
    constructor(props) {
        super(props)

    }

    componentDidMount() {
        this.props.initData()
    }


    render() {

        // const { getFieldProps, getFieldError } = this.props.form;
        console.log(this.props.match.params.itemId)
        return (
            <div styleName="wrap">
                <NavBar
                    mode="light"
                    icon={<Icon type="left" />}
                    onLeftClick={() => this.props.history.goBack()}
                >{this.props.match.params.itemId}</NavBar>
                <div className="container">
                    <div styleName="head-card">
                        <p>槽位: 天气效果</p>
                        <p>允许预测</p>
                        <img src="http://www.ruanyifeng.com/blogimg/asset/2016/bg2016052501.jpg" alt="" />
                    </div>

                </div>

            </div>
        )
    }
}

ShopItemDetailComponent.propTypes = {
    phoneNumber: PropTypes.string,
    verificationCode: PropTypes.string
}

export default ShopItemDetailComponent