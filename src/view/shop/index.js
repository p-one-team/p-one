import { connect } from 'react-redux'
import ShopComponent from './shop-component.js'
import { getMallList, getMallProdItem, getOrnamentAttributes } from '../../reducers/shop'


const mapDispatchToProps = (dispatch, props) => {
    return {

        showGetMallList(word) {
            getMallList({
                GameType: "570",
                AttributeID: 1,
                AttributeValue: "",
                KeyWords: word,
                PageIndex: 0,
                PageSize: 100
            })
        },

        goItemDetail(hashName) {
            getMallProdItem({
                MarketHashName: hashName
            }, () => {
                props.history.push("/shopItem")
            })
        },

        select(){
            getOrnamentAttributes({},()=>{
                props.history.push("/shopSelect")
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