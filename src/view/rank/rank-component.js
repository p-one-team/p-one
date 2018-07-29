import React, { Component } from 'react'
import PropTypes from 'prop-types'
import CSSModules from 'react-css-modules'
import style from './rank.less'
import { NavBar, Tabs } from 'antd-mobile';


// const Item = List.Item;
@CSSModules(style, { handleNotFoundStyleName: 'ignore' })
class RankComponentWrapper extends Component {
    constructor(props) {
        super(props)

        this.state = {
            tabs: [
                { title: "胜率总榜", sub: 1 },
                { title: '本周榜', sub: 2 }
            ],
            totalList: [],
            isTotalMore: false,
            weekList: [],
            isWeekMore: false,
            pageIndex: 1,
            chosenTab: 1,
            isLoadingMore: false
        }
    }

    componentWillMount() {
        //先获取胜率总榜
        this.props.getRank({
            RankingType: 1, //1胜率总榜，2本周榜
            PageIndex: 1,
        }, () => {
            this.setState({
                chosenTab: 1,
                totalList: this.props.rankTotal.Players,
                isTotalMore: this.props.rankTotal.IsMore,
                pageIndex: 1
            })
        })
    }

    componentDidMount() {
        window.addEventListener('scroll', () => {
            if (this.state.isLoadingMore) {
                return;
            }

            if (!this.wrapper) {
                return;
            }

            this.jugeHeight();

        }, false);
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', () => {
            if (this.state.isLoadingMore) {
                return;
            }

            if (!this.wrapper) {
                return;
            }

            this.jugeHeight();

        }, false);
    }

    jugeHeight() {

        const top = this.wrapper.getBoundingClientRect().top;
        const windowHeight = window.screen.height;

        if (top && top < windowHeight) {
            // 当 wrapper 已经被滚动到页面可视范围之内触发
            this.loadMoreDataFn();
        }
    }

    changeTab = (tab) => {
        if (tab == 1) {
            this.props.getRank({
                RankingType: 1, //胜率总榜
                PageIndex: 1,
            }, () => {
                this.setState({
                    chosenTab: 1,
                    totalList: this.props.rankTotal.Players,
                    isTotalMore: this.props.rankTotal.IsMore,
                    pageIndex: 1
                })
            })
        } else if (tab == 2) {
            this.props.getRank({
                RankingType: 2, //本周榜
                PageIndex: 1,
            }, () => {
                this.setState({
                    chosenTab: 2,
                    weekList: this.props.rankWeek.Players,
                    isWeekMore: this.props.rankWeek.IsMore,
                    pageIndex: 1
                })
            })
        }
    }

    loadMoreDataFn = () => {
        this.setState({
            isLoadingMore: true,
            pageIndex: this.state.pageIndex + 1
        })

        this.props.getRank({
            RankingType: this.state.chosenTab,
            PageIndex: this.state.pageIndex,
        }, () => {
            if (this.state.chosenTab == 1) {
                this.setState({
                    isLoadingMore: false,
                    totalList: this.state.totalList.concat(this.props.rankTotal.Players),
                    isTotalMore: this.props.rankTotal.IsMore,
                })
            } else if (this.state.chosenTab == 2) {
                this.setState({
                    isLoadingMore: false,
                    weekList: this.state.weekList.concat(this.props.rankWeek.Players),
                    isWeekMore: this.props.rankWeek.IsMore,
                })
            }
        })
    }

    TabExample = (list, isMore) => {

        if (list && list.length > 0) {
            return (
                <div styleName="listMain">
                    <div styleName="list-title">
                        <div>&nbsp;&nbsp;&nbsp;&nbsp;玩家</div><div>胜率</div><div>排名</div>
                    </div>
                    {list.map((item, index) => (
                        <div styleName="list-item" key={index}>
                            <div>
                                <img src={item.PlayerImage} alt="头像" />
                                {/* <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1524227131869&di=dcca65d33e7ce856a261f31c847ddf90&imgtype=0&src=http%3A%2F%2Fimgsrc.baidu.com%2Fforum%2Fw%253D580%2Fsign%3D7d86311748ed2e73fce98624b703a16d%2Fcb514fc2d5628535ae210cb292ef76c6a6ef6365.jpg" /> */}
                                <span>{item.PlayerName}</span>
                            </div>
                            <div styleName="rate_part">{item.PlayerWinRate}</div>
                            <div>{index + 1}</div>
                        </div>
                    ))}
                    {isMore ? <div styleName="loadMore" ref={(c) => { this.wrapper = c; }} onClick={this.loadMoreDataFn.bind(this, this)}>点击加载更多</div> : <div styleName="loadMore">无更多</div>}
                </div>
            )
        } else {
            return (<div styleName="noRankInfo">暂无排行信息</div>)
        }

    }

    render() {
        return (
            <div styleName="wrap">
                <NavBar
                    mode="dark"
                >排行榜</NavBar>

                <div className="container">
                    <Tabs tabs={this.state.tabs}
                        initialPage={0}
                        onTabClick={(tab) => this.changeTab(tab.sub)}
                    >

                        <div styleName="beacon-list">
                            {this.TabExample(this.state.totalList, this.state.isTotalMore)}
                        </div>

                        <div styleName="beacon-list">
                            {this.TabExample(this.state.weekList, this.state.isWeekMore)}
                        </div>
                    </Tabs>

                </div>

            </div>
        )
    }
}

RankComponentWrapper.propTypes = {
    phoneNumber: PropTypes.string,
    verificationCode: PropTypes.string
}

export default RankComponentWrapper