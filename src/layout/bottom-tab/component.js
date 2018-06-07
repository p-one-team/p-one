import React from 'react'
import { TabBar } from 'antd-mobile';
import { Tabs, WhiteSpace, Badge, Grid, NavBar } from 'antd-mobile';
import CSSModules from 'react-css-modules'
import style from './bottom-tab.less'
import MatchList from '../match-list'
import UserCenter from '../../view/userCenter'
import Rank from '../../view/rank'


@CSSModules(style)
class TabBarExample extends React.Component {
    constructor(props) {
        super(props);

        this.props.changeGameInfo("570")

        this.state = {
            gameTypes: [
                {GameCode: "570", GameName: "Dota2"},
                {GameCode: "730", GameName: "CSGO"},
                {GameCode: "578080", GameName: "PUBG"},
                {GameCode: "Sports", GameName: "体育"}
            ],
            hidden: false,
            gridData: [
                {text: '我的库存'},
                {text: '收菜排行'},
                {text: '我的预测'},
                {text: '商城'}
            ]
        }
    }

    lotteryPart = () => {
        let _gameTypes = this.state.gameTypes
        for (let i in _gameTypes) {
            _gameTypes[i].title = (<Badge >{_gameTypes[i].GameName}</Badge>)
        }

        return (<div>
            <NavBar
                mode="dark"
            >赛事预测</NavBar>
            <div styleName="topMenu">
                <Grid 
                    data={this.state.gridData} 
                    hasLine={false}
                    activeStyle={{backgroundColor:"#2c2c32","color":"#fff",fontSize:"3.2vw"}}
                    onClick={(_el, index) => { this.props.goPage(_el, index) }} 
                />
            </div>
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

    recommendPart = () => (<div style={{ backgroundColor: '#fff', height: '100%', textAlign: 'center' }}>
        <NavBar
            mode="dark"
        >推单</NavBar>
        <p style={{marginTop:50}}>推单部分</p>
    </div>);

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
                        {this.recommendPart()}
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
                        {this.lotteryPart()}
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
                        <Rank />
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