import React from 'react'
import { TabBar } from 'antd-mobile';
import { Tabs, WhiteSpace, Badge } from 'antd-mobile';
// import { Tabs, WhiteSpace } from 'antd-mobile';
import CSSModules from 'react-css-modules'
import style from './bottom-tab.less'
import MatchList from '../match-list'
import UserCenter from '../../view/userCenter'

const gameTypes = [
    {GameCode: "570", GameName: "Dota2"},
    {GameCode: "730", GameName: "CSGO"},
    {GameCode: "578080", GameName: "PUBG"},
    {GameCode: "Sports", GameName: "体育"}
]

@CSSModules(style)
class TabBarExample extends React.Component {
    constructor(props) {
        super(props);

        this.props.changeGameInfo("570")

        this.state = {
            currentPage: 'my',
            hidden: false,
        }
    }

    TabExample = () => {
        let _gameTypes = gameTypes
        for (let i in _gameTypes) {
            _gameTypes[i].title = (<Badge >{_gameTypes[i].GameName}</Badge>)
        }

        return (<div>
            <Tabs tabs={_gameTypes}
                initialPage={0}
                onTabClick={(tab) => { this.props.changeGameInfo(tab.GameCode) }}
            >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#fff' }}>
                    <MatchList detailList={this.props.gameInfos_570} detailItem={this.props.gameItems} goMatchDetail={(id) => this.props.goMatchDetail(id)} showGameDetail={(gameId) => this.props.showGameDetail(gameId)} />
                </div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#fff' }}>
                    <MatchList detailList={this.props.gameInfos_730} detailItem={this.props.gameItems} goMatchDetail={(id) => this.props.goMatchDetail(id)} showGameDetail={(gameId) => this.props.showGameDetail(gameId)} />
                </div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#fff' }}>
                    <MatchList detailList={this.props.gameInfos_578080} detailItem={this.props.gameItems} goMatchDetail={(id) => this.props.goMatchDetail(id)} showGameDetail={(gameId) => this.props.showGameDetail(gameId)} />
                </div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#fff' }}>
                    <MatchList detailList={this.props.gameInfos_Sports} detailItem={this.props.gameItems} goMatchDetail={(id) => this.props.goMatchDetail(id)} showGameDetail={(gameId) => this.props.showGameDetail(gameId)} />
                </div>
            </Tabs>
            <WhiteSpace />
        </div>)
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
                >Click to show/hide tab-bar</a>

                <a style={{ display: 'block', marginBottom: 600, color: '#108ee9' }}
                    onClick={(e) => {
                        e.preventDefault();
                    }}
                >Click to switch fullscreen</a>
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
                        {this.TabExample()}
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
                        {}
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
                        title="个人"
                        key="my"
                        selected={this.props.currentPage === 'my'}
                        onPress={() => {
                            this.props.changePage('my');
                        }}
                    >
                        <UserCenter />
                    </TabBar.Item>
                </TabBar>
            </div>
        );
    }
}
export default TabBarExample