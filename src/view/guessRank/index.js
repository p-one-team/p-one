import { connect } from 'react-redux'
import GuessRankComponentWrapper from './rank-component.js'
import { getGuessRank } from '../../reducers/rank'

const mapDispatchToProps = (dispatch, props) => {
    return {
        goListPage() {
            props.history.push('/list')
        },

        getGuessRanking(data){
            getGuessRank({
                RankingType: data.RankingType
            })
        }

        
    }
}

const mapStateToProps = (state) => {
    return {
        guessRankLight: state.RankReducer.guessRankLight,
        guessRankDark: state.RankReducer.guessRankDark
    }
}


const GuessRank = connect(
    mapStateToProps,
    mapDispatchToProps
)(GuessRankComponentWrapper)

export default GuessRank;