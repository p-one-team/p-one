import { connect } from 'react-redux'
import SelectComponent from './select-component.js'
import { getMallProdItem } from '../../reducers/shop'
import store from '../../store'

const mapDispatchToProps = (dispatch, props) => {
    return {

        chooseAttribute(enter,id,text){
            if(enter== "shop"){
                store.dispatch({
                    type:"MALL_LIST_PARAM",
                    paramAttributeId: id,
                    paramAttributeValue: text,
                    paramKeywords: "",
                    paramPageIndex: 1
                })
            }else if(enter=="publishBuy"){
                store.dispatch({
                    type:"MALL_LIST_PUBLISH",
                    publishAttributeId: id,
                    publishAttributeValue: text,
                    publishKeywords: "",
                    publishPageIndex: 1,
                })
            }
            props.history.goBack()
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
        selectEnter: state.ShopReducer.selectEnter,
        prodAttribute: state.ShopReducer.prodAttribute
    }
}

const ShopSelect = connect(
    mapStateToProps,
    mapDispatchToProps
)(SelectComponent)

export default ShopSelect