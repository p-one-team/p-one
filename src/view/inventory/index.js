import { connect } from 'react-redux'
import InventoryComponent from './inventory-component'
import { getMyInventory,addToSteamInventory } from '../../reducers/inventory'
import AlertWindow from '../../module/mo-alertWindow';
import store from '../../store'
import { publishBuyOrSale } from '../../reducers/shop'

const mapDispatchToProps = (dispatch, props) => {
    return {
        publishSale(data,callback){
            publishBuyOrSale(data,callback)
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

        goToSteamInventory(){
            props.history.push('/steamInventory')
        },

        addVipToSteamInventory(data){
            addToSteamInventory(data, (rs) => {
                AlertWindow.Prompt(rs.Msg,()=>{
                    return false
                })
            })
        }
    }
}

const mapStateToProps = (state) => {
    return {
        dotaInventory: state.InventoryReducer.dotaInventory,
        csgoInventory: state.InventoryReducer.csgoInventory,
        pubgInventory: state.InventoryReducer.pubgInventory,
        dotaChosenVipInventory: state.InventoryReducer.dotaChosenVipInventory
    }
}


const Inventory = connect(
    mapStateToProps,
    mapDispatchToProps
)(InventoryComponent)

export default Inventory;