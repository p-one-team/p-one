import React from 'react'
import CSSModules from 'react-css-modules'
import style from './match-list.less'
import store from '../../store'

@CSSModules(style, { handleNotFoundStyleName: 'ignore' })
class MatchList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            outerList: this.props.detailList,
            innerInfo: this.props.innerInfo
        }
    }

    UNSAFE_componentWillReceiveProps(nextProps){
        this.setState({
            outerList: nextProps.detailList,
            innerInfo: nextProps.detailItem
        })
    }

    showDetail = (isShowDetail,id) => {
        if(isShowDetail){
            let _outList = this.state.outerList;
            _outList.map((item)=>{
                if(item.GameID == id){
                    item.gameItemList = []
                    item.isShowDetail = false
                }
            })
            store.dispatch({
                type: 'GAME_ITEM',
                gameItems: {}
            })
        }else{
            this.props.showGameDetail(id,()=>{
                let _gameItems = this.props.detailItem;
                let _gameList = this.state.outerList;
                _gameList.map((item)=>{
                    if(item.GameID == _gameItems.gameId){
                        item.gameItemList = _gameItems.itemList
                        item.isShowDetail = true
                    }else{
                        item.gameItemList = []
                        item.isShowDetail = false
                    }
                })
                this.setState({
                    outerList: _gameList,
                    innerInfo: this.props.detailItem
                })
            })
        }
    }

    //主列表
    buildGameList = (list) => {
        let gameList = list.map((item) => {
            return (<li key={item.GameID} className={style.matchItem} onClick={() =>this.showDetail(item.isShowDetail,item.GameID)}>
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
            </li>)
        })
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
            <ul className={style.gameList}>{this.buildGameList(this.state.outerList)}</ul>
        );
    }
}

export default MatchList