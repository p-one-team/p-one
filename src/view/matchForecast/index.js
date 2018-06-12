import MatchForecastComponent from './component'
import { connect } from 'react-redux'

const mapDispatchToProps = (dispatch, props) => {
    return {
        goList() {
            props.history.push('/list')
        }
    }
}

const mapStateToProps = (state) => {
    return {
        gameItemId: state.MatchReducer.gameItemId,
        gameItemInfos: state.MatchReducer.gameItemInfos,
    }
}

const MatchForecast = connect(
    mapStateToProps,
    mapDispatchToProps
)(MatchForecastComponent)

export default MatchForecast