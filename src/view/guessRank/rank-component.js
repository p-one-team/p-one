import React, { Component } from 'react'
import PropTypes from 'prop-types'
import CSSModules from 'react-css-modules'
import style from './rank.less'
import { NavBar, Icon, List } from 'antd-mobile';


const Item = List.Item;


@CSSModules(style, { handleNotFoundStyleName: 'ignore' })
class GuessRankComponentWrapper extends Component {
    constructor(props) {
        super(props)

        this.props.getGuessRanking({PageIndex:0})

    }

    TabExample(list) {
        if(list){
            let listDetail = list.map((item,index) => {
                let rankNum = ""
                if(item.Ranking==0){
                    rankNum = "rank_num_orange"
                }else if(item.Ranking==1){
                    rankNum = "rank_num_blue"
                }else if(item.Ranking==2){
                    rankNum = "rank_num_gray"
                }else{
                    rankNum = ""
                }
                return (<Item key={index}>
                    <div>
                        <span className={rankNum}>{item.Ranking+1}</span>
                        {/* <img src={item.PlayerImage} alt="头像" /> */}
                        <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1524227131869&di=dcca65d33e7ce856a261f31c847ddf90&imgtype=0&src=http%3A%2F%2Fimgsrc.baidu.com%2Fforum%2Fw%253D580%2Fsign%3D7d86311748ed2e73fce98624b703a16d%2Fcb514fc2d5628535ae210cb292ef76c6a6ef6365.jpg" />
                        <span>{item.PlayerName}</span>
                        {/* <div></div> */}
                        {/* <div>LV {item.userLevel}</div> */}
                    </div>
                    <div className="rate_part">
                        <p>{item.PlayerWinRate}</p>
                        <div>
                            <span style={{"width":item.PlayerWinRate}}></span>
                            <label></label>
                        </div>
                    </div>
                    <div>{item.PlayerIncome}</div>
                </Item>)
            })
    
            return (
                <div>
                    <div className="list-title">
                        <div>&nbsp;&nbsp;&nbsp;&nbsp;玩家</div><div>胜率</div><div>收菜</div>
                    </div>
                    {listDetail}
                </div>
            )
        }else{
            return ""
        }
    }

    render() {
        return (
            <div styleName="wrap">
                <NavBar
                    mode="light"
                    icon={<Icon type="left" />}
                    onLeftClick={() => this.props.history.goBack()}
                >收菜排行</NavBar>

                <div className="container">
                    <List className="beacon-list">
                        {this.TabExample(this.props.guessRank.Players)}
                    </List>
                </div>

            </div>
        )
    }
}

GuessRankComponentWrapper.propTypes = {
    phoneNumber: PropTypes.string,
    verificationCode: PropTypes.string
}

export default GuessRankComponentWrapper