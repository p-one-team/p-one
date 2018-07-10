import { connect } from 'react-redux'
import FeedbackComponent from './feedback-component'
import { feedback } from '../../reducers/user'

const mapDispatchToProps = (dispatch, props) => {
    return {
        feedBack(data,callback){
            feedback(data,callback)
        },

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