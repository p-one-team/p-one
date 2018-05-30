import { connect } from 'react-redux'
// import _ut from 'my-util'
import { changePage } from '../../reducers/main'
import TabBarExample from './component.js'
import {getGameInfos} from '../../reducers/match.js'

const mapDispatchToProps = (dispatch) => {
    return {
        changePage(pageText) {
            dispatch(changePage(pageText))
        },

        changeGameInfo(code) {
            getGameInfos(code)
        }

    }
}

const mapStateToProps = (state) => {

    return {
        gameInfos: state.MatchReducer.gameInfos,
        currentPage: state.MainInfoReducer.currentPage,
        hidden: false
    }
}

const BottomTab = connect(
    mapStateToProps,
    mapDispatchToProps
)(TabBarExample)

export default BottomTab;