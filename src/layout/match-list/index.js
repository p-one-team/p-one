import { connect } from 'react-redux'
// import _ut from 'my-util'
import { changePage } from 'reducers/main'
import MatchListWrapper from './component.js'

const mapDispatchToProps = (dispatch) => {
    return {
        changePage(pageText) {
            dispatch(changePage(pageText))
        }
    }
}

const mapStateToProps = (state) => {

    return {
        currentPage: state.MainInfoReducer.currentPage,
        hidden: false
    }
}

const MatchList = connect(
    mapStateToProps,
    mapDispatchToProps
)(MatchListWrapper)

export default MatchList;