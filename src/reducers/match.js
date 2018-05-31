import axios from '../https'
import { Toast } from 'antd-mobile'
import store from '../store'

/*-----------------------------------------------------------------*/
/*User Reducer*/
/*-----------------------------------------------------------------*/
const initMatchInfo = {
    gameTypes: [],
    gameInfos: [],
    gameItems: []
}

const MatchReducer = (state = initMatchInfo, action) => {
    switch (action.type) {
        case 'GAME_TYPE':
            return Object.assign({}, state, { gameTypes: action.gameTypes })
        case 'GAME_INFO':
            return Object.assign({}, state, { gameInfos: action.gameInfos })
        case 'GAME_ITEM':
            return Object.assign({}, state, { gameItems: action.gameItems })
        default:
            return state
    }
}


/*-----------------------------------------------------------------*/
/*User Action*/
/*-----------------------------------------------------------------*/
const getGameTypes = () => {
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
    axios.post("/Game/GetGameInfos", {
        GameType: type
    })
    .then(function(res) {
        if (res) {
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

const getGameItems = (id) => {
    axios.post("/Game/GetGameItems", {
        AgendaId: id
    })
    .then(function(res) {
        if (res) {
            store.dispatch({
                type: 'GAME_ITEM',
                gameItems: res.Data.GameItems
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
    getGameInfos,
    getGameItems
}