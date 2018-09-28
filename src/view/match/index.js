import { connect } from 'react-redux'
import MatchComponent from './match-component'
import { getGameItems, getGameItemInfo } from '../../reducers/match'
import store from '../../store'
import { refreshUserInfo, isShowGame } from '../../reducers/user'

const mapDispatchToProps = (dispatch, props) => {
    return {

        refreshUserInfo(data, callback) {
            refreshUserInfo(data, ()=>{
                callback ? callback() : null;
                isShowGame()
            })
        },

        goMatchDetail(id) {
            store.dispatch({
                type: 'GAME_ITEM_ID',
                gameItemId: id
            })

            getGameItemInfo(id, () => {
                props.history.push('/matchDetail')
            })
        },

        showGameDetail(gameId,callback) {
            getGameItems(gameId,callback)
        },

        goRankPage() {
            props.history.push('/guessRank')
        },

        goInventoryPage() {
            props.history.push('/inventory')
        },

        goMyForecastPage() {
            props.history.push('/myForecast')
        },

        goShop() {
            store.dispatch({
                type: "MALL_LIST_PARAM",
                paramSectionType: 2,
                paramAttributeId: 0,
                paramAttributeValue: "",
                paramKeywords: "",
                paramPageIndex: 1
            })
            props.history.push('/shop')
        },

        goSteamSetting() {
            props.history.push('/steamSetting')
        },
    }
}

const mapStateToProps = (state) => {
    return {
        userInfos: state.UserReducer.userInfos,
        userSteamAlert: state.UserReducer.userSteamAlert,
        userUrlAlert: state.UserReducer.userUrlAlert
    }
}

const Match = connect(
    mapStateToProps,
    mapDispatchToProps
)(MatchComponent)

export default Match;