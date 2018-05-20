import { connect } from 'react-redux'
import UserDetailComponent from './userdetail-component'
// import { withRouter } from 'react-router-dom'


const mapDispatchToProps = (dispatch, props) => {

    console.log(props)
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


const UserDetail = connect(
    mapStateToProps,
    mapDispatchToProps
)(UserDetailComponent)

export default UserDetail;