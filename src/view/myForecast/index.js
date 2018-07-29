import { connect } from 'react-redux'
import myForecastComponent from './myForecast-component'
import { getMyGuessRecords } from '../../reducers/rank'

const mapDispatchToProps = (dispatch, props) => {
    return {

        goListPage() {
            props.history.push('/list')
        },

        getGuessRecord(data, callback) {
            getMyGuessRecords(data, callback)
        }
    }
}

const mapStateToProps = (state) => {
    return {
        userInfos: state.UserReducer.userInfos,
        guessRecordWeek: state.RankReducer.guessRecordWeek,
        guessRecordDay: state.RankReducer.guessRecordDay,
    }
}


const myForecast = connect(
    mapStateToProps,
    mapDispatchToProps
)(myForecastComponent)

export default myForecast;