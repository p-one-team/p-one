import matchDetailComponent from './match-detail-component'
import { connect } from 'react-redux'

const mapDispatchToProps = (dispatch, props) => {
    return {
        initData() {
            //console.log('init index')
        },

        goShop() {
            props.history.push('/shop')
        }
    }
}

const mapStateToProps = (state) => {
    return {
        gameItemInfos: state.MatchReducer.gameItemInfos,
        userInfos: state.UserReducer.userInfos
    }
}

const matchDetail = connect(
    mapStateToProps,
    mapDispatchToProps
)(matchDetailComponent)

export default matchDetail