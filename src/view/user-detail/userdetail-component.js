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
                >个人资料</NavBar>
                <div styleName="container">
                    <ul>
                        <li>
                            <span>头像</span>
                            <img styleName="user-img" src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1524227131869&di=dcca65d33e7ce856a261f31c847ddf90&imgtype=0&src=http%3A%2F%2Fimgsrc.baidu.com%2Fforum%2Fw%253D580%2Fsign%3D7d86311748ed2e73fce98624b703a16d%2Fcb514fc2d5628535ae210cb292ef76c6a6ef6365.jpg" alt=""/>
                        </li>
                        <li>
                            <span>昵称</span>
                            <label>ROVER</label>
                            <label className="iconfont icon-previewright"></label>
                        </li>
                        <li>
                            <span>手机</span>
                            <label>未绑定</label>
                            <label className="iconfont icon-previewright"></label>
                        </li>
                        <li>
                            <span>Steam设置</span>
                            <label></label>
                            <label className="iconfont icon-previewright"></label>
                        </li>
                        <li>
                            <span>实名认证</span>
                            <label>未设置</label>
                            <label className="iconfont icon-previewright"></label>
                        </li>
                        <li>
                            <span>修改密码</span>
                            <label></label>
                            <label className="iconfont icon-previewright"></label>
                        </li>
                    </ul>
                </div>
                <div styleName="logout">退出登录</div>
            </div>
        )
    }
}

UserDetailComponent.propTypes = {
    phoneNumber: PropTypes.string,
    verificationCode: PropTypes.string
}

export default UserDetailComponent