import { connect } from 'react-redux'
import resetPsdComponentWrapper from './resetPsd-component.js'
import { getMsgCode, resetPsdAction } from '../../reducers/user'

const mapDispatchToProps = (dispatch, props) => {
    return {

        resetPsd(data) {
            resetPsdAction(data, function(){
                props.history.goBack()
            })
        },

        getCode(data) {
			getMsgCode(data)
		}
    }
}

const mapStateToProps = (state) => {
    return {
        isForgetPsd: state.UserReducer.isForgetPsd
    }
}


const ResetPassword = connect(
    mapStateToProps,
    mapDispatchToProps
)(resetPsdComponentWrapper)

export default ResetPassword;