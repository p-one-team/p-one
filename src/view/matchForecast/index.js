import MatchForecastComponent from './component'
import { connect } from 'react-redux'
import { getMallList } from '../../reducers/shop'
import { getMyInventory } from '../../reducers/inventory'
import { useTBeanForecast,useOrnamentForecast } from '../../reducers/match'

const mapDispatchToProps = (dispatch, props) => {
    return {
        goStore() {
            getMallList({
                GameType: "570",
				AttributeID: 1,
				AttributeValue: "",
				KeyWords: "",
				PageIndex: 0,
				PageSize: 10
            },() => {
                props.history.push('/shop')
            })
        },

        getInventory(data){
            getMyInventory(data)
        },

        tBeanForecast(data){
            console.log(data)
            useTBeanForecast(data)
        },

        ornamentForecast(data){
            console.log(data)
            useOrnamentForecast(data)
        }
    }
}

const mapStateToProps = (state) => {
    return {
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