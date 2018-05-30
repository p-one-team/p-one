import { connect } from 'react-redux'
import ShopItemDetailComponent from './item-component.js'

const mapDispatchToProps = (dispatch, props) => {
    return {
        initData() {
            //console.log('init index')
        },
        goListPage() {
            props.history.push('/list')
        }
    }
}

const mapStateToProps = (state) => {
    return {
        ...state.HomeReducer
    }
}


const ShopItemDetail = connect(
    mapStateToProps,
    mapDispatchToProps
)(ShopItemDetailComponent)

export default ShopItemDetail;