import { connect } from 'react-redux'
import BuyComponent from './buy-component.js'
import { getMallList, publishBuyOrSale, getOrnamentAttributes } from '../../reducers/shop'
import { refreshUserInfo } from '../../reducers/user'


const mapDispatchToProps = (dispatch, props) => {
    return {
        refreshUserInfo(data,callback) {
            refreshUserInfo(data,callback)
        },

        publishBuy(data,callback){
            publishBuyOrSale(data,callback)
        },

        getShopList(attributeId, attributeValue, keywords, pageIndex, callback) {
            getMallList({
                GameType: "570",
                AttributeID: attributeId,
                AttributeValue: attributeValue,
                KeyWords: keywords,
                PageIndex: pageIndex,
                PageSize: 20,
                SectionType: 1
            }, callback)
        },

        select() {
            getOrnamentAttributes({}, () => {
                dispatch({
                    type: "SELECT_ENTER",
                    selectEnter: "publishBuy"
                })
                props.history.push("/shopSelect")
            })
        },

        goInventoryPage() {
            props.history.push('/inventory')
        },
    }
}

const mapStateToProps = (state) => {
    return {
        userInfos: state.UserReducer.userInfos,
        shopInfos: state.ShopReducer.shopInfos,
        publishAttributeId: state.ShopReducer.publishAttributeId,
        publishAttributeValue: state.ShopReducer.publishAttributeValue,
        publishKeywords: state.ShopReducer.publishKeywords,
        publishPageIndex: state.ShopReducer.publishPageIndex
    }
}

const PublishBuy = connect(
    mapStateToProps,
    mapDispatchToProps
)(BuyComponent)

export default PublishBuy