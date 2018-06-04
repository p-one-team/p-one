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
                PageIndex: data.PageIndex
            })
        }

        
    }
}

const mapStateToProps = (state) => {
    return {
        guessRank: state.RankReducer.guessRank
    }
}


const GuessRank = connect(
    mapStateToProps,
    mapDispatchToProps
)(GuessRankComponentWrapper)

export default GuessRank;