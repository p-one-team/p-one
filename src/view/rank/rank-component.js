import React, { Component } from 'react'
import PropTypes from 'prop-types'
import CSSModules from 'react-css-modules'
import style from './rank.less'

import { NavBar, Icon, List } from 'antd-mobile';
import { Tabs } from 'antd-mobile';


const tabs2 = [
    { title: "周明灯", sub: '1' },
    { title: '周黑灯', sub: '2' }
];
const Item = List.Item;


@CSSModules(style, { handleNotFoundStyleName: 'ignore' })
class RankComponentWrapper extends Component {
    constructor(props) {
        super(props)

        this.state = {
            phoneNumber: '',
            verificationCode: '',
            list1: [
                {
                    index: 1,
                    userName: 'Rover',
                    userImg: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1524227131869&di=dcca65d33e7ce856a261f31c847ddf90&imgtype=0&src=http%3A%2F%2Fimgsrc.baidu.com%2Fforum%2Fw%253D580%2Fsign%3D7d86311748ed2e73fce98624b703a16d%2Fcb514fc2d5628535ae210cb292ef76c6a6ef6365.jpg",
                    userLevel: 33,
                    winRate: '30%',
                    num: 23796
                },
                {
                    index: 2,
                    userName: 'Blue',
                    userImg: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1524227131869&di=dcca65d33e7ce856a261f31c847ddf90&imgtype=0&src=http%3A%2F%2Fimgsrc.baidu.com%2Fforum%2Fw%253D580%2Fsign%3D7d86311748ed2e73fce98624b703a16d%2Fcb514fc2d5628535ae210cb292ef76c6a6ef6365.jpg",
                    userLevel: 33,
                    winRate: '40%',
                    num: 23796
                },
                {
                    index: 3,
                    userName: 'Rover',
                    userImg: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1524227131869&di=dcca65d33e7ce856a261f31c847ddf90&imgtype=0&src=http%3A%2F%2Fimgsrc.baidu.com%2Fforum%2Fw%253D580%2Fsign%3D7d86311748ed2e73fce98624b703a16d%2Fcb514fc2d5628535ae210cb292ef76c6a6ef6365.jpg",
                    userLevel: 33,
                    winRate: '50%',
                    num: 23796
                },
                {
                    index: 4,
                    userName: 'Blue',
                    userImg: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1524227131869&di=dcca65d33e7ce856a261f31c847ddf90&imgtype=0&src=http%3A%2F%2Fimgsrc.baidu.com%2Fforum%2Fw%253D580%2Fsign%3D7d86311748ed2e73fce98624b703a16d%2Fcb514fc2d5628535ae210cb292ef76c6a6ef6365.jpg",
                    userLevel: 33,
                    winRate: '60%',
                    num: 23796
                },
                {
                    index: 5,
                    userName: 'Rover',
                    userImg: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1524227131869&di=dcca65d33e7ce856a261f31c847ddf90&imgtype=0&src=http%3A%2F%2Fimgsrc.baidu.com%2Fforum%2Fw%253D580%2Fsign%3D7d86311748ed2e73fce98624b703a16d%2Fcb514fc2d5628535ae210cb292ef76c6a6ef6365.jpg",
                    userLevel: 33,
                    winRate: '70%',
                    num: 23796
                },
                {
                    index: 6,
                    userName: 'Blue',
                    userImg: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1524227131869&di=dcca65d33e7ce856a261f31c847ddf90&imgtype=0&src=http%3A%2F%2Fimgsrc.baidu.com%2Fforum%2Fw%253D580%2Fsign%3D7d86311748ed2e73fce98624b703a16d%2Fcb514fc2d5628535ae210cb292ef76c6a6ef6365.jpg",
                    userLevel: 33,
                    winRate: '80%',
                    num: 23796
                }],
            list2: [
                {
                    index: 1,
                    userName: '皮皮',
                    userImg: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1524227131869&di=dcca65d33e7ce856a261f31c847ddf90&imgtype=0&src=http%3A%2F%2Fimgsrc.baidu.com%2Fforum%2Fw%253D580%2Fsign%3D7d86311748ed2e73fce98624b703a16d%2Fcb514fc2d5628535ae210cb292ef76c6a6ef6365.jpg",
                    userLevel: 33,
                    winRate: '30%',
                    num: 23796
                },
                {
                    index: 2,
                    userName: '皮蛋',
                    userImg: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1524227131869&di=dcca65d33e7ce856a261f31c847ddf90&imgtype=0&src=http%3A%2F%2Fimgsrc.baidu.com%2Fforum%2Fw%253D580%2Fsign%3D7d86311748ed2e73fce98624b703a16d%2Fcb514fc2d5628535ae210cb292ef76c6a6ef6365.jpg",
                    userLevel: 33,
                    winRate: '40%',
                    num: 23796
                },
                {
                    index: 3,
                    userName: 'Rover',
                    userImg: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1524227131869&di=dcca65d33e7ce856a261f31c847ddf90&imgtype=0&src=http%3A%2F%2Fimgsrc.baidu.com%2Fforum%2Fw%253D580%2Fsign%3D7d86311748ed2e73fce98624b703a16d%2Fcb514fc2d5628535ae210cb292ef76c6a6ef6365.jpg",
                    userLevel: 33,
                    winRate: '50%',
                    num: 23796
                },
                {
                    index: 4,
                    userName: 'Blue',
                    userImg: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1524227131869&di=dcca65d33e7ce856a261f31c847ddf90&imgtype=0&src=http%3A%2F%2Fimgsrc.baidu.com%2Fforum%2Fw%253D580%2Fsign%3D7d86311748ed2e73fce98624b703a16d%2Fcb514fc2d5628535ae210cb292ef76c6a6ef6365.jpg",
                    userLevel: 33,
                    winRate: '60%',
                    num: 23796
                }]
        }

    }

