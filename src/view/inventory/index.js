import { connect } from 'react-redux'
import InventoryComponent from './inventory-component'
import { getMallList } from '../../reducers/shop'
import { getMyInventory,addToSteamInventory } from '../../reducers/inventory'

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

        goToSteamInventory(){
            props.history.push('/steamInventory')
        },

        addVipToSteamInventory(data){
            addToSteamInventory(data)
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