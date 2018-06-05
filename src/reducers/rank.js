import axios from '../https'
import { Toast } from 'antd-mobile'
import store from '../store'


/*-----------------------------------------------------------------*/
/*User Reducer*/
/*-----------------------------------------------------------------*/
const initRankInfo = {
    guessRank: {},
    rankTotal: {},
    rankWeek: {},
    guessRecordWeek: {},
    guessRecordMonth: {}
}

const RankReducer = (state = initRankInfo, action) => {

    switch (action.type) {
        case 'GUESS_RANK':
            return Object.assign({}, state, {guessRank: action.guessRank})

        case 'RANK_TOTAL':
            return Object.assign({}, state, {rankTotal: action.rankTotal})

        case 'RANK_WEEK':
            return Object.assign({}, state, {rankWeek: action.rankWeek})

        case 'GUESS_RECORD_WEEK':
            return Object.assign({}, state, {guessRecordWeek: action.guessRecordWeek})

        case 'GUESS_RECORD_MONTH':
            return Object.assign({}, state, {guessRecordMonth: action.guessRecordMonth})

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
        PageIndex: data.PageIndex,
        PageSize: 10
    })
    .then(function (res) {
        if(res){

            store.dispatch({
                type: "GUESS_RANK",
                guessRank: res.Data
            })

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
        PageSize: 10
    })
    .then(function (res) {
        if(res){

            if(data.RankingType==1){
                store.dispatch({
                    type: "RANK_TOTAL",
                    rankTotal: res.Data
                })
            }else if(data.RankingType==2){
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
        DayType: data.DayType, //0本周 1本月
        PageIndex: data.PageIndex,
        PageSize: 10
    })
    .then(function (res) {
        if(res){

            if(data.DayType==0){
                store.dispatch({
                    type: "GUESS_RECORD_WEEK",
                    guessRecordWeek: res.Data
                })
            }else if(data.DayType==1){
                store.dispatch({
                    type: "GUESS_RECORD_MONTH",
                    guessRecordMonth: res.Data
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