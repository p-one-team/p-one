import { connect } from 'react-redux'
import MatchListWrapper from './list-component.js'


const mapDispatchToProps = (dispatch, props) => {

    return {
        initData() {
            console.log(props)
        },

        // showGameDetail(gameId){
        //     console.log(props)
        //     getGameItems(gameId)
        // }
    }
}

const mapStateToProps = (state) => {

    return {
        gameInfos: state.MatchReducer.gameInfos,
        gameItems: state.MatchReducer.gameItems
    }
}

const MatchList = connect(
    mapStateToProps,
    mapDispatchToProps
)(MatchListWrapper)

export default MatchList;