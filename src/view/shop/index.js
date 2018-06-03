import { connect } from 'react-redux'
import ShopComponent from './shop-component.js'
import { getMallList, getMallProdItem } from '../../reducers/shop'


const mapDispatchToProps = (dispatch, props) => {
    return {

        initData() {
            // console.log("init index")
        },

        showGetMallList(data) {
            getMallList(data)
        },


        goBack() {
            props.history.replace('/')
        },

        goItemDetail(hashName) {
            console.log(hashName)
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