import { connect } from 'react-redux'
import UserCenterComponent from './userCenter-component.js'


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

const UserCenter = connect(
	null,
	mapDispatchToProps
)(UserCenterComponent)

export default UserCenter