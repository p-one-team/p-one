import { connect } from 'react-redux'
import SelectComponent from './select-component.js'
import { getMallProdItem } from '../../reducers/shop'
import store from '../../store'

const mapDispatchToProps = (dispatch, props) => {
    return {

        chooseAttribute(id,text){
            store.dispatch({
                type:"MALL_LIST_PARAM",
                paramAttributeId: id,
                paramAttributeValue: text,
                paramKeywords: "",
                paramPageIndex: 1
            })
            props.history.push('/shop')
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
        prodAttribute: state.ShopReducer.prodAttribute
    }
}

const ShopSelect = connect(
    mapStateToProps,
    mapDispatchToProps
)(SelectComponent)

export default ShopSelect