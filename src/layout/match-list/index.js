import { connect } from 'react-redux'
import MatchListWrapper from './component.js'


const mapDispatchToProps = (dispatch, props) => {

    return {
        goMatchDetail(gameId) {
            console.log(gameId)
            props.history.push('/matchDetail');
        }
    }
}

const mapStateToProps = (state) => {

    return {
        gameInfos: state.MatchReducer.gameInfos,
        
        hidden: false
    }
}

const MatchList = connect(
    mapStateToProps,
    mapDispatchToProps
)(MatchListWrapper)

export default MatchList;