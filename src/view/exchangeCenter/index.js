import { connect } from 'react-redux'
import ExchangeComponent from './exchange-component'
import { refreshUserInfo, isShowGame } from '../../reducers/user'

const mapDispatchToProps = (dispatch, props) => {
    return {
        refreshUserInfo(data,callback) {
            refreshUserInfo(data,()=>{
                callback ? callback() : null;
                isShowGame();
            })
        },

        goExchangeTbeans() {
            props.history.push('/exchangeTbeans')
        },
    }
}

const mapStateToProps = (state) => {
    return {
        userInfos: state.UserReducer.userInfos,
    }
}

const ExchangeCenter = connect(
    mapStateToProps,
    mapDispatchToProps
)(ExchangeComponent)

export default ExchangeCenter;