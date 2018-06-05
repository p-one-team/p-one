import React, { Component } from 'react'
import PropTypes from 'prop-types'
import CSSModules from 'react-css-modules'
import style from './rank.less'

import { List } from 'antd-mobile';
// import { NavBar, Icon } from 'antd-mobile';
import { Tabs } from 'antd-mobile';


const tabs = [
    { title: "胜率总榜", sub: 1 },
    { title: '本周榜', sub: 2 }
];
const Item = List.Item;


@CSSModules(style, { handleNotFoundStyleName: 'ignore' })
class RankComponentWrapper extends Component {
    constructor(props) {
        super(props)

        //先获取胜率总榜
        this.props.getRank({
            RankingType: 1, //1胜率总榜，2本周榜
            PageIndex: 0,
        })
    }

    TabExample(list) {

        if(list && list.length>0){
            return (
                <div>
                    <div className="list-title">
                        <div>&nbsp;&nbsp;&nbsp;&nbsp;玩家</div><div>胜率</div><div>排名</div>
                    </div>
                    {list.map((item,index) => (
                        <Item key={index}>
                            <div>
                                {/* <img src={item.PlayerImage} alt="头像" /> */}
                                <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1524227131869&di=dcca65d33e7ce856a261f31c847ddf90&imgtype=0&src=http%3A%2F%2Fimgsrc.baidu.com%2Fforum%2Fw%253D580%2Fsign%3D7d86311748ed2e73fce98624b703a16d%2Fcb514fc2d5628535ae210cb292ef76c6a6ef6365.jpg" />
                                <span>{item.PlayerName}</span>
                            </div>
                            <div className="rate_part">{item.PlayerWinRate}</div>
                            <div>{item.Ranking+1}</div>
                        </Item>
                    ))}
                </div>
            )
        }else{
            return (<div className="noRankInfo">暂无排行信息</div>)
        }

    }

    render() {
        return (
            <div styleName="wrap">
                {/* <NavBar
                    mode="light"
                    icon={<Icon type="left" />}
                    onLeftClick={() => this.props.history.goBack()}
                >排行榜</NavBar> */}

                <div className="container">
                    <Tabs tabs={tabs}
                        initialPage={0}
                        onTabClick={(tab) => { this.props.getRank({RankingType: tab.sub, PageIndex: 0})}}
                    >

                        <List className="beacon-list">
                            {this.TabExample(this.props.rankTotal.Players)}
                        </List>

                        <List className="beacon-list">
                            {this.TabExample(this.props.rankWeek.Players)}
                        </List>
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