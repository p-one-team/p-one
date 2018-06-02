import React from 'react'
import CSSModules from 'react-css-modules'
import style from './match-list.less'

// const data = [
//     {
//         GameID: 1,
//         GameTitle: "屌丝逆袭战",
//         GameDate: "-12前",
//         BeginDate: "2018-05-20 22:00:00",
//         EndDate: "2018-05-20 23:30:00",
//         IsForecast: true,
//         GameTeam: {
//             LeftTeamID: 1,
//             LeftTeamName: "LDG",
//             LeftTeamImage: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1524217866821&di=05b8bec97c5c389eb61e8489e7cff0e6&imgtype=0&src=http%3A%2F%2Fimg.mp.itc.cn%2Fupload%2F20160826%2F33eeaffa10474fd0a852ded77ab5de04_th.jpg",
//             LeftTeamResult: "0",
//             LeftTeamOdds: "",
//             LeftTeamRate: "",
//             LeftProfit: 0,
//             RightTeamID: 2,
//             RightTeamName: "EHOME",
//             RightTeamImage: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1524812329&di=541821e4fec802ad0e5bfa0fe06ad7e9&imgtype=jpg&er=1&src=http%3A%2F%2Fdota2.wanmei.com%2Fresources%2Fpng%2F150113%2F10251421135707960.png",
//             RightTeamResult: "0",
//             RightTeamOdds: "",
//             RightTeamRate: "",
//             RightProfit: 0
//         },
//     },
//     {
//         GameID: 2,
//         GameTitle: "屌丝逆袭战",
//         GameDate: "-12前",
//         BeginDate: "2018-05-20 22:00:00",
//         EndDate: "2018-05-20 23:30:00",
//         IsForecast: false,
//         GameTeam: {
//             LeftTeamID: 1,
//             LeftTeamName: "LDG",
//             LeftTeamImage: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1524217866821&di=05b8bec97c5c389eb61e8489e7cff0e6&imgtype=0&src=http%3A%2F%2Fimg.mp.itc.cn%2Fupload%2F20160826%2F33eeaffa10474fd0a852ded77ab5de04_th.jpg",
//             LeftTeamResult: "0",
//             LeftTeamOdds: "",
//             LeftTeamRate: "",
//             LeftProfit: 0,
//             RightTeamID: 2,
//             RightTeamName: "EHOME",
//             RightTeamImage: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1524812329&di=541821e4fec802ad0e5bfa0fe06ad7e9&imgtype=jpg&er=1&src=http%3A%2F%2Fdota2.wanmei.com%2Fresources%2Fpng%2F150113%2F10251421135707960.png",
//             RightTeamResult: "0",
//             RightTeamOdds: "",
//             RightTeamRate: "",
//             RightProfit: 0
//         },
//     }
// ];

@CSSModules(style, { handleNotFoundStyleName: 'ignore' })
class MatchList extends React.Component {
    constructor(props) {
        super(props);

        let _gameList = this.props.detailList;
        _gameList.map((item)=>{
            item.isShowDetail = false;
            item.gameItemList = []
        })

        this.state = {
            gameList: _gameList
        }
    }

    componentWillReceiveProps(nextProps){
        let _gameItems = nextProps.gameItems
        let _gameList = nextProps.detailList
        _gameList.map((item)=>{
            if(item.GameID == _gameItems.gameId){
                item.gameItemList = _gameItems.itemList
                item.isShowDetail = true
            }else{
                item.gameItemList = []
                item.isShowDetail = false
            }
        })

        this.setState = {
            gameList: _gameList
        }
    }

    //主列表
    buildGameList = (list) => {
        let gameList = list.map((item) => (
            <li key={item.GameID} className={style.matchItem} onClick={() => this.props.showGameDetail(item.GameID)}>
                <div className={style.content}>

                    <div className={style.itemL + " " + style.itemImg}>
                        <img src={item.GameTeam.LeftTeamImage} alt="" />
                        <div>{item.GameTeam.LeftTeamName}</div>
                    </div>

                    {item.IsForecast ? (<div className={style.descript}>
                        <p>{item.GameTitle}</p>
                        <p className={style.blackBg}>可预测</p>
                        <p className={style.blackWord}>{item.GameDate}</p>
                    </div>)
                        : (<div className={style.descript}>
                            <p>{item.GameTitle}</p>
                            <p className={style.greyBg}>已结束</p>
                            <p className={style.greyWord}>{item.GameDate}</p>
                        </div>)}

                    <div className={style.itemR + " " + style.itemImg}>
                        <img src={item.GameTeam.RightTeamImage} alt="" />
                        <div>{item.GameTeam.RightTeamName}</div>
                    </div>
                </div>
                {item.isShowDetail?(<div>{item.gameItemList ? this.buildDetailList(item.gameItemList) : ""}</div>):""}
            </li>
        ))
        return gameList
    }

    //点击详情列表
    buildDetailList(list) {
        let itemList = list.map((item) => {

            let winLogoL;
            let winLogoR;
            if (!item.IsForecast) {
                if (item.winner == "1") {
                    winLogoL = style.winLogo1;
                    winLogoR = style.hide;
                } else if (item.winner == "2") {
                    winLogoL = style.hide;
                    winLogoR = style.winLogo2;
                } else {
                    winLogoL = style.hide;
                    winLogoR = style.hide;
                }
            } else {
                winLogoL = style.hide;
                winLogoR = style.hide;
            }

            return (
                <div key={item.GameItemID} className={style.oddItem} onClick={() => this.props.goMatchDetail(item.GameItemID)}>
                    <div className={style.oddValue}>
                        <p>{item.LeftOdds}</p>
                        <p>赔率</p>
                        <div className={winLogoL}>胜</div>
                    </div>

                    {item.IsForecast
                        ? (<div className={style.oddDesc}>
                            <div className={style.blackTitle}>{item.GameItemTitle}</div>
                            <p className={style.blackWord}>{item.GameItemDate}</p>
                        </div>)
                        : (<div className={style.oddDesc}>
                            <div className={style.greyTitle}>{item.GameItemTitle}</div>
                            <p className={style.greyWord}>{item.GameItemDate}</p>
                        </div>)}

                    <div className={style.oddValue}>
                        <p>{item.RightOdds}</p>
                        <p>赔率</p>
                        <div className={winLogoR}>胜</div>
                    </div>
                </div>
            )
        })
        return itemList
    }

    render() {
        return (
            <ul className={style.gameList}>{this.buildGameList(this.state.gameList)}</ul>
        );
    }
}

export default MatchList