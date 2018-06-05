import { connect } from 'react-redux'
import MatchComponent from './match-component'
import { getGameItems, getGameItemInfo } from '../../reducers/match'
import { getMallList } from '../../reducers/shop'
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
            getMallList({
                GameType: "570",
				AttributeID: 1,
				AttributeValue: "",
				KeyWords: "",
				PageIndex: 0,
				PageSize: 10
            },() => {
                props.history.push('/shop')
            })
        }
    }
}

const mapStateToProps = (state) => {
    return {
        ...state.MatchReducer
    }
}

const Match = connect(
    mapStateToProps,
    mapDispatchToProps
)(MatchComponent)

export default Match;