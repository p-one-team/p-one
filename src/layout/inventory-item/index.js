import { connect } from 'react-redux'
import InventoryItemComponent from './component.js'


const mapStateToProps = (state) => {
    return {
        dotaChosenInventory: state.InventoryReducer.dotaChosenInventory,
        dotaChosenVipInventory: state.InventoryReducer.dotaChosenVipInventory,
        dotaChosenForecastInventory: state.InventoryReducer.dotaChosenForecastInventory
    }
}

const InventoryItem = connect(
    mapStateToProps
)(InventoryItemComponent)

export default InventoryItem;