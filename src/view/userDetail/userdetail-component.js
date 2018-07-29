import React, { Component } from 'react'
import PropTypes from 'prop-types'
import CSSModules from 'react-css-modules'
import style from './userDetail.less'
import AlertWindow from '../../module/mo-alertWindow'

import { NavBar, Icon } from 'antd-mobile';


@CSSModules(style, { handleNotFoundStyleName: 'ignore' })
class UserDetailComponent extends Component {
    constructor(props) {
        super(props)
    }

    //修改密码
    modifyPsd = () => {
        this.props.goResetPsd()
    }

    logout = () => {
        const self = this
        AlertWindow.Confirm("确认退出登录吗？", () => { self.props.logout() })
    }

    render() {

        let userInfos = this.props.userInfos

        return (
            <div styleName="wrap">
                <NavBar
                    mode="dark"
                    icon={<Icon type="left" />}
                    onLeftClick={() => this.props.history.goBack()}
                >个人资料</NavBar>
                <div styleName="container">
                    <ul>
                        <li>
                            <span>头像</span>
                            <img styleName="user-img" src={userInfos.AvatarUrl} alt="" />
                        </li>
                        <li>
                            <span>昵称</span>
                            <label>{userInfos.NickName}</label>
                            <label className="iconfont icon-previewright"></label>
                        </li>
                        <li>
                            <span>手机</span>
                            <label>{userInfos.Mobile}</label>
                            <label className="iconfont icon-previewright"></label>
                        </li>
                        <li>
                            <span>实名认证</span>
                            <label>{userInfos.UserName ? userInfos.UserName : "未认证"}</label>
                            <label className="iconfont icon-previewright"></label>
                        </li>
                        <li>
                            <span>邮箱</span>
                            <label>{userInfos.Email ? userInfos.Email : "未绑定"}</label>
                            <label className="iconfont icon-previewright"></label>
                        </li>
                        <li onClick={this.modifyPsd}>
                            <span>修改密码</span>
                            <label></label>
                            <label className="iconfont icon-previewright"></label>
                        </li>
                        <li onClick={() => this.props.goSteamSetting()}>
                            <span>Steam设置</span>
                            <label></label>
                            <label className="iconfont icon-previewright"></label>
                        </li>
                    </ul>
                </div>
                <div styleName="logout" onClick={this.logout}>退出登录</div>
            </div>
        )
    }
}

UserDetailComponent.propTypes = {
    phoneNumber: PropTypes.string,
    verificationCode: PropTypes.string
}

export default UserDetailComponent