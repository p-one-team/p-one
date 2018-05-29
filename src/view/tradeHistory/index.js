import { connect } from 'react-redux'
import TradeHistoryComponent from './tradeHistory-component'
// import { Toast } from 'antd-mobile'

// import axios from "axios"


const mapDispatchToProps = (dispatch, props) => {
    return {
        initData() {
            console.log('init index')

            // axios.post('Game/MyTransaction',{
            //     //无需参数
            // })
            // .then(function (response) {
			// 	Toast.success('登录成功,跳转中...');
			// 	// props.history.push('/match');
			// 	console.log('tradeHistory', response.data);
			// })
			// .catch(function (error) {
			// 	Toast.fail('登录失败,跳转中...');
			// 	console.log('error', error);
            // });
            
        },
        goListPage() {
            props.history.push('/list')
        }
    }
}

const mapStateToProps = (state) => {
    return {
        ...state.HomeReducer
    }
}


const TradeHistory = connect(
    mapStateToProps,
    mapDispatchToProps
)(TradeHistoryComponent)

export default TradeHistory;