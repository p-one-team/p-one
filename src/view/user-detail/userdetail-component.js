import React, { Component } from 'react'
import PropTypes from 'prop-types'
import CSSModules from 'react-css-modules'
import style from './userDetail.less'

import { NavBar, Icon } from 'antd-mobile';


@CSSModules(style, { handleNotFoundStyleName: 'ignore' })
class UserDetailComponent extends Component {
    constructor(props) {
        super(props)
        console.log(this.props.history)
    }

    componentDidMount() {
        this.props.initData()
    }

    render() {

        // const { getFieldProps, getFieldError } = this.props.form;
        console.log(this.props)
        return (
            <div styleName="wrap">
                <NavBar
                    mode="light"
                    icon={<Icon type="left" />}
                    onLeftClick={() => this.props.history.goBack()}
                >我的账户</NavBar>
                <div className="container">
                    <ul>
                        <li><span>头像</span> <div styleName="user-img"></div></li>
                        <li><span>昵称</span> <div><label>D.G</label><label className="iconfont icon-previewright"></label>   </div></li>
                        <li><span>手机</span> <div><label>D.G</label><label className="iconfont icon-previewright"></label>   </div></li>
                        <li><span>Steam设置</span> <div><label>D.G</label><label className="iconfont icon-previewright"></label>   </div></li>
                        <li><span>实名认证</span> <div><label>D.G</label><label className="iconfont icon-previewright"></label>   </div></li>
                        <li><span>修改密码</span> <div><label>D.G</label><label className="iconfont icon-previewright"></label>   </div></li>
                    </ul>
                </div>

            </div>
        )
    }
}

UserDetailComponent.propTypes = {
    phoneNumber: PropTypes.string,
    verificationCode: PropTypes.string
}

export default UserDetailComponent