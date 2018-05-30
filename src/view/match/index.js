import React from 'react'
import { connect } from 'react-redux'
import Dialog from 'mo-dialog'
import MatchComponent from './match-component'
import {getGameTypes} from '../../reducers/match.js'

const mapDispatchToProps = (dispatch, props) => {
    return {
        initData() {
            getGameTypes()
        },

        goListPage() {
            props.history.push('/list')
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
        goMiaoPage() {
            props.history.push('/miao')
        },
        goShop() {
            props.history.push('/shop')
        },
        openDialog() {
            Dialog.alert(<p>Hello from the <b style={{ color: "#f496ce" }}>Moon~</b></p>)
        }
    }
}

const mapStateToProps = (state) => {
    return {
        gameTypes: state.MatchReducer.gameTypes
    }
}


const Match = connect(
    mapStateToProps,
    mapDispatchToProps
)(MatchComponent)

export default Match;