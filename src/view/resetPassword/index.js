import { connect } from 'react-redux'
import resetPsdComponentWrapper from './resetPsd-component.js'
import { getMsgCode, resetPsdAction } from '../../reducers/user'

const mapDispatchToProps = (dispatch, props) => {
    return {
        goList(){
            props.history.push('/')
        },

        resetPsd(data,callback) {
            resetPsdAction(data, callback)
        },

        getCode(data) {
            getMsgCode(data)
        }
    }
}

const mapStateToProps = (state) => {
    return {
        ...state.UserReducer
    }
}


const ResetPassword = connect(
    mapStateToProps,
    mapDispatchToProps
)(resetPsdComponentWrapper)

export default ResetPassword;