import { connect } from 'react-redux'
import ShopComponent from './shop-component.js'
import { getMallList, getMallProdItem } from '../../reducers/shop'


const mapDispatchToProps = (dispatch, props) => {
    return {

        showGetMallList(data) {
            getMallList(data)
        },

        goItemDetail(hashName) {
            getMallProdItem({
                MarketHashName: hashName
            }, () => {
                props.history.push("/shopItem")
            })
        }
    }
}

const mapStateToProps = (state) => {
    return {
        shopInfos: state.ShopReducer.shopInfos
    }
}

const Shop = connect(
    mapStateToProps,
    mapDispatchToProps
)(ShopComponent)

export default Shop