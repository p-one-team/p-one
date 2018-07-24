import { connect } from 'react-redux'
import MatchComponent from './match-component'
import { getGameItems, getGameItemInfo } from '../../reducers/match'
import store from '../../store'

const mapDispatchToProps = (dispatch, props) => {
    return {

        goMatchDetail(id) {
            store.dispatch({
                type: 'GAME_ITEM_ID',
                gameItemId: id
            })
            
            getGameItemInfo(id, () => {
                props.history.push('/matchDetail')
            })
        },

        showGameDetail(gameId) {
            getGameItems(gameId)
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
                type:"MALL_LIST_PARAM",
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
        userInfos: state.UserReducer.userInfos
    }
}

const Match = connect(
    mapStateToProps,
    mapDispatchToProps
)(MatchComponent)

export default Match;