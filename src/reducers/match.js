import axios from '../https'
import { Toast } from 'antd-mobile'
import store from '../store'

/*-----------------------------------------------------------------*/
/*User Reducer*/
/*-----------------------------------------------------------------*/
const initMatchInfo = {
    gameTypes: [],
    gameInfos: []
}

const MatchReducer = (state = initMatchInfo, action) => {
    switch (action.type) {
        case 'GAME_TYPE':
            return Object.assign({}, state, { gameTypes: action.gameTypes })
        case 'GAME_INFO':
            return Object.assign({}, state, { gameInfos: action.gameInfos })
        default:
            return state
    }
}


/*-----------------------------------------------------------------*/
/*User Action*/
/*-----------------------------------------------------------------*/
const getGameTypes = () => {
    console.log("match请求：",window.token)
    axios.post("/Game/GetGameTypes", {
        //无需参数
    })
    .then(function(res) {
        if (res) {
            store.dispatch({
                type: 'GAME_TYPE',
                gameTypes: res.Data.GameTypeModels
            })
        }
    })
    .catch(function(error) {
        Toast.fail('获取失败，请稍后重试！');
        console.log('error', error);
    });
}

const getGameInfos = (type) => {
    console.log(type)
    axios.post("/Game/GetGameInfos", {
        GameType: type
    })
    .then(function(res) {
        if (res) {
            console.log(res.Data)
            store.dispatch({
                type: 'GAME_INFO',
                gameInfos: res.Data.GameInfos
            })
        }
    })
    .catch(function(error) {
        Toast.fail('获取失败，请稍后重试！');
        console.log('error', error);
    });
}


export {
    MatchReducer,
    getGameTypes,
    getGameInfos
}