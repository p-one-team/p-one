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
                    mode="dark"
                    icon={<Icon type="left" />}
                    onLeftClick={() => this.props.history.goBack()}
                >帮助与建议</NavBar>

                <div styleName="content">
                    <p styleName="title">竞猜准备</p>

                    <p styleName="subtitle">1.公开Dota2库存</p>
                    <p>将steam个人资料状态和库存两项设置为“公开”</p>
                    <p>登录steam app，进入左上角设置后依次选择：</p>
                    <p>您与好友——库存——更多——库存隐私设置</p>
                    <p>把“个人资料状态”和“库存”两项设置为公开，保存更改。</p>

                    <p styleName="subtitle">2.设置交易URL</p>
                    <p>将完整的steam交易URL复制到我的交易URL中</p>
                    <p>进入个人中心——点击顶部头像——选择steam设置</p>
                    <p>将完整的steam交易URL输入进去点击设置按钮自动保存即可</p>

                    <p styleName="subtitle">3.绑定手机令牌并且超过7天</p>
                    <p>使用自己的账号登录steam app，在左上角的设置中依次选择</p>
                    <p>Steam令牌——设置——在我的手机上获取steam令牌验证码</p>
                    <p>根据steam的说明完成手机令牌绑定操作，7天以后即可参与竞猜。</p>

                    <p styleName="title">存取饰品</p>

                    <p styleName="subtitle">1.存入饰品</p>
                    <p>将steam库存中的饰品存入竞猜库存步骤：</p>
                    <p>——点击赛事进入竞猜主页</p>
                    <p>——点击我的库存</p>
                    <p>——点击去steam存入（或存入按钮）</p>
                    <p>——选择要存入的装备</p>
                    <p>——勾选好装备后点击下面的转入库存按钮</p>
                    <p>——打开steam app  接受交易（在steamapp接受交易因网络原因可能需要用到加速器）</p>
                    <p>——点击左上角按钮进入菜单</p>
                    <p>——此时“通知”中会有一项新的交易</p>
                    <p>——进入并回应该报价</p>
                    <p>——勾选“准备好交易”后点击接受交易</p>
                    <p>——返回设置菜单，点击“确认”</p>
                    <p>——选择交易并接受</p>
                    <p>——完成存入操作</p>
                    <p>——返回GT电竞到我的库存页面，下拉刷新会显示刚刚存入的饰品</p>
                    <p>——进入一场比赛，选择支持的队伍再选择饰品即可参与竞猜</p>

                    <p styleName="subtitle">2.取回饰品</p>
                    <p>将我的库存里的饰品取回到steam库存</p>
                    <p>——点击我的库存</p>
                    <p>——勾选需要取回的饰品后点击取回</p>
                    <p>——打开steam app  接受交易（在steamapp接受交易因网络原因可能需要用到加速器）</p>
                    <p>——点击左上角按钮进入菜单</p>
                    <p>——此时“通知”中会有一项新的交易</p>
                    <p>——进入并回应该报价</p>
                    <p>——勾选“准备好交易”后点击接受交易</p>
                    <p>——返回设置菜单，点击“确认”</p>
                    <p>——选择交易并接受</p>
                    <p>——完成存入操作</p>




                </div>
            </div>
        )
    }
}

HelpSuggestComponent.propTypes = {

}

export default HelpSuggestComponent