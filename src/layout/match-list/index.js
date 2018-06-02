import { connect } from 'react-redux'
import MatchListWrapper from './list-component.js'


const mapDispatchToProps = (dispatch, props) => {

    return {
        initData() {
            console.log(props)
        },
    }
}

const mapStateToProps = (state) => {

    return {
        ...state.MatchReducer
    }
}

const MatchList = connect(
    mapStateToProps,
    mapDispatchToProps
)(MatchListWrapper)

export default MatchList;