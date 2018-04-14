import { connect } from 'react-redux'
import signUpComponentWrapper from './signUp-component.js'

const mapDispatchToProps = (dispatch, props) => {
    return {
        initData() {
            console.log('init index')
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


const signUp = connect(
    mapStateToProps,
    mapDispatchToProps
)(signUpComponentWrapper)

export default signUp;