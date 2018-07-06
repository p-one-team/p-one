import axios from '../https'
import { Toast } from 'antd-mobile'
import store from '../store'

/*-----------------------------------------------------------------*/
/*User Reducer*/
/*-----------------------------------------------------------------*/
const initMatchInfo = {
    // gameTypes: [],
    gameInfos_570: [],
    gameInfos_730: [],
    gameInfos_578080: [],
    gameInfos_Sports: [],
    gameItems: {},
    gameItemId: "",
    gameItemInfos: {},
    gameItemOrnamentsGuessInfo: {},
    gameItemTBeansGuessInfo: {},
    gameItemTycoonGuessInfo: {}
}

const MatchReducer = (state = initMatchInfo, action) => {
    switch (action.type) {
        // case 'GAME_TYPE':
        //     return Object.assign({}, state, { gameTypes: action.gameTypes })

        case 'GAME_INFO_570':
            return Object.assign({}, state, { gameInfos_570: action.gameInfos_570 })
        case 'GAME_INFO_730':
            return Object.assign({}, state, { gameInfos_730: action.gameInfos_730 })
        case 'GAME_INFO_578080':
            return Object.assign({}, state, { gameInfos_578080: action.gameInfos_578080 })
        case 'GAME_INFO_Sports':
            return Object.assign({}, state, { gameInfos_Sports: action.gameInfos_Sports })

        case 'GAME_ITEM':
            return Object.assign({}, state, { gameItems: action.gameItems })
        case 'GAME_ITEM_ID':
            return Object.assign({}, state, { gameItemId: action.gameItemId })
        case 'GAME_ITEM_INFO':
            return Object.assign({}, state, { gameItemInfos: action.gameItemInfos })
        case 'GAME_ITEM_ORNAMENT_GUESS_INFO':
            return Object.assign({}, state, { gameItemOrnamentsGuessInfo: action.gameItemOrnamentsGuessInfo })
        case 'GAME_ITEM_TBEANS_GUESS_INFO':
            return Object.assign({}, state, { gameItemTBeansGuessInfo: action.gameItemTBeansGuessInfo })
        case 'GAME_ITEM_TYCOON_GUESS_INFO':
            return Object.assign({}, state, { gameItemTycoonGuessInfo: action.gameItemTycoonGuessInfo })
            
        default:
            return state
    }
}


/*-----------------------------------------------------------------*/
/*User Action*/
/*-----------------------------------------------------------------*/
// const getGameTypes = () => {
//     axios.post("/Game/GetGameTypes", {
//         //无需参数
//     })
//     .then(function(res) {
//         if (res) {
//             store.dispatch({
//                 type: 'GAME_TYPE',
//                 gameTypes: res.Data.GameTypeModels
//             })
//         }
//     })
//     .catch(function(error) {
//         Toast.fail('获取失败，请稍后重试！');
//         console.log('error', error);
//     });
// }

//赛事列表：dota csgo pubg 体育
const getGameInfos = (type) => {
    axios.post("/Game/GetGameInfos", {
        GameType: type
    })
    .then(function(res) {
        if (res) {
            switch(type){
                case "570": 
                    store.dispatch({
                        type: 'GAME_INFO_570',
                        gameInfos_570: res.Data.GameInfos
                    })
                    break;
                case "730": 
                    store.dispatch({
                        type: 'GAME_INFO_730',
                        gameInfos_730: res.Data.GameInfos
                    })
                    break;
                case "578080": 
                    store.dispatch({
                        type: 'GAME_INFO_578080',
                        gameInfos_578080: res.Data.GameInfos
                    })
                    break;
                case "Sports": 
                    store.dispatch({
                        type: 'GAME_INFO_Sports',
                        gameInfos_Sports: res.Data.GameInfos
                    })
                    break;
                default:
                    break;
            }
        }
    })
    .catch(function(error) {
        Toast.fail('获取失败，请稍后重试！');
        console.log('error', error);
    });
}

