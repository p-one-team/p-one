import { connect } from 'react-redux'
import MatchComponent from './match-component'
import { getGameItems, getGameItemInfo } from '../../reducers/match.js'

const mapDispatchToProps = (dispatch, props) => {
    return {
        initData() {
            //console.log("init data")
        },

        goMatchDetail(id) {
            getGameItemInfo(id, () => {
                props.history.push('/matchDetail')
            })
        },

        showGameDetail(gameId) {
            getGameItems(gameId)
        },

        goRankPage() {
            props.history.push('/rank')
        },

        goInventoryPage() {
            props.history.push('/inventory')
        },

        goMyForecastPage() {
            props.history.push('/myForecast')
        },

        goShop() {
            props.history.push('/shop')
        }
    }
}

const mapStateToProps = (state) => {
    return {
        ...state.HomeReducer
    }
}

const Match = connect(
    mapStateToProps,
    mapDispatchToProps
)(MatchComponent)

export default Match;