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

    mySubString = (str, len) => {
        var newLength = 0;
        var newStr = "";
        var singleChar = "";
        var strLength = str.replace(/[\u4e00-\u9fa5]/g, "**").length;
        for (var i = 0; i < strLength; i++) {
            singleChar = str.charAt(i).toString();
            if (singleChar.match(/[\u4e00-\u9fa5]/g) != null) {
                newLength += 2;
            } else {
                newLength++;
            }
            if (newLength > len) {
                break;
            }
            newStr += singleChar;
        }

        if (strLength > len) {
            return newStr + "...";
        } else {
            return newStr;
        }
    }

    //主列表
    buildGameList = (list) => {
        let gameList = list.map((item) => {
            let status,bgColor,wordColor;
            if(item.GameStatus==0) {
                status = "不可预测"
                bgColor = style.greyBg;
                wordColor = style.greyWord;
            }else if(item.GameStatus==1) {
                status = "可预测"
                bgColor = style.greenBg;
                wordColor = style.blackWord;
            }else if(item.GameStatus==2) {
                status = "即将开始"
                bgColor = style.greenBg;
                wordColor = style.blackWord;
            }else if(item.GameStatus==3) {
                status = "比赛中"
                bgColor = style.redBg;
                wordColor = style.blackWord;
            }else if(item.GameStatus==4) {
                status = "比赛结束"
                bgColor = style.greyBg;
                wordColor = style.greyWord;
            }

            return (<li key={item.GameID} className={style.matchItem} onClick={() =>this.showDetail(item.isShowDetail,item.GameID)}>
                <div className={style.content}>

                    <div className={style.itemL + " " + style.itemImg}>
                        <img src={item.GameTeam.LeftTeamImage} alt="" />
                        <div>{item.GameTeam.LeftTeamName}</div>
                    </div>
                    
                    <div className={style.leftScore}>{item.GameStatus==4 ? item.GameTeam.LeftTeamScore : ""}</div>

                    <div className={style.descript}>
                        <p>{this.mySubString(item.GameTitle,16)}</p>
                        <p className={bgColor}>{status}</p>
                        <p className={wordColor}>{item.GameDate}</p>
                    </div>

                    <div className={style.rightScore}>{item.GameStatus==4 ? item.GameTeam.RightTeamScore : ""}</div>

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
    buildDetailList = (list) => (list.map((item) => {
        let isOver = item.GameStatus==4||item.GameStatus==5||item.GameStatus==6 ? true : false;
        let titleColor,wordColor;
        if(item.GameStatus==1||item.GameStatus==2){
            titleColor = style.greenTitle;
            wordColor = style.blackWord;
        }else if(item.GameStatus==3){
            titleColor = style.redTitle;
            wordColor = style.blackWord;
        }else if(item.GameStatus==4||item.GameStatus==5||item.GameStatus==6||item.GameStatus==10){
            titleColor = style.greyTitle;
            wordColor = style.greyWord;
        }

        return (<div key={item.GameItemID} className={style.oddItem} onClick={() => this.props.goMatchDetail(item.GameItemID)}>
            <div className={style.oddValue}>
                <p>{item.LeftOdds}</p>
                <p>赔率</p>
                {isOver&&item.GameResult==1 ? <div className={style.winLogo1}>胜</div> : null}
            </div>

            <div className={style.oddDesc}>
                <div className={titleColor}>{item.GameItemTitle}</div>
                <p className={wordColor}>{item.GameItemDate}</p>
            </div>

            <div className={style.oddValue}>
                <p>{item.RightOdds}</p>
                <p>赔率</p>
                {isOver&&item.GameResult==2 ? <div className={style.winLogo2}>胜</div> : null}
            </div>
        </div>)
    }))

    render() {
        return (
            <ul className={style.gameList}>{this.buildGameList(this.state.outerList)}</ul>
        );
    }
}

export default MatchList