import { connect } from 'react-redux'
import ExchangeTbeansComponent from './exchange-component'
import { getMyInventory,ornamentExchangeTbeans } from '../../reducers/inventory'
import { refreshUserInfo } from '../../reducers/user'

const mapDispatchToProps = (dispatch, props) => {
    return {

        goStore() {
            props.history.push('/shop')
        },

        getInventory(data) {
            getMyInventory(data)
        },

        exchange(data,callback) {
            ornamentExchangeTbeans(data,callback)
        },

        refreshUserInfo(data,callback) {
            refreshUserInfo(data,callback)
        },
    }
}

const mapStateToProps = (state) => {
    return {
        dotaInventory: state.InventoryReducer.dotaInventory,
        dotaChosenExchangeInventory: state.InventoryReducer.dotaChosenExchangeInventory
    }
}

const ExchangeTbeans = connect(
    mapStateToProps,
    mapDispatchToProps
)(ExchangeTbeansComponent)

export default ExchangeTbeans;