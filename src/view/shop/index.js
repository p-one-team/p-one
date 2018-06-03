import { connect } from 'react-redux'
import ShopComponent from './shop-component.js'
import { getMallList } from '../../reducers/shop'


const mapDispatchToProps = (dispatch, props) => {
	return {

		initData(){
			// console.log("init index")
		},

		showGetMallList(data){
			getMallList(data,function(){

			})
		},


		goBack() {
			props.history.replace('/')
		},

		goItemDetail(id) {
			id = "烬爵披肩";
			props.history.push(`/shopItem/${id}`)
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