import { connect } from 'react-redux'
import FeedbackComponent from './feedback-component'

const mapDispatchToProps = (dispatch, props) => {
    return {

        goRankPage() {
            props.history.push('/guessRank')
        },
    }
}

const mapStateToProps = (state) => {
    return {
        ...state.MatchReducer
    }
}

const Feedback = connect(
    mapStateToProps,
    mapDispatchToProps
)(FeedbackComponent)

export default Feedback;