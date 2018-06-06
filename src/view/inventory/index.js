import { connect } from 'react-redux'
import InventoryComponent from './inventory-component'
import { getMallList } from '../../reducers/shop'
import { getMyInventory } from '../../reducers/inventory'

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
            console.log(data)
            getMyInventory(data)
        }
    }
}

const mapStateToProps = (state) => {
    return {
        dotaInventory: state.InventoryReducer.dotaInventory,
        csgoInventory: state.InventoryReducer.csgoInventory,
        pubgInventory: state.InventoryReducer.pubgInventory,
    }
}


const Inventory = connect(
    mapStateToProps,
    mapDispatchToProps
)(InventoryComponent)

export default Inventory;