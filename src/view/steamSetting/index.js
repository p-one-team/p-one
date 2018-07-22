import { connect } from 'react-redux'
import SteamSetComponent from './steamSet-component'

const mapDispatchToProps = (dispatch, props) => {
    return {
        goRankPage() {
            props.history.push('/guessRank')
        },
    }
}

const mapStateToProps = (state) => {
    return {
        userInfos: state.UserReducer.userInfos
    }
}

const SteamSetting = connect(
    mapStateToProps,
    mapDispatchToProps
)(SteamSetComponent)

export default SteamSetting;