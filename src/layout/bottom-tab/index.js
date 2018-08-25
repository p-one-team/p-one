import { connect } from 'react-redux'
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
        userInfos: state.UserReducer.userInfos,
        gameInfos_570: state.MatchReducer.gameInfos_570,
        gameInfos_730: state.MatchReducer.gameInfos_730,
        gameInfos_lol: state.MatchReducer.gameInfos_lol,
        gameInfos_Sports: state.MatchReducer.gameInfos_Sports,

        gameItems: state.MatchReducer.gameItems,

        currentPage: state.MainInfoReducer.currentPage,
        hidden: false
    }
}

const BottomTab = connect(
    mapStateToProps,
    mapDispatchToProps
)(TabBarExample)

export default BottomTab;