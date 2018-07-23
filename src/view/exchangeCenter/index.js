import { connect } from 'react-redux'
import ExchangeComponent from './exchange-component'

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

const ExchangeCenter = connect(
    mapStateToProps,
    mapDispatchToProps
)(ExchangeComponent)

export default ExchangeCenter;