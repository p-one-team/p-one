import axios from '../https'
import { Toast } from 'antd-mobile'
import store from '../store'


/*-----------------------------------------------------------------*/
/*User Reducer*/
/*-----------------------------------------------------------------*/
const initUserInfo = {
    guessRank: {},
}

const RankReducer = (state = initUserInfo, action) => {

    switch (action.type) {
        case 'GUESS_RANK':
            return Object.assign({}, state, {guessRank: action.guessRank})

        default:
            return state
    }
}


/*-----------------------------------------------------------------*/
/*User Action*/
/*-----------------------------------------------------------------*/

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



export { 
    RankReducer,
    getGuessRank,
}