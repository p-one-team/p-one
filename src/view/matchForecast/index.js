import MatchForecastComponent from './component'
import { connect } from 'react-redux'
import { getMyInventory } from '../../reducers/inventory'
import { useTBeanForecast,useOrnamentForecast } from '../../reducers/match'
import store from '../../store'
import { refreshUserInfo } from '../../reducers/user'

const mapDispatchToProps = (dispatch, props) => {
    return {
        refreshUserInfo(){
            refreshUserInfo()
        },

        goStore() {
            store.dispatch({
                type:"MALL_LIST_PARAM",
                paramAttributeId: 0,
                paramAttributeValue: "",
                paramKeywords: "",
                paramPageIndex: 1
            })
            props.history.push('/shop')
        },

        getInventory(data){
            getMyInventory(data)
        },

        tBeanForecast(data,callback){
            useTBeanForecast(data,callback)
        },

        ornamentForecast(data,callback){
            useOrnamentForecast(data,callback)
        }
    }
}

const mapStateToProps = (state) => {
    return {
        userInfos: state.UserReducer.userInfos,
        gameItemId: state.MatchReducer.gameItemId,
        gameItemInfos: state.MatchReducer.gameItemInfos,
        dotaInventory: state.InventoryReducer.dotaInventory,
        dotaChosenForecastInventory: state.InventoryReducer.dotaChosenForecastInventory
    }
}

const MatchForecast = connect(
    mapStateToProps,
    mapDispatchToProps
)(MatchForecastComponent)

export default MatchForecast