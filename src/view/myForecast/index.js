import { connect } from 'react-redux'
import myForecastComponent from './myForecast-component'
import {getMyGuessRecords} from '../../reducers/rank'

const mapDispatchToProps = (dispatch, props) => {
    return {

        goListPage() {
            props.history.push('/list')
        },

        getGuessRecord(data){
            getMyGuessRecords(data)
        }
    }
}

const mapStateToProps = (state) => {
    return {
        guessRecordWeek: state.RankReducer.guessRecordWeek,
        guessRecordMonth: state.RankReducer.guessRecordMonth,
    }
}


const myForecast = connect(
    mapStateToProps,
    mapDispatchToProps
)(myForecastComponent)

export default myForecast;