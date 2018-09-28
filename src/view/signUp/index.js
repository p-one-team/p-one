import { connect } from 'react-redux'
import signUpComponentWrapper from './signUp-component.js'
import { getMsgCode, registerAction, isShowGame } from '../../reducers/user'

const mapDispatchToProps = (dispatch, props) => {
    return {
        goProtocol() {
            window.register = "protocol"
            props.history.replace('/')
        },

        register(data) {
            registerAction(data, function() {
                props.history.replace('/')
                isShowGame()
            })
        },

        getCode(data) {
            getMsgCode(data)
        }
    }
}

const mapStateToProps = (state) => {
    return {
        ...state.HomeReducer
    }
}


const signUp = connect(
    mapStateToProps,
    mapDispatchToProps
)(signUpComponentWrapper)

export default signUp;