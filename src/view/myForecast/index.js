import { connect } from 'react-redux'
import myForecastComponent from './myForecast-component'

const mapDispatchToProps = (dispatch, props) => {
    return {
        initData() {
            console.log('init inventory')
        },
        goListPage() {
            props.history.push('/list')
        }
    }
}

const mapStateToProps = (state) => {
    return {
        ...state.HomeReducer
    }
}


const myForecast = connect(
    mapStateToProps,
    mapDispatchToProps
)(myForecastComponent)

export default myForecast;