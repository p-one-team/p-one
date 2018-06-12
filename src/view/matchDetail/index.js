import matchDetailComponent from './match-detail-component'
import { connect } from 'react-redux'
import { getOrnamentsGuessOfGameItem,getTBeansGuessOfGameItem,getVulgarTycoonGuessOfGameItem } from '../../reducers/match'

const mapDispatchToProps = (dispatch, props) => {
    return {
        goForecast() {
            props.history.push('/matchForecast')
        },

        getGuessList(id){
            getOrnamentsGuessOfGameItem({
                HandicapID: id,
                PageIndex: 0
            })
            getTBeansGuessOfGameItem({
                HandicapID: id,
                PageIndex: 0
            })
            getVulgarTycoonGuessOfGameItem({
                HandicapID: id,
                PageIndex: 0
            })
        }
    }
}

const mapStateToProps = (state) => {
    return {
        gameItemId: state.MatchReducer.gameItemId,
        gameItemInfos: state.MatchReducer.gameItemInfos,
        gameItemOrnamentsGuessInfo: state.MatchReducer.gameItemOrnamentsGuessInfo,
        gameItemTBeansGuessInfo: state.MatchReducer.gameItemTBeansGuessInfo,
        gameItemTycoonGuessInfo: state.MatchReducer.gameItemTycoonGuessInfo,
    }
}

const matchDetail = connect(
    mapStateToProps,
    mapDispatchToProps
)(matchDetailComponent)

export default matchDetail