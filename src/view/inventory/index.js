import { connect } from 'react-redux'
import InventoryComponent from './inventory-component'
import { getMallList } from '../../reducers/shop'

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