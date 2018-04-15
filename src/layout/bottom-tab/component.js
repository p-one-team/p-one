import React from 'react'
import { TabBar } from 'antd-mobile';
import { Tabs, WhiteSpace, Badge } from 'antd-mobile';
import CSSModules from 'react-css-modules'
import style from './bottom-tab.less'
import MatchList from '../match-list'

const tabs = [
    { title: <Badge >DOTA2</Badge> },
    { title: <Badge >CS:GO</Badge> },
    { title: <Badge >LOL</Badge> },
    { title: <Badge >体育</Badge> },
];


const TabExample = () => (
    <div>
        <Tabs tabs={tabs}
            initialPage={0}
            onChange={(tab, index) => { console.log('onChange', index, tab); }}
            onTabClick={(tab, index) => { console.log('onTabClick', index, tab); }}
        >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#fff' }}>
                <MatchList />
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#fff' }}>
                Content of second tab
        </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#fff' }}>
                Content of third tab
        </div>
        </Tabs>
        <WhiteSpace />

    </div>
);
@CSSModules(style)
class TabBarExample extends React.Component {
    constructor(props) {
        super(props);

        this.state = props.BottomTab_state;
    }

    renderContent(pageText) {
        return TabExample(pageText)
    }
    renderContent2(pageText) {
        return (
            <div style={{ backgroundColor: 'black', height: '100%', textAlign: 'center' }}>
                <div style={{ paddingTop: 60 }}>Clicked “{pageText}” tab， show “{pageText}” information</div>
                <a style={{ display: 'block', marginTop: 40, marginBottom: 20, color: '#108ee9' }}
                    onClick={(e) => {
                        e.preventDefault();
                        this.props.changePage(pageText);
                        this.setState({
                            hidden: !this.state.hidden,
                        });
                    }}
                >
                    Click to show/hide tab-bar
        </a>
                <a style={{ display: 'block', marginBottom: 600, color: '#108ee9' }}
                    onClick={(e) => {
                        e.preventDefault();
                    }}
                >
                    Click to switch fullscreen
        </a>
            </div>
        );
    }

    render() {

        return (
            <div styleName="tabBarBox">
                <TabBar
                    unselectedTintColor="#949494"
                    tintColor="#33A3F4"
                    barTintColor="white"
                    hidden={this.props.hidden}
                >
                    <TabBar.Item
                        title="推单"
                        key="recommend"
                        icon={<div style={{
                            width: '22px',
                            height: '22px',
                            background: 'url(https://zos.alipayobjects.com/rmsportal/sifuoDUQdAFKAVcFGROC.svg) center center /  21px 21px no-repeat'
                        }}
                        />
                        }
                        selectedIcon={<div style={{
                            width: '22px',
                            height: '22px',
                            background: 'url(https://zos.alipayobjects.com/rmsportal/iSrlOTqrKddqbOmlvUfq.svg) center center /  21px 21px no-repeat'
                        }}
                        />
                        }
                        selected={this.props.currentPage === 'recommend'}
                        badge={1}
                        onPress={() => {
                            this.props.changePage('recommend');
                        }}
                        data-seed="logId"
                    >
                        {this.renderContent2('recommend')}
                    </TabBar.Item>
                    <TabBar.Item
                        icon={
                            <div style={{
                                width: '22px',
                                height: '22px',
                                background: 'url(https://gw.alipayobjects.com/zos/rmsportal/BTSsmHkPsQSPTktcXyTV.svg) center center /  21px 21px no-repeat'
                            }}
                            />
                        }
                        selectedIcon={
                            <div style={{
                                width: '22px',
                                height: '22px',
                                background: 'url(https://gw.alipayobjects.com/zos/rmsportal/ekLecvKBnRazVLXbWOnE.svg) center center /  21px 21px no-repeat'
                            }}
                            />
                        }
                        title="菠菜"
                        key="lottery"
                        badge={'new'}
                        selected={this.props.currentPage === 'lottery'}
                        onPress={() => {
                            this.props.changePage('lottery');
                        }}
                        data-seed="logId1"
                    >
                        {this.renderContent('lottery')}
                    </TabBar.Item>
                    <TabBar.Item
                        icon={
                            <div style={{
                                width: '22px',
                                height: '22px',
                                background: 'url(https://zos.alipayobjects.com/rmsportal/psUFoAMjkCcjqtUCNPxB.svg) center center /  21px 21px no-repeat'
                            }}
                            />
                        }
                        selectedIcon={
                            <div style={{
                                width: '22px',
                                height: '22px',
                                background: 'url(https://zos.alipayobjects.com/rmsportal/IIRLrXXrFAhXVdhMWgUI.svg) center center /  21px 21px no-repeat'
                            }}
                            />
                        }
                        title="排行榜"
                        key="rank"
                        dot
                        selected={this.props.currentPage === 'rank'}
                        onPress={() => {
                            this.props.changePage('rank');
                        }}
                    >
                        {this.renderContent('rank')}
                    </TabBar.Item>
                    <TabBar.Item
                        icon={<div style={{
                            width: '22px',
                            height: '22px',
                            background: 'url(https://zos.alipayobjects.com/rmsportal/asJMfBrNqpMMlVpeInPQ.svg) center center /  21px 21px no-repeat'
                        }}
                        />}
                        selectedIcon={<div style={{
                            width: '22px',
                            height: '22px',
                            background: 'url(https://zos.alipayobjects.com/rmsportal/gjpzzcrPMkhfEqgbYvmN.svg) center center /  21px 21px no-repeat'
                        }}
                        />}
                        title="My"
                        key="my"
                        selected={this.props.currentPage === 'My'}
                        onPress={() => {
                            this.props.changePage('My');
                        }}
                    >
                        {this.renderContent('My')}
                    </TabBar.Item>
                </TabBar>
            </div>
        );
    }
}
export default TabBarExample