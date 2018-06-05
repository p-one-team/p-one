import { connect } from 'react-redux'
import SelectComponent from './select-component.js'
import { getMallList, getMallProdItem } from '../../reducers/shop'

const mapDispatchToProps = (dispatch, props) => {
    return {

        chooseAttribute(id,text){
            getMallList({
                GameType: "570",
                AttributeID: id,
                AttributeValue: text,
                KeyWords: "",
                PageIndex: 0,
                PageSize: 10
            }, () => {
                props.history.goBack()
            })
        },

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
        prodAttribute: state.ShopReducer.prodAttribute
    }
}

const ShopSelect = connect(
    mapStateToProps,
    mapDispatchToProps
)(SelectComponent)

export default ShopSelect