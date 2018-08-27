import { connect } from 'react-redux'
import ShopComponent from './shop-component.js'
import { getMallList, getMallProdItem, getOrnamentAttributes } from '../../reducers/shop'
import store from '../../store'


const mapDispatchToProps = (dispatch, props) => {
    return {
        getShopList(attributeId, attributeValue, keywords, pageIndex, sectionType, callback) {
            getMallList({
                GameType: "570",
                AttributeID: attributeId,
                AttributeValue: attributeValue,
                KeyWords: keywords,
                PageIndex: pageIndex,
                PageSize: 20,
                SectionType: sectionType
            }, callback)
        },

        goItemDetail(hashName) {
            getMallProdItem({
                MarketHashName: hashName
            }, () => {
                props.history.push("/shopItem")
            })
        },

        select() {
            getOrnamentAttributes({}, () => {
                dispatch({
                    type: "SELECT_ENTER",
                    selectEnter: "shop"
                })
                props.history.push("/shopSelect")
            })
        },

        goInventoryPage() {
            props.history.push('/inventory')
        },

        goPublishBuy() {
            store.dispatch({
                type:"MALL_LIST_PUBLISH",
                publishAttributeId: 0,
                publishAttributeValue: "",
                publishKeywords: "",
                publishPageIndex: 1,
            })
            props.history.push('/publishBuy')
        }
    }
}

const mapStateToProps = (state) => {
    return {
        shopInfos: state.ShopReducer.shopInfos,
        paramSectionType: state.ShopReducer.paramSectionType,
        paramAttributeId: state.ShopReducer.paramAttributeId,
        paramAttributeValue: state.ShopReducer.paramAttributeValue,
        paramKeywords: state.ShopReducer.paramKeywords,
        paramPageIndex: state.ShopReducer.paramPageIndex
    }
}

const Shop = connect(
    mapStateToProps,
    mapDispatchToProps
)(ShopComponent)

export default Shop