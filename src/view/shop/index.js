import { connect } from 'react-redux'
import ShopComponent from './shop-component.js'


const mapDispatchToProps = (dispatch, props) => {
	return {
		goBack() {
			props.history.replace('/')
		},

		goItemDetail(id) {
			id = "烬爵披肩";
			props.history.push(`/shopItem/${id}`)
		}
	}
}

const Shop = connect(
	null,
	mapDispatchToProps
)(ShopComponent)

export default Shop