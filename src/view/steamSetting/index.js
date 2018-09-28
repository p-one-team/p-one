import { connect } from 'react-redux'
import SteamSetComponent from './steamSet-component'
import { updateSteamUrl,refreshUserInfo, isShowGame } from '../../reducers/user'

const mapDispatchToProps = (dispatch, props) => {
    return {
        goRankPage() {
            props.history.push('/guessRank')
        },

        updateSteamUrl(data,callback){
            updateSteamUrl(data,callback)
        },

        refreshUserInfo(data,callback) {
            refreshUserInfo(data,()=>{
                callback ? callback() : null;
                isShowGame()
            })
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