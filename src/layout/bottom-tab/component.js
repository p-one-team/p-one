import React from 'react'
import { TabBar } from 'antd-mobile';
import { Tabs, WhiteSpace, Badge, Grid, NavBar } from 'antd-mobile';
import CSSModules from 'react-css-modules'
import style from './bottom-tab.less'
import MatchList from '../match-list'
import UserCenter from '../../view/userCenter'
import Message from '../../view/message'
// import Rank from '../../view/rank'
// import { doudizhu } from '../../common'


@CSSModules(style)
class TabBarExample extends React.Component {
    constructor(props) {
        super(props);

        this.props.changeGameInfo("570")

        this.state = {
            gameTypes: [
                { GameCode: "570", GameName: "Dota2" },
                { GameCode: "730", GameName: "CSGO" },
                { GameCode: "lol", GameName: "LOL" },
                { GameCode: "Sports", GameName: "体育" }
            ],
            hidden: false,
            gridData: [
                { text: '我的库存' },
                { text: '收菜排行' },
                { text: '我的预测' },
                { text: '商城' }
            ]
        }
    }

    lotteryPart = () => {
        let _gameTypes = this.state.gameTypes
        for (let i in _gameTypes) {
            _gameTypes[i].title = (<Badge >{_gameTypes[i].GameName}</Badge>)
        }

        return (<div className="xxxxx">
            <NavBar
                mode="dark"
            >赛事预测</NavBar>
            <div className="topMenu">
                <Grid
                    data={this.state.gridData}
                    hasLine={false}
                    activeStyle={{ backgroundColor: "#2c2c32", "color": "#fff", fontSize: "3.2vw" }}
                    onClick={(_el, index) => { this.props.goPage(_el, index) }}
                />
            </div>
            <Tabs tabs={_gameTypes}
                initialPage={0}
                onTabClick={(tab) => { this.props.changeGameInfo(tab.GameCode) }}
                onChange={(tab) => { this.props.changeGameInfo(tab.GameCode) }}
            >
                <div styleName="game_outer">
                    <MatchList detailList={this.props.gameInfos_570} detailItem={this.props.gameItems} goMatchDetail={(id) => this.props.goMatchDetail(id)} showGameDetail={(gameId, callback) => this.props.showGameDetail(gameId, callback)} />
                </div>
                <div styleName="game_outer">
                    <MatchList detailList={this.props.gameInfos_730} detailItem={this.props.gameItems} goMatchDetail={(id) => this.props.goMatchDetail(id)} showGameDetail={(gameId, callback) => this.props.showGameDetail(gameId, callback)} />
                </div>
                <div styleName="game_outer">
                    <MatchList detailList={this.props.gameInfos_lol} detailItem={this.props.gameItems} goMatchDetail={(id) => this.props.goMatchDetail(id)} showGameDetail={(gameId, callback) => this.props.showGameDetail(gameId, callback)} />
                </div>
                <div styleName="game_outer">
                    <MatchList detailList={this.props.gameInfos_Sports} detailItem={this.props.gameItems} goMatchDetail={(id) => this.props.goMatchDetail(id)} showGameDetail={(gameId, callback) => this.props.showGameDetail(gameId, callback)} />
                </div>
            </Tabs>
            <WhiteSpace />
        </div>)
    }

    recommendPart = () => (<div style={{ backgroundColor: '#fff', height: '100%', textAlign: 'center' }}>
        <NavBar
            mode="dark"
        >{this.props.showGame?"游戏":"--"}</NavBar>
        <p style={{ marginTop: 50 }}></p>
    </div>);

    render() {
        return (
            <div styleName="tabBarBox">
                <TabBar
                    unselectedTintColor="#949494"
                    tintColor="#2c2c32"
                    barTintColor="white"
                    hidden={this.props.hidden}
                >
                    <TabBar.Item
                        title={this.props.showGame?"游戏":"--"}
                        key="recommend"
                        icon={<div style={{
                            width: '6.5vw',
                            height: '6.5vw',
                            background: 'url(./img/like.png) center center /  6.5vw 6.5vw no-repeat'
                        }}
                        />
                        }
                        selectedIcon={<div style={{
                            width: '6.5vw',
                            height: '6.5vw',
                            background: 'url(./img/like_fill.png) center center /  6.5vw 6.5vw no-repeat'
                        }}
                        />
                        }
                        selected={this.props.currentPage === 'recommend'}
                        onPress={() => {
                            if(this.props.showGame){
                                navigator.StatusBar && navigator.StatusBar.hide();
                                window.StatusBar && window.StatusBar.hide();
                                this.props.changePage('recommend');
                                setTimeout(() => {
                                    this.props.changePage('lottery');
                                    this.props.goExchangeCenter();
                                    window.location.href = this.props.userInfos.ChessUrl;
                                }, 0);
                            }else{
                                this.props.changePage('recommend');
                            }
                        }}
                        data-seed="logId"
                    >
                        {this.recommendPart()}
                    </TabBar.Item>

                    <TabBar.Item
                        icon={
                            <div style={{
                                width: '6.5vw',
                                height: '6.5vw',
                                background: 'url(./img/game.png) center center /  6.5vw 6.5vw no-repeat'
                            }}
                            />
                        }
                        selectedIcon={
                            <div style={{
                                width: '6.5vw',
                                height: '6.5vw',
                                background: 'url(./img/game_fill.png) center center /  6.5vw 6.5vw no-repeat'
                            }}
                            />
                        }
                        title="赛事"
                        key="lottery"
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
                                width: '6.5vw',
                                height: '6.5vw',
                                background: 'url(./img/rank.png) center center /  6.5vw 6.5vw no-repeat'
                            }}
                            />
                        }
                        selectedIcon={
                            <div style={{
                                width: '6.5vw',
                                height: '6.5vw',
                                background: 'url(./img/rank_fill.png) center center /  6.5vw 6.5vw no-repeat'
                            }}
                            />
                        }
                        title="资讯公告"
                        key="rank"
                        selected={this.props.currentPage === 'rank'}
                        onPress={() => {
                            this.props.changePage('rank');
                        }}
                    >
                        <Message />
                    </TabBar.Item>

                    <TabBar.Item
                        icon={<div style={{
                            width: '6.5vw',
                            height: '6.5vw',
                            background: 'url(./img/user.png) center center /  6.5vw 6.5vw no-repeat'
                        }}
                        />}
                        selectedIcon={<div style={{
                            width: '6.5vw',
                            height: '6.5vw',
                            background: 'url(./img/user_fill.png) center center /  6.5vw 6.5vw no-repeat'
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