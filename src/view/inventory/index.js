import { connect } from 'react-redux'
import InventoryComponent from './inventory-component'

const mapDispatchToProps = (dispatch, props) => {
    return {
        initData() {
            console.log('init inventory')
        },

        goStore() {
            props.history.push('/shop')
        }
    }
}

const mapStateToProps = (state) => {
    return {
        ...state.HomeReducer
    }
}


const Inventory = connect(
    mapStateToProps,
    mapDispatchToProps
)(InventoryComponent)

export default Inventory;