import matchDetailComponent from './match-detail-component'
import { connect } from 'react-redux'
import { getUserGuessList,cancelMyGuess,changeMyGuess,getOrnamentsGuessOfGameItem,getTBeansGuessOfGameItem,getVulgarTycoonGuessOfGameItem } from '../../reducers/match'

const mapDispatchToProps = (dispatch, props) => {
    return {
        getUserGuessList(data,callback){
            getUserGuessList(data,callback)            
        },

        cancelMyGuess(data,callback){
            cancelMyGuess(data,callback)
        },

        changeMyGuess(data,callback){
            changeMyGuess(data,callback)
        },

        goForecast() {
            props.history.push('/matchForecast')
        },

        getOrnamentsGuessList(data,callback){
            getOrnamentsGuessOfGameItem(data,callback)
        },

        getTBeansGuessList(data,callback){
            getTBeansGuessOfGameItem(data,callback)
        },

        getTycoonGuessList(data,callback){
            getVulgarTycoonGuessOfGameItem(data,callback)
        },
    }
}

const mapStateToProps = (state) => {
    return {
        userGuessList: state.MatchReducer.userGuessList,
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