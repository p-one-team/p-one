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
        AlertWindow.Confirm("确认退出登录吗？",()=>{self.props.logout()})
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
                            <img styleName="user-img" src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1524227131869&di=dcca65d33e7ce856a261f31c847ddf90&imgtype=0&src=http%3A%2F%2Fimgsrc.baidu.com%2Fforum%2Fw%253D580%2Fsign%3D7d86311748ed2e73fce98624b703a16d%2Fcb514fc2d5628535ae210cb292ef76c6a6ef6365.jpg" alt=""/>
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
                            <label>{userInfos.UserName?userInfos.UserName:"未认证"}</label>
                            <label className="iconfont icon-previewright"></label>
                        </li>
                        <li>
                            <span>邮箱</span>
                            <label>{userInfos.Email?userInfos.Email:"未绑定"}</label>
                            <label className="iconfont icon-previewright"></label>
                        </li>
                        <li onClick={this.modifyPsd}>
                            <span>修改密码</span>
                            <label></label>
                            <label className="iconfont icon-previewright"></label>
                        </li>
                        <li>
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