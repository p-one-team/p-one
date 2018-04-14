import React from 'react'
import { connect } from 'react-redux'
import signUpComponent from './signUp-component.js'

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
)(signUpComponent)

export default signUp;