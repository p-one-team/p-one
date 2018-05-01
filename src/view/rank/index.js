import { connect } from 'react-redux'
import RankComponentWrapper from './rank-component.js'

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


const Rank = connect(
    mapStateToProps,
    mapDispatchToProps
)(RankComponentWrapper)

export default Rank;