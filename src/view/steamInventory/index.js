import { connect } from 'react-redux'
import SteamInventoryComponent from './steamInventory-component'
import { getMySteamInventory, addToMyInventory } from '../../reducers/inventory'

const mapDispatchToProps = (dispatch, props) => {
    return {
        addToInventory(data,callback){
            addToMyInventory(data,()=>{
                callback ? callback() : null
                props.history.goBack()
            })
        },

        getSteamInventory(data){
            getMySteamInventory(data)
        }

    }
}

const mapStateToProps = (state) => {
    return {
        dotaSteamInventory: state.InventoryReducer.dotaSteamInventory,
        dotaChosenInventory: state.InventoryReducer.dotaChosenInventory
    }
}


const SteamInventory = connect(
    mapStateToProps,
    mapDispatchToProps
)(SteamInventoryComponent)

export default SteamInventory;