    componentDidMount() {
        this.props.initData()
    }

    TabExample(list) {
        let listDetail = list.map((item) => {
            let rankNum = ""
            if(item.index==1){
                rankNum = "rank_num_orange"
            }else if(item.index==2){
                rankNum = "rank_num_blue"
            }else if(item.index==3){
                rankNum = "rank_num_gray"
            }else{
                rankNum = ""
            }
            return (<Item key={item.index}>
                <div>
                    <span className={rankNum}>{item.index}</span>
                    <img src={item.userImg} alt="头像" />
                    <span>{item.userName}</span>
                    <div></div>
                    <div>LV {item.userLevel}</div>
                </div>
                <div className="rate_part">
                    <p>{item.winRate}</p>
                    <div>
                        <span style={{"width":item.winRate}}></span>
                        <label></label>
                    </div>
                </div>
                <div>{item.num}</div>
            </Item>)
        })

        return (
            <div>
                <div className="list-title">
                    <div>&nbsp;&nbsp;&nbsp;&nbsp;玩家</div><div>胜率</div><div>下注</div>
                </div>
                {listDetail}
            </div>
        )
    }

    render() {

        // const { getFieldProps, getFieldError } = this.props.form;
        console.log(this.props)
        return (
            <div styleName="wrap">
                <NavBar
                    mode="light"
                    icon={<Icon type="left" />}
                    onLeftClick={() => this.props.history.goBack()}
                >排名</NavBar>
                <div className="container">
                    <Tabs tabs={tabs2}
                        initialPage={1}
                        onChange={(tab, index) => { console.log('onChange', index, tab); }}
                        onTabClick={(tab, index) => { console.log('onTabClick', index, tab); }}
                    >

                        <List className="beacon-list">
                            {this.TabExample(this.state.list1)}
                        </List>

                        <List className="beacon-list">
                            {this.TabExample(this.state.list2)}
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