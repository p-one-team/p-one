import { connect } from 'react-redux'
import ExchangeComponent from './exchange-component'

const mapDispatchToProps = (dispatch, props) => {
    return {

        goExchangeTbeans() {
            props.history.push('/exchangeTbeans')
        },
    }
}

const mapStateToProps = (state) => {
    return {
        userInfos: state.UserReducer.userInfos
    }
}

const ExchangeCenter = connect(
    mapStateToProps,
    mapDispatchToProps
)(ExchangeComponent)

export default ExchangeCenter;