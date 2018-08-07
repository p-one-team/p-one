import { connect } from 'react-redux'
import signUpComponentWrapper from './signUp-component.js'
import { getMsgCode, registerAction } from '../../reducers/user'

const mapDispatchToProps = (dispatch, props) => {
    return {
        goProtocol() {
            props.history.push('/protocol')
        },

        register(data) {
            registerAction(data, function() {
                props.history.replace('/')
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