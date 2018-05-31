import { connect } from 'react-redux'
import MatchComponent from './match-component'
import {getGameTypes} from '../../reducers/match.js'

const mapDispatchToProps = (dispatch, props) => {
    return {
        initData() {
            getGameTypes()
        },

        goMatchDetail(id){
            console.log("match",id)
            // props.history.push('/matchDetail')
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