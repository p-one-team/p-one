import { connect } from 'react-redux'
import UserCenterComponent from './userCenter-component.js'
import { withRouter } from 'react-router-dom'


const mapDispatchToProps = (dispatch, props) => {
	console.log(props);
	return {
		goBack() {
			props.history.replace('/')
		},

		goDetail() {
			props.history.push('/userDetail')
		},
		goTradeHistory() {
			props.history.push('/tradeHistory')
		}
	}
}

const UserCenter = withRouter(connect(
	null,
	mapDispatchToProps
)(UserCenterComponent))

export default UserCenter