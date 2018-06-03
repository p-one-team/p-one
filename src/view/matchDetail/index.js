import matchDetailComponent from './match-detail-component'
import { connect } from 'react-redux'
import { getOrnamentsGuessOfGameItem } from '../../reducers/match'

const mapDispatchToProps = (dispatch, props) => {
    return {
        initData() {
            //console.log('init index')
        },

        goShop() {
            props.history.push('/shop')
        },

        getGuessList(tab,id){
            if(tab=="ornaments"){
                getOrnamentsGuessOfGameItem({
                    HandicapID: id,
                    PageIndex: 0
                })
            }
        }


    }
}

const mapStateToProps = (state) => {
    return {
        gameItemId: state.MatchReducer.gameItemId,
        gameItemInfos: state.MatchReducer.gameItemInfos,
        gameItemOrnamentsGuessInfo: state.MatchReducer.gameItemOrnamentsGuessInfo,
        userInfos: state.UserReducer.userInfos
    }
}

const matchDetail = connect(
    mapStateToProps,
    mapDispatchToProps
)(matchDetailComponent)

export default matchDetail