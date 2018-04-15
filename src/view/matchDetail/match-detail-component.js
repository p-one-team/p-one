import React, { Component } from 'react'
import PropTypes from 'prop-types'
import CSSModules from 'react-css-modules'
import style from './match-detail.less'
import { NavBar, Icon } from 'antd-mobile'
import { Progress } from 'antd-mobile';
import { Tabs, WhiteSpace } from 'antd-mobile';
import { StickyContainer, Sticky } from 'react-sticky';
import { Accordion } from 'antd-mobile';


function renderTabBar(props) {
    return (<Sticky>
        {({ style }) => <div style={{ ...style, zIndex: 1 }}><Tabs.DefaultTabBar {...props} /></div>}
    </Sticky>);
}
const tabs = [
    { title: '饰品预测' },
    { title: 'P豆预测' },
    { title: '土豪榜' },
];

const rowHead = () =>
    (<div>
        <p>icon</p>
        <p>name</p>
    </div>
    )

const TabExample = () => (
    <div>
        <WhiteSpace />
        <StickyContainer>
            <Tabs tabs={tabs}
                initalPage={'t2'}
                renderTabBar={renderTabBar}
            >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '250px', backgroundColor: '#fff' }}>
                    <Accordion defaultActiveKey="0" className="my-accordion  bet-info" onChange={this.onChange}>
                        <Accordion.Panel header={rowHead()} className="pad">
                            <div>  <img src="https://www.baidu.com/img/baidu_jgylogo3.gif" alt="" />
                                <img src="https://www.baidu.com/img/baidu_jgylogo3.gif" alt="" />
                                <img src="https://www.baidu.com/img/baidu_jgylogo3.gif" alt="" /></div>

                        </Accordion.Panel>
                    </Accordion>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '250px', backgroundColor: '#fff' }}>
                    Content of second tab
          </div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '250px', backgroundColor: '#fff' }}>
                    Content of third tab
          </div>
            </Tabs>
        </StickyContainer>
        <WhiteSpace />
    </div>)

@CSSModules(style, { handleNotFoundStyleName: 'ignore' })
class matchDetail extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <div styleName="wrap">
                <NavBar
                    icon={<Icon type="left" />}
                    onLeftClick={() => console.log('onLeftClick')}
                    mode="dark"
                >比赛预测</NavBar>

                <div styleName="detailCard">
                    <div styleName="teamL">
                        <p>ICON</p>
                        <p>AGO</p>
                    </div>
                    <div styleName="des">
                        <p>BO3</p>
                        <p>猜输赢</p>
                        <p>进行中</p>
                    </div>
                    <div styleName="teamR">
                        <p>ICON</p>
                        <p>lgd</p>
                    </div>
                </div>

                <div styleName="rateDes">
                    <p styleName="sub-tips">谁将赢得此系列赛的胜利?</p>
                    <div styleName="rateBox">
                        <div>
                            <div>赔率</div>
                            <div>0.28</div>
                        </div>
                        <div>
                            <div>3.26</div>
                            <div>赔率</div>
                        </div>
                    </div>
                    <div styleName="show-info">
                        <div aria-hidden="true">40%</div>
                        <div styleName="progress"><Progress percent={50} position="normal" /></div>
                        <div aria-hidden="true">50%</div>
                    </div>
                </div>

                <div styleName="rankList">
                    <TabExample />
                </div>

            </div>
        )
    }
}

matchDetail.propTypes = {
    goBack: PropTypes.func
}

export default matchDetail
