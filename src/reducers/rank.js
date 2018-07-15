import axios from '../https'
import { Toast } from 'antd-mobile'
import store from '../store'


/*-----------------------------------------------------------------*/
/*User Reducer*/
/*-----------------------------------------------------------------*/
const initRankInfo = {
    guessRankLight: {},
    guessRankDark: {},
    rankTotal: {},
    rankWeek: {},
    guessRecordWeek: {},
    guessRecordDay: {}
}

const RankReducer = (state = initRankInfo, action) => {

    switch (action.type) {
        case 'GUESS_RANK_LIGHT':
            return Object.assign({}, state, { guessRankLight: action.guessRankLight })

        case 'GUESS_RANK_DARK':
            return Object.assign({}, state, { guessRankDark: action.guessRankDark })

        case 'RANK_TOTAL':
            return Object.assign({}, state, { rankTotal: action.rankTotal })

        case 'RANK_WEEK':
            return Object.assign({}, state, { rankWeek: action.rankWeek })

        case 'GUESS_RECORD_WEEK':
            return Object.assign({}, state, { guessRecordWeek: action.guessRecordWeek })

        case 'GUESS_RECORD_DAY':
            return Object.assign({}, state, { guessRecordDay: action.guessRecordDay })

        default:
            return state
    }
}


/*-----------------------------------------------------------------*/
/*User Action*/
/*-----------------------------------------------------------------*/

//收菜排行
const getGuessRank = (data, callback) => {
    axios.post('/Game/GetGameGuessRanking', {
        RankingType: data.RankingType
    })
        .then(function (res) {
            if (res) {

                if (data.RankingType == 1) {
                    store.dispatch({
                        type: "GUESS_RANK_LIGHT",
                        guessRankLight: res.Data
                    })

                } else if (data.RankingType == 2) {
                    store.dispatch({
                        type: "GUESS_RANK_DARK",
                        guessRankDark: res.Data
                    })

                }

                callback ? callback() : ""
            }
        })
        .catch(function (error) {
            Toast.fail('获取失败，请稍后重试！');
            console.log('error', error);
        });
}

//排行榜:胜率总榜，本周榜
const getRanking = (data, callback) => {
    axios.post('/Game/GetRanking', {
        RankingType: data.RankingType, //1胜率总榜，2本周榜
        PageIndex: data.PageIndex,
        PageSize: 20
    })
        .then(function (res) {
            if (res) {
                if (data.RankingType == 1) {
                    store.dispatch({
                        type: "RANK_TOTAL",
                        rankTotal: res.Data
                    })
                } else if (data.RankingType == 2) {
                    store.dispatch({
                        type: "RANK_WEEK",
                        rankWeek: res.Data
                    })
                }

                callback ? callback() : ""
            }
        })
        .catch(function (error) {
            Toast.fail('获取失败，请稍后重试！');
            console.log('error', error);
        });
}

//我的预测：本周 本月
const getMyGuessRecords = (data, callback) => {
    axios.post('/Game/GetMyGuessRecords', {
        DayType: data.DayType, //0本周 1本月 2本日
        PageIndex: data.PageIndex,
        PageSize: 20
    })
        .then(function (res) {
            if (res) {

                if (data.DayType == 0) {
                    store.dispatch({
                        type: "GUESS_RECORD_WEEK",
                        guessRecordWeek: res.Data
                    })
                } else if (data.DayType == 2) {
                    store.dispatch({
                        type: "GUESS_RECORD_DAY",
                        guessRecordDay: res.Data
                    })
                }

                callback ? callback() : ""
            }
        })
        .catch(function (error) {
            Toast.fail('获取失败，请稍后重试！');
            console.log('error', error);
        });
}



export {
    RankReducer,
    getGuessRank,
    getRanking,
    getMyGuessRecords
}