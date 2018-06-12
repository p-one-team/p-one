import { connect } from 'react-redux'
import InventoryItemComponent from './component.js'


const mapStateToProps = (state) => {
    return {
        dotaChosenInventory: state.InventoryReducer.dotaChosenInventory,
        dotaChosenVipInventory: state.InventoryReducer.dotaChosenVipInventory
    }
}

const InventoryItem = connect(
    mapStateToProps
)(InventoryItemComponent)

export default InventoryItem;