// 主赛事的预测列表
const getGameItems = (id) => {
    axios.post("/Game/GetGameItems", {
        AgendaId: id
    })
    .then(function(res) {
        if (res) {
            store.dispatch({
                type: 'GAME_ITEM',
                gameItems: {
                    gameId: id,
                    itemList: res.Data.GameItems
                }
            })
        }
    })
    .catch(function(error) {
        Toast.fail('获取失败，请稍后重试！');
        console.log('error', error);
    });
}

//赛事预测详情
const getGameItemInfo = (id, callback) => {
    axios.post("/Game/GetGameItemInfo", {
        HandicapID: id
    })
    .then(function(res) {
        if (res) {
            store.dispatch({
                type: 'GAME_ITEM_INFO',
                gameItemInfos: res.Data
            })

            callback ? callback() : ""
        }
    })
    .catch(function(error) {
        Toast.fail('获取失败，请稍后重试！');
        console.log('error', error);
    });
}

//饰品竞猜列表
const getOrnamentsGuessOfGameItem = (data, callback) => {
  axios.post("/Game/GetOrnamentsGuessOfGameItem", {
        HandicapID: data.HandicapID,
        PageIndex: data.PageIndex,
        PageSize: 50
    })
    .then(function(res) {
        if (res) {
            store.dispatch({
                type: 'GAME_ITEM_ORNAMENT_GUESS_INFO',
                gameItemOrnamentsGuessInfo: res.Data
            })

            callback ? callback() : ""
        }
    })
    .catch(function(error) {
        Toast.fail('获取失败，请稍后重试！');
        console.log('error', error);
    });
}

//T豆竞猜列表
const getTBeansGuessOfGameItem = (data,callback) => {
    axios.post("/Game/GetTBeasGuessOfGameItem", {
        HandicapID: data.HandicapID,
        PageIndex: data.PageIndex,
        PageSize: 50
    })
    .then(function(res) {
        if (res) {
            store.dispatch({
                type: 'GAME_ITEM_TBEANS_GUESS_INFO',
                gameItemTBeansGuessInfo: res.Data
            })

            callback ? callback() : ""
        }
    })
    .catch(function(error) {
        Toast.fail('获取失败，请稍后重试！');
        console.log('error', error);
    });
}

//土豪榜列表
const getVulgarTycoonGuessOfGameItem = (data,callback) => {
    axios.post("/Game/GetVulgarTycoonGuessOfGameItem", {
        HandicapID: data.HandicapID,
        PageIndex: data.PageIndex,
        PageSize: 50
    })
    .then(function(res) {
        if (res) {
            store.dispatch({
                type: 'GAME_ITEM_TYCOON_GUESS_INFO',
                gameItemTycoonGuessInfo: res.Data
            })

            callback ? callback() : ""
        }
    })
    .catch(function(error) {
        Toast.fail('获取失败，请稍后重试！');
        console.log('error', error);
    });
}

// t豆预测
const useTBeanForecast = (data,callback) => {
    axios.post("/Game/GuessTBeans", {
        TBeans: data.TBeans,
        HandicapID: data.HandicapID,
        SelectedEdge: data.SelectedEdge,
        GameTeamID: data.GameTeamID,
    })
    .then(function(res) {
        if (res) {
            console.log(res.Data)

            callback ? callback() : ""
        }
    })
    .catch(function(error) {
        Toast.fail('请求失败，请稍后重试！');
        console.log('error', error);
    });
}

// 饰品预测
const useOrnamentForecast = (data,callback) => {
    axios.post("/Game/GuessOrnaments", {
        Ornaments: data.Ornaments,
        HandicapID: data.HandicapID,
        SelectedEdge: data.SelectedEdge,
        GameTeamID: data.GameTeamID,
    })
    .then(function(res) {
        if (res) {
            console.log(res.Data)

            callback ? callback() : ""
        }
    })
    .catch(function(error) {
        Toast.fail('请求失败，请稍后重试！');
        console.log('error', error);
    });
}

export {
    MatchReducer,
    // getGameTypes,
    getGameInfos,
    getGameItems,
    getGameItemInfo,
    getOrnamentsGuessOfGameItem,
    getTBeansGuessOfGameItem,
    getVulgarTycoonGuessOfGameItem,
    useTBeanForecast,
    useOrnamentForecast
    
}